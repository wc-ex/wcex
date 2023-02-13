import { program } from 'commander';
import path from 'path';
import fs from 'fs';
import { makeSingle } from './single';
import fontkit, { Font } from "fontkit";


const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));
// console.log(pkg.name, pkg.version);
program
  // .enablePositionalOptions()
  .name("cn-font-tools")
  .version(pkg.version)
  .description(`${pkg.name} ${pkg.version}, ${pkg.description}`)
  .requiredOption('-f,--font-file <string>')
  .option('-i,--include-file [string]...>')

program.parse();

console.log(program.opts());

(async ()=>{
  await makeSingle(program.opts()['fontFile'])
})()

