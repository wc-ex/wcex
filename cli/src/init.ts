import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
/**
 */
export function init(opts: { template: string; dir: string }) {
  try {
    const projectPath = path.resolve(opts.dir);
    console.log('init', opts);
    if (fs.readdirSync(projectPath).length > 0) throw Error('dir not empty');
    console.log('project dir: ', projectPath);

    // 初始化简单项目, 或者标准 TS 项目
    const tplDir = path.resolve(__dirname, `../templates/${opts.template}`);
    if(!fs.existsSync(tplDir)){
      console.log("template: "+ opts.template, "not existed")
      console.log("valid template: ", fs.readdirSync(path.resolve(__dirname, `../templates`)))
      return;
    }
    fs.cpSync(tplDir, projectPath, { recursive: true });
    execSync('pnpm i');

    // 完成
  } catch (e: any) {
    console.log('error:', e.message);
  }
}
