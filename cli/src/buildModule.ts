// 构建 wcex 全栈组件模块, 包括 html和 service
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

let PROJECT_DIR: string;
let DIST_DIR: string;

type ModuleJson = {
  name: string;
  version: string;
  msc: {
    type: "module" | "service" | "html";
    html?: {
      name: string;
      description: string;
      type: "html";
      main: string;
    };
    service?: {
      name: string;
      description: string;
      type: "service";
      main: string;
      launch: "node" | "docker";
    };
  };
};

// 递归复制目录中的所有文件和文件夹
function deepCopyDir(src: string, dist: string) {
  if (!fs.existsSync(dist)) fs.mkdirSync(dist, { recursive: true });
  fs.readdirSync(src).forEach((f) => {
    let srcFile = path.join(src, f);
    let distFile = path.join(dist, f);
    if (fs.statSync(srcFile).isDirectory()) {
      deepCopyDir(srcFile, distFile);
    } else {
      fs.copyFileSync(srcFile, distFile);
    }
  });
}

function incVersion(ver: string): string {
  let v = ver.split(".");
  let last = parseInt(v.pop() as string);
  v.push((last + 1).toString());
  return v.join(".");
}

/**
 * 构建模块, 模块包含 html 和 service,需要 module.json
 * @param opts 
 */
export async function buildModule(opts: { dir: string }) {
  try {
    PROJECT_DIR = path.resolve(opts.dir);
    DIST_DIR = path.join(PROJECT_DIR, "dist");
    let moduleJsonFile = path.join(PROJECT_DIR, "module.json");
    if (!fs.existsSync(moduleJsonFile)) throw Error("module.json not existed");
    let moduleJson = JSON.parse(fs.readFileSync(moduleJsonFile, "utf8"));
    if (!moduleJson.name) throw Error("module.json name not existed");
    if (!moduleJson.version) moduleJson.version = "1.0.0";
    moduleJson.version = incVersion(moduleJson.version);
    moduleJson.msc = { type: "module" };

    // 初始化发布目录
    if (fs.existsSync(DIST_DIR)) fs.rmSync(DIST_DIR, { recursive: true });
    fs.mkdirSync(DIST_DIR, { recursive: true });

    // 构建 html
    if (fs.existsSync(path.join(PROJECT_DIR, "html/package.json"))) {
      console.log("build html");
      let htmlDir = path.join(PROJECT_DIR, "html");
      execSync("wcex build", { cwd: htmlDir, stdio: "inherit" });

      let htmlPkg = JSON.parse(fs.readFileSync(path.join(htmlDir, "dist/package.json"), "utf8"));
      moduleJson.msc.html = htmlPkg;
      moduleJson.dependencies = htmlPkg.dependencies;

      // 复制 html/dist 目录下所有文件到 DIST_DIR/下
      deepCopyDir( path.join(htmlDir, "dist"), DIST_DIR);
    }

    // 构建 service
    if (fs.existsSync(path.join(PROJECT_DIR, "service/package.json"))) {
        console.log("build service");
        let serviceDir = path.join(PROJECT_DIR, "service");
        execSync("pnpm build", { cwd: serviceDir, stdio: "inherit" });
        let serviceDistDir = path.join(serviceDir, "dist/-/service");
        let servicePkg = JSON.parse(fs.readFileSync(path.join(serviceDistDir, "package.json"), "utf8"));
        moduleJson.msc.service = servicePkg;
        // 复制 service/dist 目录下所有文件到 DIST_DIR/-/下
        deepCopyDir(serviceDistDir, path.join(DIST_DIR, "-/service/"));
    }

    // 保存 module.json
    fs.writeFileSync(moduleJsonFile, JSON.stringify(moduleJson, null, 2), "utf8");
    // fs.renameSync( path.join(DIST_DIR, "package.json"), path.join(DIST_DIR, "package.html.json"));

    fs.copyFileSync(moduleJsonFile, path.join(DIST_DIR, "package.json"));
    console.log("succeed build module:", moduleJson.name, moduleJson.version);
  } catch (e: any) {
    console.log("Error:", e.message);
  }
}
