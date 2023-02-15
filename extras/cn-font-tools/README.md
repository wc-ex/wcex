## 字体库分包压缩工具

将大型中文字体按照规则拆分以支持互联网显示和加载

## 运行

1. 当前目录下须有 L1.txt, 和 L2.txt 两个文件，分别对应使用频率最高的一级汉字和二级汉字
2. 当前目录下运行
   > cn_font_tools [TTF 字体文件] [字体描述信息] [link 参考来源链接]

## 汉字分包

1. 综合考虑到加载性能和 css 文件大小, 按照下面规则进行分包
2. L1 按照 256 个汉字分包, L2 按照 128 汉字分包, 剩余汉字和符号按照 32 个汉字进行分包

## 注意

源字体支持 ttf 和 otf

- _霞鹜文楷屏幕阅读版_ (28872字): [字体包](https://www.npmjs.com/package/@wc1font/lxgw-wen-kai-screen) [来源网站](https://github.com/lxgw/LxgwWenKai-Screen/releases)