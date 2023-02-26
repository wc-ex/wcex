import process from "process";
import path from "path";
import fs, { promises as fsp } from "fs";
import json5 from "json5";
import subsetFont from "subset-font";
import kebabcase from "lodash.kebabcase";
import fontkit, { Font as FKFont } from "fontkit";
import { makeHZ } from "./hz";
import { Canvas, FontLibrary } from "skia-canvas";
import child_process from "child_process";
import axios from "axios";

interface IFontConfig {
  // 字体名称，按实际填写
  name: string;
  // 扩展字段，如同名字体在提交NPM仓库已经存在被其他人占用，可填写此字段进行区分，只能填写英文。
  ext: string;
  //描述信息
  description: string;
  // 字体类别，如方正字体系列等
  fontClass: string[];
  // 类型, 可选: free-免费字体, opensource-开源字体, paid-商业字体
  type: "free" | "opensource" | "paid";
  // 版本
  version: string;
  // 链接
  link: string;
  // 授权
  license: string;
  // 字体包名字，自动生成
  fontPkgName: string;
}

// 计算和统计字符集中连续的编码段
function calcCharacterSpans(charsString: string) {
  const chSpanMap = [];
  // as IChSpan[];
  let chSpan = { start: -1, count: 0 };
  for (let i = 0; i < charsString.length; i++) {
    let ch = charsString.charCodeAt(i);
    if (ch != chSpan.start + chSpan.count) {
      // 记录连续的编码片段
      if (chSpan.start >= 0) chSpanMap.push({ start: chSpan.start, count: chSpan.count });
      (chSpan.start = ch), (chSpan.count = 1);
    } else {
      // 连续编码
      chSpan.count++;
    }
  }
  chSpanMap.push({ start: chSpan.start, count: chSpan.count });

  const calcCount = chSpanMap.reduce((p, c) => {
    p += c.count;
    return p;
  }, 0);
  console.log("charsString length", charsString.length);
  console.log("char span count", chSpanMap.length);
  console.log("calced chars count", calcCount);
  return chSpanMap;
}

async function writeSplitedFont(outoutDir: string, fontBuffer: Buffer, fileName: string, strfonts: string) {
  try {
    // Create a new font with only the characters required to render "Hello, world!" in WOFF2 format:
    const subsetBuffer = await subsetFont(fontBuffer, strfonts, {
      targetFormat: "woff2",
    });
    await fs.promises.writeFile(path.join(outoutDir, fileName), subsetBuffer);
    console.log("ok:", fileName, subsetBuffer.length, "bytes");
  } catch (e) {
    console.log("Error:", fileName, e);
  }
}

type IChunk = {
  start: number;
  count: number;
}[];

// 生成字体文件,将一个文件按照设定的字符数量分割字符集
async function buildCharsChunk(
  outputDir: string,
  fkFont: FKFont,
  fontBuffer: Buffer,
  name: string,
  charsStr: string,
  chunkCharsLimited: number,
  isFontDisplayBlock: boolean
) {
  console.log("BUILD CHUNK:", name);
  // 完成分割的字体集合
  const spans = calcCharacterSpans(charsStr);
  let charsCounter = 0;
  let charSpans = [];
  let chunksList = [] as IChunk[];
  //   debugger;
  for (let sp of spans) {
    let spanPos = 0;
    while (true) {
      let availSpanSize = sp.count - spanPos;
      if (charsCounter + availSpanSize >= chunkCharsLimited) {
        // 超出一个分段限制, 添加到下一个分段
        let sz = chunkCharsLimited - charsCounter;
        charSpans.push({ start: sp.start + spanPos, count: sz });
        charsCounter += sz;
        // 写入新分段
        chunksList.push(charSpans);
        // const chunkName = `${name}_${charSpans[0].start.toString(16)}_${charsCounter}`;
        // console.log("chunk:", chunkName);
        // 重新计算
        spanPos += sz;
        charsCounter = 0;
        charSpans = [];
      } else {
        // 添加整个剩余分段
        charSpans.push({ start: sp.start + spanPos, count: availSpanSize });
        charsCounter += availSpanSize;
        break;
      }
    }
  }
  // 最后检测和写入chunk
  if (charSpans.length > 0) {
    // 如果最后的chunks小于设定size的一半，则合并到上一个chunk
    let chunkChars = charSpans.reduce((p, c) => {
      p += c.count;
      return p;
    }, 0);
    if (chunkChars < chunkCharsLimited / 2) {
      // 合并到上一个chunk 包
      chunksList[chunksList.length - 1].push(...charSpans);
    } else {
      // 添加chunk包
      chunksList.push(charSpans);
    }
  }

  // 生成CSS
  let cssText = "";
  for (let chunk of chunksList) {
    let chunkChars = chunk.reduce((p, c) => {
      p += c.count;
      return p;
    }, 0);
    const chunkName = `${name}_${chunk[0].start.toString(16)}_${chunkChars}`;
    console.log("chunk:", chunkName);

    // build css
    const chunkFontFileName = `${chunkName}.woff2`; // 生成CSS
    const strFonts = chunk
      .reduce((p, c) => {
        for (let i = 0; i < c.count; i++) {
          p.push(String.fromCharCode(c.start + i));
        }
        return p;
      }, [] as string[])
      .join("");
    console.log(strFonts);
    await writeSplitedFont(outputDir, fontBuffer, chunkFontFileName, strFonts);
    try {
      const fileSize = (await fs.promises.stat(path.join(outputDir, chunkFontFileName))).size;
      console.log("write OK", chunkFontFileName, fileSize);
    } catch (e: any) {
      console.log("error:", e.message);
      process.exit(1);
    }
    // build file
    const cssRange = chunk
      .map((v) =>
        v.count > 1 ? `U+${v.start.toString(16)}-${(v.start + v.count).toString(16)}` : `U+${v.start.toString(16)}`
      )
      .join(",")
      .toUpperCase();
    // font-display: ${isFontDisplayBlock ? "block" : "swap"};
    cssText += `@font-face {font-family: '${fkFont.familyName}';src: local('${fkFont.familyName}'), url('${chunkFontFileName}');unicode-range: ${cssRange};}\n`;
  }
  return cssText;
}

async function writePackageJson(buildFontPath: string, fontConfig: IFontConfig, fkFont: FKFont) {
  // 写 project.json
  const packageJson = {
    name: fontConfig.fontPkgName,
    description: fontConfig.description,
    version: fontConfig.version,
    repository: "https://github.com/wc-ex/cn-fontsource",
    keywords: ["cn", "cnfont", "cn-font", "fontsource", fontConfig.name],
    font: {
      name:fontConfig.name,
      type: fontConfig.type,
      fontClass: fontConfig.fontClass,
      link: fontConfig.link,
      version: fkFont.version,
      familyName: fkFont.familyName,
      subfamilyName: fkFont.subfamilyName,
      copyright: fkFont.copyright,
      characterCount: fkFont.characterSet.length,
    },
    license: fontConfig.license,
  };
  fs.writeFileSync(path.join(buildFontPath, "package.json"), JSON.stringify(packageJson, null, 2));
}

async function writePackageReadme(buildFontPath: string, fontConfig: IFontConfig, fkFont: FKFont) {
  const readme = `![${fontConfig.name}](https://cdn.jsdelivr.net/npm/${fontConfig.fontPkgName}@${
    fontConfig.version
  }/font.png)

### ${{ free: "非开源,免费商用", opensource: "开源字体-推荐使用", paid: "商业字体" }[fontConfig.type] || "商业或未知"}
> LICENSE: ${fontConfig.license}

适用于浏览器的多片段快速加载的中文字库
- ${fontConfig.description}
- 参见:  ${fontConfig.link}
- 更多字体: WEB在线中文字体搜集:  https://github.com/wc-ex/cn-fontsource

![demo](https://cdn.jsdelivr.net/npm/${fontConfig.fontPkgName}@${fontConfig.version}/demo.png)

### 信息
- version: ${fkFont.version}
- familyName: ${fkFont.familyName}
- subfamilyName: ${fkFont.subfamilyName}
- fullName: ${JSON.stringify(fkFont.fullName)}
- characterCount: ${fkFont.characterSet.length}

### 使用
- CDN 直接调用
  \`\`\`html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/${fontConfig.fontPkgName}/font.css"></link>
  <style>
    html{
      font-family: Roboto, "${fkFont.familyName}", sans-serif;
    }
  </style>
  \`\`\`
- 本地化
  > npm i ${fontConfig.fontPkgName}

  > 加载: font.css

`;
  fs.writeFileSync(path.join(buildFontPath, "README.md"), readme);
}

async function writeTextPng(
  fontFileName: string,
  buildFontPath: string,
  fontConfig: IFontConfig,
  fkFont: FKFont,
  lines: { size: number; text: string }[],
  toFile: string
) {
  const PADDING = 10;
  FontLibrary.use(fkFont.familyName, [fontFileName]);
  let canvas1 = new Canvas(100, 100);
  const ctx1 = canvas1.getContext("2d");
  // 计算每一行大小
  let calcLines = lines.map((v) => {
    ctx1.font = `${v.size}px "${fkFont.familyName}"`;
    return { ...v, ...ctx1.measureText(v.text) };
  });
  // ctx1.measureText()
  let maxWidth = Math.max(...calcLines.map((v) => v.width));
  let maxHeight = calcLines.reduce((p, c) => {
    return p + c.fontBoundingBoxAscent + c.fontBoundingBoxDescent + PADDING;
  }, 0);
  console.log("width:", maxWidth, "height:", maxHeight);

  let canvas2 = new Canvas(maxWidth + 20, maxHeight + 20);
  const ctx2 = canvas2.getContext("2d");
  let yPos = PADDING;
  for (let l of calcLines) {
    ctx2.font = `${l.size}px "${fkFont.familyName}"`;
    ctx2.fillStyle = "rgb(0,0,0)";
    let x = PADDING + (maxWidth - l.width) / 2;
    let y = yPos + l.fontBoundingBoxAscent;
    ctx2.fillText(l.text, x, y);
    yPos += l.fontBoundingBoxAscent + l.fontBoundingBoxDescent + PADDING;
  }
  canvas2.saveAsSync(path.join(buildFontPath, toFile), { format: "png" });
}

async function checkExistNpm(pkgName: string, version: string) {
  let ret = await axios.get(`https://registry.npmjs.com/${pkgName}`, {responseType:'json',
    validateStatus(status) {
      return status < 500;
    },
  });
  if (ret.status == 404) {
    // 软件包不存在，可以继续
    return;
  } else {
    if (ret.data.versions[version])
      throw Error(`Npm existd ${pkgName}, ${version},please upgrade version or change name`);
  }
}

function readSc(file: string) {
  // 写入样例图像
  return JSON.parse(fs.readFileSync(path.join(__dirname, file), "utf8")) as {
    author: string;
    paragraphs: string[];
    rhythmic: string;
  }[];
}

export async function buildFont(fontDir: string, fontName: string) {
  console.log(`---- font file: ${fontName} ----`);
  let fontConfig: IFontConfig = json5.parse(await fsp.readFile(path.join(fontDir, "font.json5"), "utf8"));
  console.log("  ==> ", fontConfig.name);

  // 解析字体
  let fontFileName = path.join(fontDir, fontName);
  let fkFont = fontkit.openSync(fontFileName);
  if (!fkFont) throw Error("open font failed: " + fontName);
  console.log("  ==> ", fkFont.familyName, ",", fkFont.subfamilyName, ",", fkFont.fullName, ",", fkFont.numGlyphs);

  fontConfig.fontPkgName = `cn-fontsource-${kebabcase(fkFont.familyName+"-"+fkFont.subfamilyName + (fontConfig.ext ? "-" + fontConfig.ext : ""))}`;

  // 检测NPM同名同版本软件包
  await checkExistNpm(fontConfig.fontPkgName, fontConfig.version);

  // 创建输出
  let buildFontPath = path.resolve("./tmp", fontConfig.name, fontConfig.fontPkgName);
  if (fs.existsSync(buildFontPath)) fs.rmSync(buildFontPath, { recursive: true });
  fs.mkdirSync(buildFontPath, { recursive: true });
  console.log("  OUTPUT: ==> ", buildFontPath);

  let fontBuffer = await fsp.readFile(fontFileName);

  // 处理汉字
  let hz = makeHZ(fkFont);

  let css = "";
  css += await buildCharsChunk(buildFontPath, fkFont, fontBuffer, "L1", hz.L1, 192, false);
  css += await buildCharsChunk(buildFontPath, fkFont, fontBuffer, "L2", hz.L2, 96, false);
  css += await buildCharsChunk(buildFontPath, fkFont, fontBuffer, "L3", hz.L3, 64, false);

  console.log(`  END ==>  ${fontName} \n`);

  // 写入CSS
  fs.writeFileSync(path.join(buildFontPath, "font.css"), css, "utf8");
  // 写入预览图像
  await writeTextPng(
    fontFileName,
    buildFontPath,
    fontConfig,
    fkFont,
    [{ size: 48, text: fontConfig.name }],
    "font.png"
  );

  // 写入样例图像
  let sc = [
    ...readSc("sc0.json"),
    ...readSc("sc1.json"),
    ...readSc("sc2.json"),
    ...readSc("sc3.json"),
    ...readSc("sc4.json"),
    ...readSc("sc5.json"),
    ...readSc("sc6.json"),
    ...readSc("sc7.json"),
    ...readSc("sc8.json"),
    ...readSc("sc9.json"),
    ...readSc("sc10.json"),
  ];

  let n = Math.round(Math.random() * sc.length);
  await writeTextPng(
    fontFileName,
    buildFontPath,
    fontConfig,
    fkFont,
    [
      { size: 48, text: sc[n].rhythmic },
      { size: 24, text: sc[n].author },
      ...sc[n].paragraphs.map((v) => {
        return { size: 32, text: v };
      }),
    ],
    "demo.png"
  );

  // 写入package.json
  await writePackageJson(buildFontPath, fontConfig, fkFont);

  // 写入README.md
  await writePackageReadme(buildFontPath, fontConfig, fkFont);
  console.log("  ==> SUCCEED BUILD");
  // 发布到NPM
  child_process.execSync(`npm --registry \"https://registry.npmjs.org/\" publish --access public`, {
    cwd: buildFontPath,
    stdio: "inherit",
  });
  console.log("== SUCCEED PUBLISH NPM == ");
}
