/**
 * 开发者模式
 * 启动静态服务,
 * 挂载目录:
 *      npm -> node_modules (库文件)
 *      build -> / (编译后的 js 文件)
 *      src -> / 源文件
 * - 启动ws，发送变化通知
 * - 启动 tsc, 编译 ts
 * - 支持--proxy 属性，转发请求到指定服务
 * - 默认使用pnpm作为包管理器，自动添加依赖npm包
 * - 为打包命令添加参数，自动打包最小化npm包到发布目录
 * @param port
 * @param host
 */

import fs from "fs";
import path from "path";
import os from "os";
import kebab from "lodash.kebabcase";

import { Server as HttpServer } from "http";
import express from "express";
import { WebSocketServer } from "ws";
import Watchpack from "watchpack";
import { spawn, ChildProcess, execSync } from "child_process";

import httpProxy from "http-proxy";
import { parseHtmlModules } from "./utils";

function initHotload(server: HttpServer, projectName: string, projectDir: string) {
  const wss = new WebSocketServer({
    noServer: true,
  });

  server.on("upgrade", (request, socket, head) => {
    if (request.url === "/_hotws") {
      wss.handleUpgrade(request, socket, head, function done(ws) {
        console.log("new hot connect :", request.socket.remoteAddress);
      });
    } else {
      socket.destroy();
    }
  });

  const wp = new Watchpack({
    ignored: ["**/.git", "**/node_modules", "*.ts","dist"],
  } as any);

  // 500 ms 内防止重复发送
  const changedMap = {} as { [k: string]: boolean };
  wp.on("change", (filePath) => {
    const relPath = path.relative(projectDir, filePath);
    // 不处理ts
    const parsed = path.parse(relPath);
    if (parsed.ext == ".ts") return;


    // 检查是否为html文件
    if(parsed.ext == '.html'){
      checkInstallHtmlMetaModules(projectDir,filePath);
    }
    // 500 ms 内防止重复发送
    if (!changedMap[relPath]) {
      changedMap[relPath] = true;
      setTimeout(() => {
        changedMap[relPath] = false;
      }, 500);
      const changed = {
        project: projectName,
        path: relPath.match(/^src[\/\\]/)
          ? path.relative("src/", relPath)
          : relPath.match(/^build[\/\\]/)
          ? path.relative("build/src/", relPath)
          : relPath,
      };
      console.log("changed: ", changed, relPath);
      wss.clients.forEach((ws) => {
        ws.send(JSON.stringify(changed));
      });
    }
  });

  // wp.watch({files: [path.join(projectDir, 'src/'), path.join(projectDir, 'build/')]});
  wp.watch({ directories: [path.join(projectDir)] });
  console.log("start hotloader:", projectDir);
}

let tsc: ChildProcess | undefined;
// process.on('exit', (code) => {
//   console.log('exit', code);
//   if (tsc) {
//     console.log('kill tsc pid=', tsc.pid);
//     // tsc.kill();
//   }
// });

// 检查当前项目使用的包管理器
function checkPackageManager(projectDir: string): string {
  if (fs.existsSync(path.join(projectDir, "pnpm-lock.yaml"))) {
    return "pnpm";
  }
  if (fs.existsSync(path.join(projectDir, "yarn.lock"))) {
    return "yarn";
  }
  return "npm";
}

function addPackageByPackageManager(projectDir: string, pkgName: string,version:string|undefined,isDevDependence:boolean) {
  try {

    // 读取当前项目的package.json文件，获取依赖的软件包
    // const projectPkg = JSON.parse(fs.readFileSync(path.join(projectDir, "package.json"), "utf8"));
    // 读取安装的软件包的package.json 文件
    const pkgPackageJsonFile = path.join(projectDir, "node_modules", pkgName, "package.json")
    let pkg = fs.existsSync(pkgPackageJsonFile)? JSON.parse(fs.readFileSync(pkgPackageJsonFile, "utf8")):null;
    if (pkg) {      
      if(version){
        // 检查特定版本
        if(pkg.version == version ){
          console.log('existed version: ',pkgName,version);
          return;    
        }
        // 否则直接安装指定版本
      }else{
        // 检查最新版本
        console.log('existed: ',pkgName,pkg.version);
        return;  
      }
    }
    // 安装指定软件包
    // 检查当前项目使用的包管理器
    let pm = checkPackageManager(projectDir);
    console.log("addPackageByPackageManager", pm, projectDir, pkgName);
    switch (pm) {
      case "pnpm":
        execSync(`pnpm add ${pkgName}${version?'@'+version:''} ${isDevDependence?'-D':''}`, { stdio: "inherit", cwd: projectDir });
        break;
      case "yarn":
        execSync(`yarn add ${pkgName}${version?'@'+version:''} ${isDevDependence?'-D':''}`, { stdio: "inherit", cwd: projectDir });
        break;
      default:
        execSync(`npm install ${pkgName}${version?'@'+version:''} ${isDevDependence?'-D':''}`, { stdio: "inherit", cwd: projectDir });
        break;
    }

    // 检查是否自带了types，否则安装 @types/xxx软件包
    // 再次读取安装的软件包的package.json 文件
    pkg = JSON.parse(fs.readFileSync(path.join(projectDir, "node_modules", pkgName, "package.json"), "utf8"));

    if (!(pkg.types || pkg.typings)) {
      // 尝试添加 @types/xxx软件包
      addPackageByPackageManager(projectDir, `@types/${pkgName.startsWith("@") ? kebab(pkgName) : pkgName}`,undefined,true);
    }
  } catch (e: any) {
    console.log("Add Package Error:", pkgName, e.message);
  }
}


function eachHtmlFile(dir: string,callback:(file:string)=>void) {
  fs.readdirSync(dir).forEach((file) => {
    if (file.startsWith(".") || file == "node_modules" || file == "dist" || file=='build') return;

    let st = fs.statSync(path.join(dir, file));
    // 判断是否为目录
    if (st.isDirectory()) {
      return eachHtmlFile(path.join(dir, file),callback);
    }

    if(file.endsWith('.html')){
      callback(path.join(dir,file));
    }
  });
}

function checkInstallHtmlMetaModules(projectDir: string,htmlFile:string) {
  let modules = parseHtmlModules(htmlFile);
  Object.keys(modules).forEach((pkgName) => {
    addPackageByPackageManager(projectDir, pkgName,modules[pkgName].version,false);
  });

}

function parseAllHtmlMetaModules(projectDir: string) {
  eachHtmlFile(projectDir,(file)=>{
    checkInstallHtmlMetaModules(projectDir,file);
  });
}

export async function dev(opts: any) {
  try {
    const projectDir = path.resolve(opts.dir);
    console.log("start wc dev server for", projectDir);
    const pkg = JSON.parse(fs.readFileSync(path.join(projectDir, "package.json"), "utf8"));
    console.log("monit dev project", pkg.name, pkg.version);
    console.log(`http://${opts.host}:${opts.port}`);


    // parseAllHtmlMetaModules(projectDir);

    // 启动 http 服务
    const app = express();
    const server = new HttpServer(app);
    app.options(/.*/, (req, res) => {
      res.status(200).end("ok");
    });
    // 跨域配置
    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Content-Type");
      res.header("Access-Control-Allow-Methods", "*");
      next();
    });

    // 代理配置
    if (opts.proxy) {
      const [reqUrl, toUrl] = opts.proxy.split("=");
      const proxy = httpProxy.createProxyServer({});
      console.log("proxy", reqUrl, toUrl);
      // 转发请求到后端服务器
      app.use(reqUrl, (req, res) => {
        try {
          proxy.web(req, res, {
            target: toUrl,
            changeOrigin: true,
            autoRewrite: true,
            protocolRewrite: "http",
            cookieDomainRewrite: "",
            cookiePathRewrite: "",
            headers: {
              host: new URL(toUrl).host,
            },
          });
        } catch (e: any) {
          console.log("Error to Proxy from:", reqUrl, toUrl, e.message);
          res.status(500).end(e.message);
        }
      });
    }

    app.use("/_dist", express.static(path.join(projectDir, "dist"), {}));
    app.use(`/node_modules/${pkg.name}`, express.static(path.join(projectDir, "build/src")));
    app.use(`/node_modules/${pkg.name}`, express.static(path.join(projectDir, "src")));
    app.use(`/node_modules/${pkg.name}`, express.static(projectDir));
    app.use(`/npm/${pkg.name}`, express.static(path.join(projectDir, "build/src")));
    app.use(`/npm/${pkg.name}`, express.static(path.join(projectDir, "src")));
    app.use(`/npm/${pkg.name}`, express.static(projectDir));
    app.use(`/npm`, express.static(path.join(projectDir, "node_modules")));
    app.use("/", express.static(path.join(projectDir, "build/src")));
    app.use("/", express.static(path.join(projectDir, "src")));
    app.use("/", express.static(projectDir));

    if (fs.existsSync(path.join(projectDir, "tsconfig.json"))) {
      console.log("init typescript monit");
      tsc = spawn("tsc -w", { cwd: projectDir, stdio: "pipe", shell: true });
      tsc!.stdout?.on("data", (data) => {
        // 过滤console清屏、回退等控制指令的输出
        if (data.toString().match(/\x1Bc/)) return;

        console.log(`TSC: ${data.toString().trim()}`);
      });
      tsc!.stderr?.on("data", (data) => {
        console.error(`TSC Error: ${data}`);
      });
    }

    // 启动ws
    initHotload(server, pkg.name, projectDir);

    server.listen(opts.port, opts.host, () => {
      console.log("listen dev server successed");
    });
  } catch (e: any) {
    console.log("Error:", e.message);
  }
}
