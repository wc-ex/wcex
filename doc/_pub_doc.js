const fs  = require('fs')
const path  = require('path')
const execSync = require('child_process').execSync
let pkg =JSON.parse(fs.readFileSync(path.join(__dirname,'package.json'),'utf8'));

// 更新版本
pkg.version = pkg.version.split('.').map((v,k)=>(k==2)?parseInt(v)+1:v).join('.');
console.log('New Version:',pkg.version);
fs.writeFileSync(path.join(__dirname,'package.json'),JSON.stringify(pkg,null,2),'utf8');

// 发布NPM
execSync('npm --registry \"https://registry.npmjs.org/\" publish --access public',{stdio:'inherit'})

console.log('PUB Version:',pkg.version);

// 更新 site
let siteIndex = fs.readFileSync(path.join(__dirname,'../site/index.html'),'utf8');

siteIndex = siteIndex.replace(/(\s*var\s+DOC_VER\s*=\s*")[0-9\.]+(";)/,`$1${pkg.version}$2`);

fs.writeFileSync(path.join(__dirname,'../site/index.html'),siteIndex,'utf8');

execSync('pnpm oss',{cwd:path.join(__dirname,'../site/'),stdio:'inherit'})

console.log('UpdateSite :',siteIndex);


