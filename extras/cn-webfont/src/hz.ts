// 处理常用汉字，合并，去重，生成文件,64汉字一组
import fs from "fs";
import path from "path";
import fontkit, { Font as FKFont } from "fontkit";

/**
 * 去重字符串
 */
function dedup_sort(str: string) {
  const chArray = [];
  const set = new Set();
  let dupCounter = 0;
  for (let c of str) {
    if (set.has(c)) {
      dupCounter++;
      // console.log("dup:", c);
      continue;
    }
    chArray.push(c);
    set.add(c);
  }
  console.log("  ==> dup chars:", dupCounter);

  return chArray.sort().join("");
}

// 参考第一个字符集，对第二个字符集去重
// 返回去重后结果
function dedup_sort2(refStr: string, str: string) {
  const chArray = [];

  const set = new Set();
  for (let ch of refStr) set.add(ch);
  for (let c of str) {
    if (set.has(c)) continue;
    chArray.push(c);
    set.add(c);
  }
  return chArray.sort().join("");
}

export function makeHZ(fk: FKFont) {
  let L1Text = "";
  let L2Text = "";
  L1Text = fs.readFileSync(path.join(__dirname, "./L1.txt"), "utf8").replace(/\s/g, "");
  L2Text = fs.readFileSync(path.join(__dirname, "./L2.txt"), "utf8").replace(/\s/g, "");
  const L1 = dedup_sort(L1Text);
  console.log("  ==> L1: org=", L1Text.length, "dedup=", L1.length);

  const L2 = dedup_sort2(L1, L2Text);

  console.log("  ==> L2: org=", L2Text.length, "dedup=", L2.length);

  // 计算一级汉字和二级汉字
  const allFontsChars = dedup_sort(String.fromCharCode(...fk.characterSet.sort()));

  // 计算3级汉字
  const L3 = dedup_sort2(L1Text + L2Text, allFontsChars).replace(/[\x00-\x1f]/g, "");
  console.log("  ==> L3:",  L3.length);
  console.log("  ==> ALL=",allFontsChars.length)

  return { L1, L2, L3 };
}

