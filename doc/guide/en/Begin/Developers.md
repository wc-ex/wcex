<!--DESC: {icon:{name:"attractions",pkg:"mdi",type:"filled"},id:4} -->
# Developer Tips
> As developers, we have some special ways for you to use WCEX to develop your application, see the internals, and even manipulate the components directly.

## Turn on developer mode
> Open the Developer Panel in your browser, enter localStorage.__DEV="" in the console, and refresh the page to enable the developer widgets provided in the UI.

## Use developer tools
> Use the hotkey [Ctrl+'] to bring up the developer panel, you can control the detailed log output and configure the localization development path of the component and the component tree
> When you press [Ctrl+Shift+] at the same time, you can move the mouse over the component at the same time to see the current component name, and right-click to view the details of this component and its context-associated component.

## Description of the component information
> Use the component description syntax to intuitively compose the description of the component in the component, which will be displayed in the developer tools, so that you can quickly understand the function and usage of the component.
> This instruction requires a specific syntax to be used in HTML comments, as follows:
```html
<!--!!
  通用SVG图标组件,支持NPM 标准SVG图标库，内置支持 **material-design-icons**, **fortawesome**, **svg-icons**,
  - 使用标准图标库时, pkg属性可使用简称, 默认使用 "md",,
  - 可自定义其他NPM svg 图标库引用，此时需设置pkg参数为npm的完整包名。
  - 可使用url参数直接指定需引用svg图标的完整地址  
  - [图标列表](https://wc-ex.com/pkg.html?@wcex/doc@1.0.90/app&cdn=jsdelivr&lang=cn#wcex-doc.doc%3Furl%3D%E6%89%A9%E5%B1%95%2F02-%E5%9B%BE%E6%A0%87%E5%BA%93.md%26lang%3Dcn)

  @prop pkg [string] 默认:mdi
            图标库包名称, 内置简写: 'mdi', 'fa', 'si' 等图标库，支持其他svg图标库
  @prop type [string] 默认:filled
            图标类型, 映射到图标库中的子目录, 如: filled, outlined, round,sharp,two-tone
  @prop icon [string] 默认:circle
            图标文件名称, 不包含扩展名 ".svg", 如: circle, add, delete, edit, search, home, user, ...
  @prop size [number] 默认:1.5 图标大小, 单位: em
  @prop url [string] 默认:""
            图标文件指定URL, 指定此项内容将取代 pkg,type,icon 的设置
  @prop active [bool] 默认:false 是否为活动图标，如为活动状态，则允许类似按钮行为，并发送点击事件
  @prop color  [object] 默认:$color.pri
            图标颜色，支持$color配色对象，也支持 rgb,#aabbcd等直接颜色，不支持 "red,green"等名称色.

  @css --icon-color CSS 变量, 用于通过CSS控制图标颜色
-->
<template>
    ...
</template>

```
> When you right-click, you can also see the currently selected element directly in the browser development tool window, which is convenient for debugging and viewing the details of the component.

## Try it now
> This document is entirely WCEX, open your browser's developer tools and try the following
