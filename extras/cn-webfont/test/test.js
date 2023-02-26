const Canvas = require('canvas');
const opentype = require('opentype.js');
const fs = require('fs');

// 设置要生成的文本和字体文件路径
const text = '你好';
const fontPath = './LXGWWenKaiScreen.ttf';

// 加载字体文件
const font = opentype.loadSync(fontPath);

// 计算文本的宽度和高度
const fontSize = 72;
const textWidth = font.getAdvanceWidth(text, fontSize);
const textHeight = font.ascender - font.descender;

// 创建画布
const canvas = Canvas.createCanvas(textWidth, textHeight);
const ctx = canvas.getContext('2d');

// 填充背景色
ctx.fillStyle = '#FFFFFF';
ctx.fillRect(0, 0, textWidth, textHeight);

// 设置字体样式
ctx.font = `${fontSize}px "${font.names.postScriptName}"`;
ctx.fillStyle = '#000000';

// 将文本绘制到画布上
ctx.fillText(text, 0, font.ascender);

// 保存为PNG文件
const out = fs.createWriteStream('./text.png');
const stream = canvas.createPNGStream();
stream.pipe(out);
out.on('finish', () => console.log('The PNG file was saved.'));