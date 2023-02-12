import path from "path";
import fs from "fs";
import {makeHZ} from "./make_hz";
import subsetFont from "subset-font";
import kebabcase from "lodash.kebabcase";
import fontkit from "fontkit";
import download from "download";
import os from "os";
import child_process from "child_process";

const FONT_BUILD_JSON_DESC = {
  name: "字体名称, familyName,不要太长,影响font.css大小",
  description: "字体描述信息",
  version: "1.0.0",
  fontFile: "xxx.ttf",
  extraFiles: ["xxx.txt", "需要复制到输出包中的文件，一般是授权声明之类"],
  download: "下载路径,如下载为zip 等压缩文件,则自动解压",
  link: "字体来源页面",
  copyright: "版权信息",
};

if (process.argv.length != 3) {
  console.log("cn_font_tools [FONT_BUILD_JSON_FILE]");
  console.log("Font Build JSON Format:");
  console.log(JSON.stringify(FONT_BUILD_JSON_DESC, null, 2));
  process.exit(0);
}

const FONT_BUILD_FILE = process.argv[2];
const FONT_BUILD_JSON = JSON.parse(fs.readFileSync(FONT_BUILD_FILE, "utf8"));
// 升级小版本号
FONT_BUILD_JSON.version = FONT_BUILD_JSON.version
  .split(".")
  .map((v, i) => {
    return i == 2 ? (parseInt(v) + 1).toString() : v;
  })
  .join(".");
  
const BUILD_TMP = path.join("./build", "temp");
const BUILD_DIR = path.join("./build", FONT_BUILD_JSON.name);

if (fs.existsSync(BUILD_DIR)) {
  fs.rmSync(BUILD_DIR, { recursive: true });
}
fs.mkdirSync(BUILD_DIR, { recursive: true });

// const USED_FONT_BUFFER = fs.readFileSync(FONT_BUILD_JSON.file);
// // 获取字体文件信息
// const font.info = fontkit.openSync(FONT_BUILD_JSON.file);
// console.log(FONT_BUILD_JSON.name, font.info.version);

function writeProject(font) {
  const pkgName = `@wc1font/${kebabcase(font.info.familyName)}`;
  // 写 project.json
  const packageJson = {
    name: pkgName,
    description: FONT_BUILD_JSON.description,
    version: FONT_BUILD_JSON.version,
    repository: "https://github.com/wc-one/cn-font",
    font: {
      fontVersion: font.info.version,
      familyName: font.info.familyName,
      subfamilyName: font.info.subfamilyName,
      namedVariations: font.info.namedVariations,
      characterCount: font.info.characterSet.length,
      buildInfo: FONT_BUILD_JSON,
    },
    license: FONT_BUILD_JSON.license,
  };
  fs.writeFileSync(path.join(BUILD_DIR, "package.json"), JSON.stringify(packageJson, null, 2));
  console.log(JSON.stringify(packageJson, null, 2));
  // 写 README.md
  const readme = `### ${FONT_BUILD_JSON.name}
  > 适用于浏览器的多片段快速加载的中文字库

  - ${FONT_BUILD_JSON.description}
  - 参见:  ${FONT_BUILD_JSON.link}

### 信息
  - version: ${font.info.version}
  - familyName: ${font.info.familyName}
  - subfamilyName: ${font.info.subfamilyName}
  - namedVariations: ${JSON.stringify(font.info.namedVariations)}
  - characterCount: ${font.info.characterSet.length}

### 使用
  - CDN 直接调用
    \`\`\`html
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/${pkgName}/font.css"></link>
    <style>
      html{
        font-family: Roboto, "${font.info.familyName}", sans-serif;
      }
    </style>
    \`\`\`
  - 本地化
    > npm i ${pkgName}
    > 加载包中: font.css

##### 更多字体，支持请加星
> 浏览器可用免费中文字体搜集:  https://github.com/wc-one/cn-font
`;
  fs.writeFileSync(path.join(BUILD_DIR, "README.md"), readme);
  return pkgName;
}

// 计算和统计字符集中连续的编码段
function calcCharacterSpans(charsString) {
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

async function writeSplitedFont(font, fileName, strfonts) {
  try {
    // Create a new font with only the characters required to render "Hello, world!" in WOFF2 format:
    const subsetBuffer = await subsetFont(font.buffer, strfonts, {
      targetFormat: "woff2",
    });
    await fs.promises.writeFile(path.join(BUILD_DIR, fileName), subsetBuffer);
    console.log("ok:", fileName, subsetBuffer.length, "bytes");
  } catch (e) {
    console.log("Error:", fileName, e);
  }
}

// 生成字体文件,将一个文件按照设定的字符数量分割字符集
async function buildCharsChunk(font, name, charsStr, chunkCharsLimited, isFontDisplayBlock) {
  console.log("BUILD CHUNK:", name);
  // 完成分割的字体集合
  const spans = calcCharacterSpans(charsStr);
  let charsCounter = 0;
  let charSpans = [];
  let chunksList = [];
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
      }, [])
      .join("");
    console.log(strFonts);
    await writeSplitedFont(font, chunkFontFileName, strFonts);
    try {
      const fileSize = (await fs.promises.stat(path.join(BUILD_DIR, chunkFontFileName))).size;
      console.log("write OK", chunkFontFileName, fileSize);
    } catch (e) {
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
    cssText += `
@font-face {
    font-family: '${font.info.familyName}';
    font-display: ${isFontDisplayBlock ? "block" : "swap"};
    src: url('${chunkFontFileName}') format('woff2');
    unicode-range: ${cssRange};
    }`;
  }
  return cssText;
}

async function downloadAndOpenFont(url) {
  try {
    console.log("download ...", url);
    await download(url, BUILD_TMP, { extract: true });

    const buffer = fs.readFileSync(path.join(BUILD_TMP, FONT_BUILD_JSON.fontFile));
    // 获取字体文件信息
    const info = fontkit.openSync(path.join(BUILD_TMP, FONT_BUILD_JSON.fontFile));
    console.log(info.familyName, info.version);

    // 拷贝所有的附加文件到输出目录
    for (const f of FONT_BUILD_JSON.extraFiles) {
      const p = path.parse(f);
      fs.copyFileSync(path.join(BUILD_TMP, f), path.join(BUILD_DIR, p.base));
    }
    return { info, buffer };
  } catch (e) {
    console.log("error:", e);
    process.exit(1);
  }
}

// 计算和生成字体包
(async () => {
  // 下载和打开字体文件
  const font = await downloadAndOpenFont(FONT_BUILD_JSON.download);

  // 计算一级汉字和二级汉字
  const allFontsChars = dedup_sort(String.fromCharCode(...font.info.characterSet.sort()));
  // 计算剩余汉字和字符
  const L = HZ.makeHZ();
  // 计算L3,去除控制字符
  const L3 = dedup_sort2(L.L1 + L.L2, allFontsChars).replace(/[\x00-\x1f]/g, "");
  console.log("normal chars:", allFontsChars.length, L3.length);

  let css = "";
  css += await buildCharsChunk(font, "L1", L.L1, 256, true);
  css += await buildCharsChunk(font, "L2", L.L2, 128, false);
  css += await buildCharsChunk(font, "L3", L3, 32, false);

  // 构造L3, 50
  await fs.promises.writeFile(path.join(BUILD_DIR, `font.css`), css);
  const pkgName = writeProject(font);

  // 成功后保存版本
  fs.writeFileSync(FONT_BUILD_FILE, JSON.stringify(FONT_BUILD_JSON, null, 2));
  console.log("== SUCCEED BUILD FONT == ");
  // 发布到 npm
  child_process.execSync(`npm --registry \"https://registry.npmjs.org/\" publish --access public`, {
    cwd: BUILD_DIR,
    stdio: "inherit",
  });
  console.log("== SUCCEED PUBLISH NPM == ");
  // 更新README.md
  let README = fs.readFileSync("./README.md", "utf8");
  const regexp = new RegExp(`- _${FONT_BUILD_JSON.name}_.*`, "g");
  if (!README.match(regexp)) {
    README += `\n- _${FONT_BUILD_JSON.name}_ (${font.info.characterSet.length}字): [字体包](https://www.npmjs.com/package/${pkgName}) [来源网站](${FONT_BUILD_JSON.link})`;
  }
  fs.writeFileSync("./README.md", README);
  console.log("== UPDATE README OK == ");
})();
