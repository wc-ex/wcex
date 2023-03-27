import  { program } from 'commander';
import path from 'path'

/**
  使用 commander 解析命令行, 第一个参数为测试文件所在文件夹
  
  一个测试文件夹中需包含test.index.html, 如不存在则自动创建此文件

*/
program
  .arguments('<folder>')
  .action((folder) => {
    console.log(`Run Test in ${path.resolve(folder)}`);
    console.log(program.opts());
  })
  .option('-u, --ui', 'show web browser ui',false)
  .option('-w, --wcex <string>', 'wcex version or url',"1.9.12")
  .option('-i, --index <string>', 'index file', "test.index.html")
  .option('-n, --npm <string>', 'npm url', "https://cdn.jsdelivr.net/npm/")
  .option('-m, --meta <module>', 'module info')

  .parse(process.argv);

// console.log(program.opts());
