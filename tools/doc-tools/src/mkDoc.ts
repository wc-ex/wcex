import fs, { promises as fsp } from "fs";
import path from "path";
import axios from "axios";
import os from "os";
import { LANG_NAMES_T } from "./lang";
import { text } from "stream/consumers";

// return {name,isDir}[]
// const { v4: uuidv4 } = require('uuid');
const KEY = fs.readFileSync(path.join(os.homedir(), "wcex_trans_key.txt"), "utf8").trim();
console.log("TRANS API KEY: ", KEY);
let ENDPOINT = "https://api.cognitive.microsofttranslator.com";

// location, also known as region.
// required if you're using a multi-service or regional (not global) resource. It can be found in the Azure portal on the Keys and Endpoint page.
let TRANS_LOCATION = "eastasia";
let DOC_ROOT = path.resolve(__dirname, "../../../doc/guide/");

type ITransResult = {translations:{text:string,to:LANG_NAMES_T}[]}[];

async function transText(texts: string[], toLangs: string[]):Promise<ITransResult> {
  if(texts && texts.length <=0) return [];

  return await (axios({
    baseURL: ENDPOINT,
    url: "/translate",
    method: "post",
    headers: {
      "ocp-apim-subscription-key": KEY,
      // location required if you're using a multi-service or regional (not global) resource.
      "Ocp-Apim-Subscription-Region": TRANS_LOCATION,
      "Content-type": "application/json",
      // 'X-ClientTraceId': uuidv4().toString()
    },
    params: {
      "api-version": "3.0",
      textType: "html",
      from: "zh-Hans",
      to: toLangs,
    },
    data: texts.map((v) => {
      return { text: v };
    }),
    responseType: "json",
  }).then((v)=>v.data)).catch(e=>console.log(e.message)) as ITransResult;
}

// async function

async function lsDirDeep(rootPath: string) {
  let allItem = [] as { isDir: boolean; pathname: string }[];
  async function _dir(dirPath: string) {
    for (let listName of await fsp.readdir(path.join(rootPath, dirPath))) {
      let fullPath = path.resolve(rootPath, dirPath, listName);
      let childPath = path.join(dirPath, listName);
      let st = await fsp.stat(fullPath);
      if (st.isDirectory()) {
        allItem.push({ isDir: true, pathname: childPath });
        await _dir(childPath);
      } else if (st.isFile()) {
        allItem.push({ isDir: false, pathname: childPath });
      }
    }
  }
  await _dir(".");
  return allItem;
}

interface IDocInfo {
  typ: "dir" | "file";
  name: string;
  path: string;
  items: IDocInfo[];
  updateAt: number;
  icon?: string;
}
async function buildDoc(docPath: string) {
  let navDirs = [] as IDocInfo[];
  let docDir = path.resolve(__dirname, docPath);
  let curDir: IDocInfo | undefined;
  console.log("doc root:", docDir);
  for (let en of await lsDirDeep(docDir)) {
    if (en.isDir) {
      // 处理目录
      let icon = JSON.parse(await fsp.readFile(path.join(docDir, en.pathname, "icon.json"), "utf8"));

      curDir = {
        typ: "dir",
        name: path.parse(en.pathname).base,
        path: en.pathname.replace(/\\/g, "/"),
        items: [],
        updateAt: 0,
        icon,
      };
      navDirs.push(curDir);
    } else {
      //处理文件
      if (en.pathname.endsWith(".md")) {
        let fullFilePath = path.join(docDir, en.pathname);
        // 从md第一行获取描述信息
        let md = await fsp.readFile(fullFilePath, "utf8");
        let st = await fsp.stat(fullFilePath);
        let firstline = md.trim().split(/(\n|\r\n)/, 1)[0];
        let m = firstline.match(/^<!--DESC:(.+)-->$/);
        let desc = {};
        if (m && m.length == 2) {
          desc = JSON.parse(m[1]);
        }

        curDir?.items.push({
          typ: "file",
          name: path.parse(en.pathname).base,
          path: en.pathname.replace(/\\/g, "/"),
          updateAt: st.mtimeMs,
          items: [],
          ...desc,
        });
      }
    }
  }
  await fsp.writeFile(path.join(docDir, "nav.json"), JSON.stringify(navDirs));
  console.log("== Succeed ", docDir);
}


async function transDoc(toLang: LANG_NAMES_T[]) {
  let baseLangDir = path.join(DOC_ROOT, "cn");
  let dirs = (await fsp.readdir(baseLangDir, { encoding: "utf8", withFileTypes: true }))
    .filter((v) => v.isDirectory())
    .map((v) => v.name);

  // 翻译主目录
  let transDirs = await transText(dirs, toLang);
  // console.log(transDirs);

  // 获取和翻译md文件
  for (let dirId in dirs) {
    // 翻译一级目录
    let dirName = dirs[dirId];
    let dirBase = path.join(baseLangDir, dirName);
    let mdFiles = (await fsp.readdir(dirBase, { encoding: "utf8", withFileTypes: true }))
      .filter((v) => v.isFile() && v.name.endsWith(".md"))
      .map((v) => v.name);
    // 翻译md文件名
    let transMdFiles = await transText(mdFiles, toLang);

    for (let mdId in mdFiles) {
      let mdName = mdFiles[mdId];
      let str = await fsp.readFile(path.join(dirBase,mdName),{encoding:'utf8'});
      // 翻译md内容
      let transStr =  await transText([str], toLang);
      // 写入翻译文件
      for(let langId in toLang){
        let tDir = transDirs[dirId].translations[langId].text;
        tDir = tDir.replace(/\s*-\s*/,'-');
        let transMdDir = path.join(DOC_ROOT,toLang[langId],tDir);
        await fsp.mkdir(transMdDir,{recursive:true});
        let tMd = transMdFiles[mdId].translations[langId].text
        tMd = tMd.replace(/\s*-\s*/,'-');

        let trandMdFile = path.join(transMdDir,tMd);
        await fsp.writeFile(trandMdFile,transStr[0].translations[langId].text);
        console.log("write :",trandMdFile);
      }
    }
  }
  console.log("all ok:",toLang);

}

(async () => {
  // let text = await fsp.readFile("../../doc/guide/cn/01-开始/01-简介.md", "utf8");
  await transDoc(["en", "ja", "zh-Hant", "lzh"]);
  // await buildDoc(path.join(__dirname,"../../../doc/guide/cn"));
})();
