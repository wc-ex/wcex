import path from 'path';
import fs from 'fs';
import process from 'process';
import colors from 'colors';
import express from 'express';
import { async } from 'walkdir';
import { locateBrowser } from "locate-app";
import puppeteer, { Browser } from "puppeteer-core";


// 测试入口无需设置手动加载wcex，自动注入
// 测试入口无需设置npm,自动注入
// 执行指定目录下所有 WCEX UI 测试用例
// 搜索文件夹，启动组件，并获取输出结果
// 检测测试入口:
// testIndex.html, 为完整的HTML index 文件
// testApp.html, 为主 app.index 文件
const TEST_APP = "testEntry.html";
// 测试主入口
const app = express();
const testRouter = express.Router();

function deepTesterDir(dir: string, outDirs: string[]) {
    if (fs.existsSync(path.join(dir, TEST_APP))) {
        outDirs.push(dir);
    } else {
        fs.readdirSync(dir, { encoding: 'utf8', withFileTypes: true }).forEach((d) => {
            if (d.isDirectory()) {
                deepTesterDir(path.join(dir, d.name), outDirs);
            }
        });
    }
}


function limitPromises(promiseList: (() => Promise<any>)[], nums: number) {
    let all = promiseList.slice(0);
    function _run(res: (v: any) => void) {
        let p = all.shift();
        if (p) p().then(v => {
            (<any>p).__result = v;
            // 检查是否全部完成
            if (promiseList.filter(v => (v as any).__result === undefined).length == 0) {
                res(promiseList.map(v => (v as any).__result));
            } else {
                // 执行下一个
                _run(res);
            }
        });
    }
    return new Promise(res => {
        for (let i = 0; i < nums; i++) {
            _run(res);
        }
    });
}

const TEST_HTML_DEFAULT = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <title>WCEX TEST DEFAULT INDEX</title>
    <meta name="viewport" content="initial-scale=1.0,width=device-width">
    <meta charset="utf-8">
    <style>
        html,body{
            width: 100%;
            height: 100%;
            overflow: hidden;
            margin: 0;
            padding: 0;
            font-size: 16px;
        }
    </style>
</head>

<body>
     <test_entry-></test_entry->
</body>

</html>
`;

let ERROR_FLAG = false;

// 运行一个测试用例
async function runCase(browser: Browser, options: { id: number, baseDir: string, testDir: string, wcexUrl: string, npmUrl: string; localServer: string; isShow: boolean; }): Promise<any> {
    if (ERROR_FLAG) return;
    let startTm = new Date().getTime();

    function errorOut(msg: string) {
        ERROR_FLAG = true;
        console.error(colors.red(prefix + msg));
        if (!options.isShow) process.exit(1);
    }


    // 挂载测试目录
    let homeDir = `${options.testDir.replace(/\\/g, '/')}/index.html`;
    testRouter.use('/' + encodeURI(homeDir), (req, res) => {
        const custumHtml = path.join(options.baseDir, options.testDir, 'index.html');
        let html = fs.existsSync(custumHtml) ? fs.readFileSync(custumHtml, 'utf8') : TEST_HTML_DEFAULT;
        // 替换wcex和npm路径
        html = html.replace('</head>', `
        <meta name="npm" content="${options.npmUrl}">
        <script src="${options.wcexUrl}"></script>                
        </head>
        `
        );
        res.setHeader('content-type', 'text/html');
        res.status(200).end(html);
    });
    console.log(`Run: ${options.id}:`, homeDir);
    // let homeUrl = `${options.localServer}/${options.testDir}/${options.testDir}`;
    // 重用 blank page 或者新建page
    let blankPages = (await browser.pages()).filter(v=>v.url().startsWith('about:'));


    let page = blankPages.length>0?blankPages[0]: await browser.newPage();
    const prefix = `${options.id}-[${homeDir}] `;
    await page.setViewport({ width: 0, height: 0 });

    // 读取页面配置
    const pageConfigFile = path.join(options.baseDir, options.testDir, 'page.json');
    if (fs.existsSync(pageConfigFile)) {
        await page.setViewport(JSON.parse(fs.readFileSync(pageConfigFile, 'utf8')));
    }

    return new Promise((res) => {

        page.on('console', (ev) => {
            const loc = ev.location();
            const text = ev.text();
            switch (ev.type()) {
                case 'error':
                    if (!(loc.url?.match(/favicon\.ico/))) {
                        // 出现错误，停止执行
                        errorOut(`${text}, ${loc.url}, ${loc.columnNumber || 0}/${loc.lineNumber || 0}`)
                    }
                    break;
                case 'warning':
                    console.warn(colors.yellow(prefix + text));
                    break;
                default:
                    if (text === 'WCEX_TEST_END') {
                        page.close();
                        let tm = Math.round((new Date().getTime() - startTm)) / 1000;
                        res({ id: options.id, dir: homeDir, time: tm });
                        console.log(colors.green(prefix + `succeed, time: ${tm}s`));
                    } else {
                        console.log(colors.gray(prefix + text));
                    }
                    break;
            }
        });
        page.on('pageerror',(ev)=>{
            errorOut(`${ev.name}, ${ev.message}, \n ${ev.stack}`)
        })
        page.on('error',(ev)=>{
            errorOut(`${ev.name}, ${ev.message}, \n ${ev.stack}`)
        })

        page.goto(`${options.localServer}/${homeDir}`);
    });

}

async function launchBrowser(browserName: string, isShow: boolean) {
    // 打开浏览器
    const browserExe = await locateBrowser(browserName);
    console.log("used browser:", browserExe);
    return await puppeteer.launch({
        executablePath: browserExe,
        headless: !isShow,
        devtools: false,
        product: browserName.match('firefox') ? 'firefox' : 'chrome',

    });
}
interface IOpts { wcex: string, dir: string, concurrent: number, npm: string; port: number, browser: string, show: boolean; }

export async function test(opts: IOpts) {

    const TESTDIR = path.resolve(opts.dir);
    // app.use((req, res, next) => {
    //     console.log(colors.gray(`HTTP ${req.method} ${req.url}`));
    //     next();
    // });
    app.use('/', testRouter);
    app.use(`/`, express.static(TESTDIR));
    // 搜索测试用例目录
    console.log("run UI tester in :", TESTDIR, opts);
    try {
        let testDirs = [] as string[];
        deepTesterDir(TESTDIR, testDirs);
        console.log("test dirs:", testDirs);


        // 启动浏览器
        const browser = await launchBrowser(opts.browser, opts.show);

        browser.on('disconnected', () => {
            process.exit(0);
        });
        app.listen(opts.port, () => {
            console.log("server listen ok", opts.port);
        });

        const DEFAULT_NPM = 'https://npm.elemecdn.com';
        // const DEFAULT_NPM='https://cdn.jsdelivr.net/npm'
        let npm = opts.npm || DEFAULT_NPM;

        let wcex = (!opts.wcex) ? `${npm}/wcex/index.js` : opts.wcex.match(/^\d+\.\d+\.\d+$/) ? `${npm}/wcex@${opts.wcex}/index.js` : opts.wcex;
        // 并发运行测试目录
        let counter = 0;
        let ret = await limitPromises(testDirs.map(dir => {
            return () => runCase(
                browser,
                {
                    id: counter++,
                    testDir: path.relative(TESTDIR, dir),
                    baseDir: TESTDIR,
                    wcexUrl: wcex,
                    npmUrl: npm,
                    localServer: `http://localhost:${opts.port}`,
                    isShow: opts.show
                });
        }
        ), 2);
        if (!ERROR_FLAG) console.log(colors.green("=== all completed ===\n"), ret);
        // 输出测试报告
        if (!opts.show) process.exit(0);
    } catch (e: any) {
        console.error('Failed:', e);
    }

}

