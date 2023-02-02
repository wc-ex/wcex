import { program } from 'commander';
import path from 'path';
import fs from 'fs';
import { dev } from './dev';
import { init } from './init';
import { build } from './build';

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));
// console.log(pkg.name, pkg.version);
program
  // .enablePositionalOptions()
  .name("wcex")
  .version(pkg.version)
  .description(`${pkg.name} ${pkg.version}, ${pkg.description}`);

program
  .command('dev', { isDefault: true })
  .description('DEFAULT command, start project in develop mode')
  .option('-p, --port <number>', 'listen port', (v) => parseInt(v), 8101)
  .option('--host <string>', 'listen host', '127.0.0.1')
  .option('--dir <string>', 'develop project dir', '.')

  .action(dev);

program
  .command('init')
  .description('init new web component project in current directory')
  .option('-t, --template', 'template project:( basic,ts,...)', true)
  .option('--dir <string>', 'init project dir', '.')
  .action(init);

program
  .command('build')
  .description('build web component project')
  .option('--dir <string>', 'init project dir', '.')
  .action(build);

program.parse();

// 启动工作区
// (async () => {
//   const opts = program.opts();
//   //   const workspace = new WorkSpace(opts);
//   try {
//     // await workspace.init();
//   } catch (e: any) {
//     if (process.env["DEBUG"]) {
//       console.error("error:", e);
//       debugger;
//     } else {
//       console.error("error:", e.message);
//       program.help();
//     }
//   }
// })();
