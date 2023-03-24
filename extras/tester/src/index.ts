import  { program } from 'commander';

/**
  使用 commander 解析命令行, 第一个参数为测试文件所在文件夹
*/
program
  .option('-u, --ui <boolean> ', 'show web browser ui',false)
  .option('-w, --wcex <string>', 'wcex version or url',"1.9.12")
  .option('-n, --npm <string>', 'npm url', "https://cdn.jsdelivr.net/npm/")
  .option('-m, --meta <module>', 'module info')
  .arguments('<folder>')
  .action((folder) => {
    console.log(`Testing files in folder ${folder}`);
  })
  .parse(process.argv);

console.log(program.opts());
