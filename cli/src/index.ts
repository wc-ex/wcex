import { program } from 'commander';
import path from 'path';
import fs from 'fs';
import { dev } from './dev';
import { init } from './init';
import { build } from './build';
import { test } from './test';


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

program
  .command('test')
  .description('run ui test cases')
  .option('-d, --dir <string>', 'test cases dir', '.')
  .option('-w,--wcex <string>', 'wcex url or version', '')
  .option('-c,--concurrent <int>', 'concurrent run cases nums', '1')
  .option('-n,--npm <string>', 'npm url', '')
  .option('-p,--port <int>', 'test server listen port', '11111')
  .option('-b,--browser <string>', 'browser: firefox,chrome,edge,...', 'chrome')
  .option('-s,--show', 'show browser ui', false)

  .action(test);

program.parse();

