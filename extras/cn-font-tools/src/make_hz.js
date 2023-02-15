// 处理常用汉字，合并，去重，生成文件,64汉字一组
const fs = require("fs");
const path = require("path");

/**
 * 去重字符串
 */
function dedup_sort(str) {
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
  console.log("dup chars:", dupCounter);

  return chArray.sort().join("");
}

// 参考第一个字符集，对第二个字符集去重
// 返回去重后结果
function dedup_sort2(refStr, str) {
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

function makeHZ() {
  let L1 = "";
  let L2 = "";
  try {
    L1 = fs.readFileSync("./L1.txt", "utf8").replace(/\s/g, "");
    L2 = fs.readFileSync("./L2.txt", "utf8").replace(/\s/g, "");
  } catch (e) {
    console.log("must have L1.txt and L2.txe", e.message);
    process.exit(1);
  }
  const hz_l1 = dedup_sort(L1);
  console.log("L1: org=", L1.length, "dedup=", hz_l1.length);

  const hz_l2 = dedup_sort2(hz_l1, L2);

  console.log("L2: org=", L2.length, "dedup=", hz_l2.length);
  return { L1, L2 };
}

// 导出2级汉字
module.exports = {
  makeHZ,
  dedup_sort,
  dedup_sort2,
};
