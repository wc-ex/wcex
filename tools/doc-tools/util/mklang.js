const fs = require('fs')
const path = require('path')
let text = fs.readFileSync(path.join(__dirname,'./lang.txt'),'utf8')
let lines = text.split(/\n/g)
let obj={}
for( let l of lines){
    let sp = l.split(/\s/)
    obj[sp[1]]=sp[0]
}
fs.writeFileSync('./lang.js',JSON.stringify(obj,null,2),'utf8')
