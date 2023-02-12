import { program } from 'commander';
import path from 'path';
import fs from 'fs';

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));
// console.log(pkg.name, pkg.version);
program
  // .enablePositionalOptions()
  .name("cn-font-tools")
  .version(pkg.version)
  .description(`${pkg.name} ${pkg.version}, ${pkg.description}`)
  .requiredOption('-f,--font-file <string>')
  .requiredOption('-i,--include-file <string...>')


program.parse();

console.log(program.opts())
