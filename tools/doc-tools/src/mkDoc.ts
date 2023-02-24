import fs,{promises as fsp} from "fs";
import path from "path";
import axios from "axios";
import os from 'os'

// return {name,isDir}[]
// const { v4: uuidv4 } = require('uuid');
const key = fs.readFileSync(path.join(os.homedir(),'wcex_trans_key.txt'),'utf8')

let endpoint = "https://api.cognitive.microsofttranslator.com";

// location, also known as region.
// required if you're using a multi-service or regional (not global) resource. It can be found in the Azure portal on the Keys and Endpoint page.
let location = "eastasia";

async function transText(text: string,toLangs:string[]) {
  return axios({
    baseURL: endpoint,
    url: "/translate",
    method: "post",
    headers: {
      "Ocp-Apim-Subscription-Key": key,
      // location required if you're using a multi-service or regional (not global) resource.
      "Ocp-Apim-Subscription-Region": location,
      "Content-type": "application/json",
      // 'X-ClientTraceId': uuidv4().toString()
    },
    params: {
      "api-version": "3.0",
      textType: "html",
      from: "zh-Hans",
      to: toLangs,
    },
    data: [
      {
        text,
      },
    ],
    responseType: "json",
  })
    .then(function (response) {
      console.log(JSON.stringify(response.data, null, 4));
    })
    .catch((e) => {
      console.log(e.message);
    });
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
        icon,
      };
      navDirs.push(curDir);
    } else {
      //处理文件
      if (en.pathname.endsWith(".md")) {
        let fullFilePath = path.join(docDir, en.pathname);
        // 从md第一行获取描述信息
        let md = await fsp.readFile(fullFilePath, "utf8");
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
          items: [],
          ...desc,
        });
      }
    }
  }
  await fsp.writeFile(path.join(docDir, "nav.json"), JSON.stringify(navDirs));
  console.log("== Succeed ", docDir);
}

async function transDoc(toLang:string[]){

}

(async () => {
  // let text = await fsp.readFile("../../doc/guide/cn/01-开始/01-简介.md", "utf8");
  await transDoc(['en']);
  // await buildDoc("../guide/cn");
})();
