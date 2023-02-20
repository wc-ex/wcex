// 执行所有的测试用例
// 遍历所有的子目录，子目录中包含有test.json 的为测试集所在目录
// 获取测试集目录中的 *.html 作为测试用例模板标签

import pLimit from "p-limit";
import { locateChrome } from "locate-app";
import puppeteer from "puppeteer-core";
import httpServer from "http-server";
import path from "path";
import fs from "fs";
import walkdir from "walkdir";

const PORT = 10000;
// 启动httpd服务器
httpServer.createServer({ root: path.join(".", "case") }).listen(PORT, () => {
  console.log("http server start:", PORT);
});

// async walkDir
const limit = pLimit(1);

const testCases = [];

async function launch() {
  // 打开浏览器
  const exe = await locateChrome();
  console.log("used browser:", exe);
  const browser = await puppeteer.launch({
    executablePath: exe,
    headless: true,
    devtools: false,
    extraPrefsFirefox: false,
  });

  // 启动所有测试用例
  let testDir = path.join(".", "case");
  let testIndex = path.join(testDir, "index.html");
  for (let dir of await fs.promises.readdir(testDir)) {
    let dirSt = await fs.promises.stat(path.join(testDir, dir));
    if (dirSt.isDirectory()) {
      console.log("测试集: ", dir);
      try {
        walkdir(path.join(testDir, dir),{sync:true} ,(path, stat) => {
          testCases.push(
            limit(
              () =>{
                console.log(" add ...", path)
                return new Promise((res) => {
                    setTimeout(() => {
                      console.log(" run ...", path);
                      res();
                    }, 1000);
                  })  
              }
            )
          );
        });
      } catch (e) {
        console.log("");
      }
    }
  }

  console.log(testCases.length);
  await Promise.all(testCases);
  console.log('OK');

  // const page = await browser.newPage();
  // // Set screen size
  // await page.setViewport({ width: 1080, height: 1024 });

  // await page.goto("https://baidu.com");

  // // Type into search box
  // await page.type(".search-box__input", "automate beyond recorder");

  // // Wait and click on first result
  // const searchResultSelector = ".search-box__link";
  // await page.waitForSelector(searchResultSelector);
  // await page.click(searchResultSelector);

  // // Locate the full title with a unique string
  // const textSelector = await page.waitForSelector("text/Customize and automate");
  // const fullTitle = await textSelector.evaluate((el) => el.textContent);

  // // Print the full title
  // console.log('The title of this blog post is "%s".', fullTitle);

  await browser.close();
  process.exit(0);
}

(async () => {
  try {
    await launch();
  } catch (e) {
    console.log(e);
    process.exit(-1);
  }
})();
