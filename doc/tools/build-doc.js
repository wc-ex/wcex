const fsp = require("fs").promises;
const path = require("path");

// return {name,isDir}[]
async function deepDir(obj, pathname, rootPath) {
  for (let n of await fsp.readdir(pathname)) {
    // console.log("--> ",n)
    let p = path.join(pathname, n);
    let st = await fsp.stat(p);
    if (st.isDirectory()) {
      // 处理目录
      let desc = JSON.parse(await fsp.readFile(path.join(p, "description.json"), "utf8"));
      obj[n] = {
        typ: "dir",
        name: n,
        path: path.relative(rootPath, p),
        items: {},
        desc,
      };
      await deepDir(obj[n].items, p, pathname);
    } else if (st.isFile() && n.endsWith(".md")) {
      // 处理文件
        // 从md第一行获取描述信息
      let md = await fsp.readFile(p, "utf8");
      let firstline = md.trim().split(/(\n|\r\n)/,1)[0]
      let m = firstline.match(/^<!--DESC:(.+)-->$/)
      let desc= {};
      if(m && m.length ==2){
        desc= JSON.parse(m[1]);
      }

      obj[n] = {
        typ: "file",
        name: n,
        path: path.relative(rootPath, p).replace(/\\/g, "/"),
        desc,
      };
    }
  }
}

async function main() {
  let nav = {};
  let dir = path.resolve(__dirname, "../guide/cn");
  await deepDir(nav, dir, dir);
  await fsp.writeFile(path.join(dir, "nav.json"), JSON.stringify(nav));
//   console.log(JSON.stringify(nav, null, 2));
}

(async () => {
  await main();
})();
