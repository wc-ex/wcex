/**
 * 开发者模式
 * 启动静态服务,
 * 挂载目录:
 *      npm -> node_modules (库文件)
 *      build -> / (编译后的 js 文件)
 *      src -> / 源文件
 * 启动ws，发送变化通知
 * 启动 tsc, 编译 ts
 * @param port
 * @param host
 */

import fs from 'fs';
import path from 'path';
import { Server as HttpServer } from 'http';
import express from 'express';
import { WebSocketServer } from 'ws';
import Watchpack from 'watchpack';
import { spawn, ChildProcess } from 'child_process';

function initHotload(server: HttpServer, projectName: string, projectDir: string) {
  const wss = new WebSocketServer({
    noServer: true,
  });

  server.on('upgrade', (request, socket, head) => {
    if (request.url === '/_hotws') {
      wss.handleUpgrade(request, socket, head, function done(ws) {
        console.log('new hot connect :', request.socket.remoteAddress);
      });
    } else {
      socket.destroy();
    }
  });

  const wp = new Watchpack({
    ignored: ['**/.git', '**/node_modules', '*.ts'],
  } as any);

  // 500 ms 内防止重复发送
  const changedMap = {} as { [k: string]: boolean };
  wp.on('change', (filePath) => {
    console.log('===changed===', filePath);
    const relPath = path.relative(projectDir, filePath);
    // 不处理ts
    const parsed = path.parse(relPath);
    if (parsed.ext == '.ts') return;

    // 检查是否在build目录，否则默认映射到

    // 500 ms 内防止重复发送
    if (!changedMap[relPath]) {
      changedMap[relPath] = true;
      setTimeout(() => {
        changedMap[relPath] = false;
      }, 500);
      const changed = {
        project: projectName,
        path: relPath.match(/^src[\/\\]/)
          ? path.relative('src/', relPath)
          : relPath.match(/^build[\/\\]/)
          ? path.relative('build/src/', relPath)
          : relPath,
      };
      console.log('changed', changed, relPath);
      wss.clients.forEach((ws) => {
        ws.send(JSON.stringify(changed));
      });
    }
  });

  // wp.watch({files: [path.join(projectDir, 'src/'), path.join(projectDir, 'build/')]});
  wp.watch({directories: [path.join(projectDir)]});
  console.log('start hotloader:',projectDir);
}

let tsc: ChildProcess | undefined;
// process.on('exit', (code) => {
//   console.log('exit', code);
//   if (tsc) {
//     console.log('kill tsc pid=', tsc.pid);
//     // tsc.kill();
//   }
// });

export async function dev(opts: any) {
  try {
    const projectDir = path.resolve(opts.dir);
    console.log('start wc dev server for', projectDir);
    const pkg = JSON.parse(fs.readFileSync(path.join(projectDir, 'package.json'), 'utf8'));
    console.log('monit dev project', pkg.name, pkg.version);
    console.log(`http://${opts.host}:${opts.port}`);
    // 启动 http 服务
    const app = express();
    const server = new HttpServer(app);
    // 跨域配置
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      res.header('Access-Control-Allow-Methods', '*');
      next();
    });

    app.use('/_dist', express.static(path.join(projectDir, 'dist')));
    app.use(`/node_modules/${pkg.name}`, express.static(path.join(projectDir, 'build/src')));
    app.use(`/node_modules/${pkg.name}`, express.static(path.join(projectDir, 'src')));
    app.use(`/node_modules/${pkg.name}`, express.static(projectDir));
    app.use(`/npm/${pkg.name}`, express.static(path.join(projectDir, 'build/src')));
    app.use(`/npm/${pkg.name}`, express.static(path.join(projectDir, 'src')));
    app.use(`/npm/${pkg.name}`, express.static(projectDir));
    app.use(`/npm`, express.static(path.join(projectDir, 'node_modules')));
    app.use('/', express.static(path.join(projectDir, 'build/src')));
    app.use('/', express.static(path.join(projectDir, 'src')));
    app.use('/', express.static(projectDir));

    if (fs.existsSync(path.join(projectDir, 'tsconfig.json'))) {
      console.log('init typescript monit');
      tsc = spawn('tsc -w', { cwd: projectDir, stdio: 'inherit', shell: true });
    }

    // 启动ws
    initHotload(server, pkg.name, projectDir);

    server.listen(opts.port, opts.host, () => {
      console.log('listen dev server successed');
    });
  } catch (e: any) {
    console.log('Error:', e.message);
  }
}
