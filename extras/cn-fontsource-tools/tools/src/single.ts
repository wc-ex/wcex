// 生成单字体包
import fontkit, { Font } from "fontkit";
import subsetFont from "subset-font";
import kebabCase from "lodash.kebabcase";
import path from "path";
import fs from "fs";
import worker from 'node:worker_threads';

const OUTPUT_PATH = path.resolve("./build");

function _fontVersion(font: Font): string {
  let ver = font.version as any;
  if (typeof ver != "string") return ver.toString();
  let m = ver.match(/^.*?([\d\.]+).*?$/);
  if (m && m.length == 2) return m[1];
  return ver;
}


export async function makeSingle(fontSrcPath: string) {
  let font = await fontkit.open(fontSrcPath);
  let fontBuffer = fs.readFileSync(fontSrcPath);

  console.log("familyName:", font.familyName);
  console.log("fullName:", font.fullName);
  console.log("version:", font.version);
  console.log("subfamilyName:", font.subfamilyName);
  console.log("descent:", font.descent);
  console.log("copyright:", font.copyright);
  console.log("availableFeatures:", font.availableFeatures);
  console.log("characterSet:", font.characterSet.length);

  // 为单字生成
  const fontPkgName = "cn-fontsource-" + kebabCase(font.familyName);
  console.log("pkg:", fontPkgName);
  const version = _fontVersion(font);

  const outFontDir = path.join(OUTPUT_PATH, fontPkgName,'woff2');
  if (fs.existsSync(outFontDir)) {
    await fs.promises.rm(outFontDir, { recursive: true });
  }

  let subDirSet = new Set<string>();
  let counter = 0;

  for (let code of font.characterSet) {
    let char = code.toString(16).toUpperCase().padStart(4,'0');

    let subdir = char.slice(0, 2);
    let outDir = path.join(outFontDir, subdir);

    if (!subDirSet.has(subdir)) {
      console.log("--->", fontPkgName, subdir);
      await fs.promises.mkdir(outDir, { recursive: true });
      subDirSet.add(subdir);
    }
    // 写入字体
    const woff = path.join(outDir, char + ".woff2");
    try {
      // Create a new font with only the characters required to render "Hello, world!" in WOFF2 format:
      const subsetBuffer = await subsetFont(fontBuffer, String.fromCharCode(code), {
        targetFormat: "woff2",
      });
      await fs.promises.writeFile(woff, subsetBuffer);
      if (counter % 100 == 0) {
        console.log("--->", fontPkgName, subdir, ": ", counter, woff);
      }
      counter++;
    } catch (e) {
      console.log("Error:", woff, e);
    }
  }
}
