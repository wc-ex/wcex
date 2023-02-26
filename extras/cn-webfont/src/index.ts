import process from 'process'
import path from 'path'
import fs,{promises as fsp} from 'fs'
import json5 from 'json5'
import { buildFont } from './buildFont';


if(process.argv.length !== 3){
    console.log(`Invalid args\nUsage: cn-fontsource [fontDir]`);
    process.exit(0)
}

let fontSrcDir = path.resolve(process.argv[2]);
console.log(`=== build web font : ${fontSrcDir} ===\n`);

(async ()=>{
    try{
        let files = (await fsp.readdir(fontSrcDir)).filter((v) => v.endsWith("ttf") || v.endsWith("otf"));
        for (let f of files) {
            await buildFont(fontSrcDir,f);     
        }
    }catch(e:any){
        console.log("Error:", e.message);
    }
})();

