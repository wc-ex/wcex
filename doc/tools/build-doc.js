const fsp = require("fs").promises;
const path = require("path");

// return {name,isDir}[]
async function deepDir(dirList, pathname, rootPath) {
  for (let listName of await fsp.readdir(pathname)) {
    // console.log("--> ",n)
    let p = path.join(pathname, listName);
    let st = await fsp.stat(p);
    if (st.isDirectory()) {
      // 处理目录
      let icon = JSON.parse(await fsp.readFile(path.join(p, "icon.json"), "utf8"));
      let info = {
        typ: "dir",
        name: listName,
        path: path.relative(rootPath, p),
        items: [],
        icon,
      };
      dirList.push(info);
      await deepDir(info.items, p, pathname);
    } else if (st.isFile() && listName.endsWith(".md")) {
      listName = listName.slice(0, listName.length - 3);
      // 处理文件
      // 从md第一行获取描述信息
      let md = await fsp.readFile(p, "utf8");
      let firstline = md.trim().split(/(\n|\r\n)/, 1)[0];
      let m = firstline.match(/^<!--DESC:(.+)-->$/);
      let desc = {};
      if (m && m.length == 2) {
        desc = JSON.parse(m[1]);
      }
      let info = {
        typ: "file",
        name: listName,
        path: path.relative(rootPath, p).replace(/\\/g, "/"),
        ...desc,
      };

      dirList.push(info);
    }
  }
}

async function main() {
  let navDirs = [];
  let dir = path.resolve(__dirname, "../guide/cn");
  await deepDir(navDirs, dir, dir);
  await fsp.writeFile(path.join(dir, "nav.json"), JSON.stringify(navDirs));
  //   console.log(JSON.stringify(nav, null, 2));
}

(async () => {
  await main();
})();
