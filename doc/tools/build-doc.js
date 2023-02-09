const fsp = require("fs").promises
const path = require('path')

// return {name,isDir}[]
async function deepDir(obj,pathname,rootPath){
    for(let n of (await fsp.readdir(pathname))){
        // console.log("--> ",n)
        let p = path.join(pathname,n);
        let st = await fsp.stat(p);
        if(st.isDirectory()){
                obj[n] = {
                    typ:'dir',
                    name:n,
                    path: path.relative(rootPath,p),
                    items:{}
                }
                await deepDir(obj[n].items,p,pathname);
        }else if(st.isFile() && n.endsWith(".md")){
                obj[n] = {
                    typ:'file',
                    name:n,
                    path: path.relative(rootPath,p).replace(/\\/g,'/'),
                }
        }

    }
}

async function main(){

    let nav = {}
    let dir = path.resolve(__dirname,'../guide/cn')
    await deepDir(nav,dir,dir);
    await fsp.writeFile(path.join(dir,"nav.json"),JSON.stringify(nav))
    console.log(JSON.stringify(nav,null,2));

}

(async ()=>{
    await main()
})()