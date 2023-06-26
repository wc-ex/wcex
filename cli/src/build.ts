// 构建 Web Component 项目
// 最小化, 保留头部页面注释

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import htmlMin from 'html-minifier-terser';
import {buildModule} from './buildModule'
import jsMin from 'terser';
let PROJECT_DIR = '';
let DIST_DIR = '';

function _upgradeVerson(pkgFile: string): { name: string; version: string } {
  // 升级版本号
  //   const pkgFile = path.join(PROJECT_PATH, 'package.json');
  const json = JSON.parse(fs.readFileSync(pkgFile, 'utf8'));
  json.version = (json.version as string)
    .split('.')
    .map((v, i) => (i == 2 ? (parseInt(v) + 1).toString() : v))
    .join('.');
  fs.writeFileSync(pkgFile, JSON.stringify(json, null, 2));
  console.log('using new version:', json.version);
  return json;
}

function deepDir(dir: string): string[] {
  return fs
    .readdirSync(dir)
    .map((v) => {
      let p = path.join(dir, v);
      return fs.statSync(p).isDirectory() ? deepDir(p) : p;
    })
    .flat();
}

async function distHtml(src: string,dependenciesSet:Set<string>) {
  let srcFile = path.join(PROJECT_DIR, 'src', src);
  let distFile = path.join(DIST_DIR, src);

  console.log('dist html:', srcFile, distFile);
  let html = fs.readFileSync(srcFile, 'utf8');
  // 删除调试 meta
  html = html.replace(/<meta\s+name="hot".*?>/g, '').replace(/<meta\s+name="debug".*?>/g, '');

  // 收集所有的依赖module


  // 解析HTML
  let outHtml = await htmlMin.minify(html, {
    minifyJS: {
      compress:true,
      mangle: {
        properties: {
          keep_quoted: true,
          regex: /^_[^_]/,
        },
      },
    },
    minifyCSS: true,
    collapseWhitespace: true,
    removeComments: true,
    ignoreCustomComments: [/^!!/],
    removeAttributeQuotes: true,
  });
  fs.mkdirSync(path.parse(distFile).dir, { recursive: true });
  fs.writeFileSync(distFile, outHtml, 'utf8');
  // let dom = new JSDOM();
}

async function distTs(src: string) {
  let p = path.parse(src);
  const jsSrc = path.join(p.dir, p.name + '.js');
  let srcFile = path.join(PROJECT_DIR, 'build/src', jsSrc);
  let distFile = path.join(DIST_DIR, jsSrc);
  let js = fs.readFileSync(srcFile, 'utf8');

  console.log('dist ts:', srcFile, distFile);
  let outJs = await jsMin.minify(js, { compress: true });
  // console.log('outJs:', outJs);

  fs.mkdirSync(path.parse(distFile).dir, { recursive: true });
  // 输出
  if (outJs.code) {
    fs.writeFileSync(distFile, outJs.code, 'utf8');
  } else throw Error('Error: no code output');
}

async function distJs(src: string) {
  let srcFile = path.join(PROJECT_DIR, 'src', src);
  let distFile = path.join(DIST_DIR, src);
  console.log('dist js:', srcFile, distFile);
  let js = fs.readFileSync(srcFile, 'utf8');

  let outJs = await jsMin.minify(js, { compress: true, ecma: 2015 });

  fs.mkdirSync(path.parse(distFile).dir, { recursive: true });
  // 输出
  if (outJs.code) {
    fs.writeFileSync(distFile, outJs.code, 'utf8');
  } else throw Error('Error: no code output');
}


/**
 * TODO:
 * 1. 实现合并同源JS到HTML
 * 2. 实现自动添加UI库的组件到package.json
 */
async function buildProject() {
  // 初始化目录
  if (fs.existsSync(DIST_DIR)) fs.rmSync(DIST_DIR, { recursive: true });
  fs.mkdirSync(DIST_DIR, { recursive: true });
  // 检测和运行Typescript项目
  if (fs.existsSync(path.join(PROJECT_DIR, 'tsconfig.json'))) {
    const buildDir = path.join(PROJECT_DIR, 'build');
    console.log('run typescript build to ', buildDir);
    if (fs.existsSync(buildDir)) fs.rmSync(buildDir, { recursive: true });
    execSync(`tsc`, { stdio: 'inherit', cwd: PROJECT_DIR });
  }
  // 处理src文件,获取相对路径(src下)
  const srcFiles = deepDir(path.join(PROJECT_DIR, 'src')).map((v) => path.relative(path.join(PROJECT_DIR, 'src'), v));
  console.log('srcFiles:', srcFiles);

  const dependenciesSet = new Set<string>();

  // 发布文件
  for (let f of srcFiles) {
    let srcExt = path.parse(f).ext;
    let src = path.join(PROJECT_DIR, 'src', f);

    switch (srcExt) {
      case '.html':
        await distHtml(f,dependenciesSet);
        break;
      case '.js':
        await distJs(f);
        break;
      case '.ts':
        await distTs(f);
        break;
      default: {
        let distFile = path.join(DIST_DIR, f);
        console.log('copy:', f, 'to:', distFile);
        fs.mkdirSync(path.parse(distFile).dir, { recursive: true });
        // 拷贝
        fs.copyFileSync(src, distFile);
      }
    }
  }

  // 添加html文件的模块到依赖

  // 升级版本号
  let pkgFile = path.join(PROJECT_DIR, 'package.json');
  const pkg = _upgradeVerson(pkgFile);
  fs.copyFileSync(pkgFile, path.join(DIST_DIR, 'package.json'));

  // 完成
  console.log('succeed dist ', pkg.name, pkg.version);
}

export function build(opts: { dir: string }) {
  try {
    PROJECT_DIR = path.resolve(opts.dir);
    DIST_DIR = path.join(PROJECT_DIR, 'dist');
    console.log('build project to:', DIST_DIR);

    // 检测是否是模块
    if(fs.existsSync(path.join(PROJECT_DIR, 'module.json'))){
      buildModule(opts)
      return;
    }

    // 构建标准前端项目
    buildProject()
      .then(() => {
        console.log('build project to:', DIST_DIR);
      })
      .catch((e) => {
        console.log('build project error:', e.message);
      });
  } catch (e: any) {
    console.log(e.message);
  }
}
