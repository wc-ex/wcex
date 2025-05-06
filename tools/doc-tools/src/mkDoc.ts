import fs, { promises as fsp } from "fs";
import path from "path";
import axios from "axios";
import os from "os";
import { LANG_NAMES_T } from "./lang";
import json5 from 'json5';

// return {name,isDir}[]
// const { v4: uuidv4 } = require('uuid');
import { v4 as uuidv4 } from 'uuid';
const KEY = fs.readFileSync(path.join(os.homedir(), "wcex_trans_key.txt"), "utf8").trim();
console.log("TRANS API KEY: ", KEY);
let ENDPOINT = "https://api.cognitive.microsofttranslator.com/";
// let ENDPOINT = "api-apc.cognitive.microsofttranslator.com";


// location, also known as region.
// required if you're using a multi-service or regional (not global) resource. It can be found in the Azure portal on the Keys and Endpoint page.
// let TRANS_LOCATION = "eastasia";
let TRANS_LOCATION = "japaneast";


let DOC_ROOT = path.resolve(__dirname, "../../../doc/guide/");

type ITransResult = { translations: { text: string; to: LANG_NAMES_T; }[]; }[];

async function timeoutPromise(timeout: number) {
  return new Promise((res) => {
    setTimeout(() => {
      res(null);
    }, timeout);
  });
}

axios.interceptors.request.use((cfg) => {
  console.log("http req:", cfg.method, cfg.url);
  return cfg;
}, (err) => {
  return Promise.reject(err);
});

async function transText(
  texts: string[],
  toLangs: string[],
  textType: "plain" | "html"
): Promise<ITransResult> {
  if (texts && texts.length <= 0) return [];
  for (; ;) {
    try {
      let ret = await axios({
        method: 'POST',
        baseURL: ENDPOINT,
        data: texts.map((v) => {
          return { text: v };
        }),
        url: '/translate',
        headers: {
          "ocp-apim-subscription-key": KEY,
          // location required if you're using a multi-service or regional (not global) resource.
          "Ocp-Apim-Subscription-Region": TRANS_LOCATION,
          "Content-type": "application/json",
          'X-ClientTraceId': uuidv4().toString()
        },
        params: {
          "api-version": "3.0",
          from: "zh-Hans",
          to: toLangs,
        },
        responseType: "json",
      });
      return ret.data;
    } catch (e: any) {
      console.log("Error:", ENDPOINT, toLangs, textType, texts, e.message);
      await timeoutPromise(5000);
    }
  }

  // return await (.then((v)=>v.data)).catch(e=>console.log(e.message)) as ITransResult;
}

// async function

async function lsDirDeep(rootPath: string) {
  let allItem = [] as { isDir: boolean; pathname: string; }[];
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
interface IDirInfo {
    baseName: string, icon: {};
}

interface IDocInfo {
  typ: "dir" | "file";
  name: string;
  path: string;
  items: IDocInfo[];
  updateAt: number;
  dirInfo?: IDirInfo;
}
async function buildDoc(docPath: string) {
  let navDirs = [] as IDocInfo[];
  let docDir = path.resolve(__dirname, docPath);
  let curDir: IDocInfo | undefined;
  console.log("doc root:", docDir);
  for (let en of await lsDirDeep(docDir)) {
    if (en.isDir) {
      // 处理目录
      try {
        let dirInfoFile = path.join(docDir, en.pathname, "__dir.json5")
        let dirInfo: IDirInfo = json5.parse(await fsp.readFile(dirInfoFile, "utf8"));
        dirInfo.baseName = en.pathname;
        await fsp.writeFile(dirInfoFile,json5.stringify(dirInfo,null,2),'utf8')
        curDir = {
          typ: "dir",
          name: path.parse(en.pathname).base,
          path: en.pathname.replace(/\\/g, "/"),
          items: [],
          updateAt: 0,
          dirInfo,
        };
        navDirs.push(curDir);
      } catch (e: any) {
        console.log("skip dir:", en, e.message);
      }


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
          try {
            desc = json5.parse(m[1]);
          } catch (e) {
            console.log('error get desc:', en.pathname);
          }
        }

        curDir?.items.push({
          typ: "file",
          name: path.parse(en.pathname).name,
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
  let transDirs = await transText(dirs, toLang, "plain");
  // console.log(transDirs);

  // 获取和翻译md文件
  for (let dirId in dirs) {
    // 翻译一级目录
    let dirName = dirs[dirId];
    let dirBase = path.join(baseLangDir, dirName);
    let transDirAllEntry = (await fsp.readdir(dirBase, { encoding: "utf8", withFileTypes: true }));
    let allFiles = transDirAllEntry.filter((v) => v.isFile());
    let allDirs = transDirAllEntry.filter((v) => v.isDirectory());


    for (let langId in toLang) {
      // 复制目录的其他文件
      let tDir = transDirs[dirId].translations[langId].text;
      tDir = tDir.replace(/\s*-\s*/, "-");
      let transMdDir = path.join(DOC_ROOT, toLang[langId], tDir);
      await fsp.mkdir(transMdDir, { recursive: true });
      for (let f of allFiles.filter((v) => !v.name.endsWith(".md"))) {
        let fullSrc = path.join(dirBase, f.name);
        await fsp.copyFile(fullSrc, path.join(transMdDir, f.name));
      }

      // 复制子目录的所有文件
      for (let dd of allDirs) {
        let fullSrc = path.join(dirBase, dd.name);
        console.log("COPY DIR:", fullSrc);
        // 拷贝目录
        for (let ff of await lsDirDeep(fullSrc)) {
          if (!ff.isDir) {
            let toFile = path.join(transMdDir, dd.name, ff.pathname);
            let p = path.parse(toFile);
            await fsp.mkdir(p.dir, { recursive: true });
            await fsp.copyFile(path.join(fullSrc, ff.pathname), toFile);
          }
        }

      }
    }

    let mdFiles = allFiles.filter((v) => v.name.endsWith(".md")).map((v) => v.name);
    // 翻译md文件名
    let transMdFiles = await transText(mdFiles.map(v=>v.slice(0,-3)), toLang, "plain");


    for (let mdId in mdFiles) {
      let mdName = mdFiles[mdId];
      let str = await fsp.readFile(path.join(dirBase, mdName), { encoding: "utf8" });
      // 翻译md内容,整理格式
      str = str.replace(/\r\n/g, '\n');
      // 查找代码块，替换为不翻译标志
      let lines = str.split('\n');
      let codeFlag = false;
      let sendLines = [];
      for (let k in lines) {
        let l = lines[k];
        if (l.startsWith('```')) {
          if (codeFlag) {
            // 结束代码块
            sendLines.push(`@@${k}@@`);
          } else {
            // 开始代码块
            sendLines.push(`@@${k}@@`);
          }
          // 代码, 替换为不翻译
          codeFlag = !codeFlag;
        } else if (codeFlag) {
          // 代码块
          sendLines.push(`@@${k}@@`);
        } else if (l.startsWith('<!--')) {
          // 注释块
          sendLines.push(`@@${k}@@`);
        }

        else {
          // 普通行
          sendLines.push(l);
        }
      }

      let transLines = await transText(sendLines, toLang, "html");
      // 写入翻译文件
      for (let langId in toLang) {
        let tDir = transDirs[dirId].translations[langId].text;
        tDir = tDir.replace(/\s*-\s*/, "-");
        let transMdDir = path.join(DOC_ROOT, toLang[langId], tDir);
        await fsp.mkdir(transMdDir, { recursive: true });
        let tMd = transMdFiles[mdId].translations[langId].text + ".md";
        tMd = tMd.replace(/\s*-\s*/, "-");

        let trandMdFile = path.join(transMdDir, tMd);

        let transStr = transLines.map(v => v.translations[langId].text).map(v => {
          // 处理因为翻译工具将行首的 # 后面空格剔除的问题
          let m = v.match(/^([#]+)([^# ].*)$/);
          if (m) {
            console.log("PROC ### ", v);
            return m[1] + ' ' + m[2];
          }
          // 处理首行的 "-""
          m = v.match(/^(\s*-)([^ ].*)$/);
          if (m) {
            console.log("PROC - ", v);
            return m[1] + ' ' + m[2];
          }
          // 处理首行的 "-""
          m = v.match(/^(\s*>)([^ ].*)$/);
          if (m) {
            console.log("PROC > ", v);
            return m[1] + ' ' + m[2];
          }

          return v;
        })
          .map(v => {
            // 还原不翻译的行
            let m = v.match(/@@([\d ]+)@@/);
            if (m && m.length == 2) {
              return lines[parseInt(m[1])];
            } else return v;
          })
          .join('\n');

        await fsp.writeFile(trandMdFile, transStr);
        // 设置修改时间与源文件一致
        let stSrc = await fsp.stat(path.join(dirBase, mdName));
        await fsp.utimes(trandMdFile, stSrc.atime, stSrc.mode);
        console.log("write :", trandMdFile);
      }
    }


  }
  console.log("all ok:", toLang);
}

(async () => {
    console.log(process.argv);

  // 生成索引
  await buildDoc(path.join(DOC_ROOT, "cn"));
  fs.copyFileSync(path.join(__dirname, "../../../doc/sw.js"), path.join(__dirname, "../../../site/sw.js"));


  if (process.argv[2] == 'lang') {
    let LANGS1: LANG_NAMES_T[] = ["en", "ja", "zh-Hant", "lzh", "yue"];
    let LANGS2: LANG_NAMES_T[] = ["ko", "fr", "it", "de", "ru"];
    for (let l of LANGS1) {
      try {
        await fsp.rm(path.join(DOC_ROOT, l), { recursive: true });
      } catch (e) { }
    }
    for (let l of LANGS2) {
      try {
        await fsp.rm(path.join(DOC_ROOT, l), { recursive: true });
      } catch (e) { }
    }
    await transDoc(LANGS1);
    await transDoc(LANGS2);
    for (let l of LANGS1) {
      await buildDoc(path.join(DOC_ROOT, l));
    }
    for (let l of LANGS2) {
      await buildDoc(path.join(DOC_ROOT, l));
    }
  }

})();
