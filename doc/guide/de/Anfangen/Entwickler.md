<!--DESC: {icon:{name:"attractions",pkg:"mdi",type:"filled"},id:4} -->
# Tipps für Entwickler
> Als Entwickler haben wir einige spezielle Möglichkeiten für Sie, WCEX zu verwenden, um Ihre Anwendung zu entwickeln, die Interna anzuzeigen und sogar die Komponenten direkt zu bearbeiten.

## Entwicklermodus aktivieren
> Öffnen Sie das Entwicklerpanel in Ihrem Browser, geben Sie localStorage.__DEV="" in die Konsole ein und aktualisieren Sie die Seite, um die in der Benutzeroberfläche bereitgestellten Entwickler-Widgets zu aktivieren.

## Entwicklertools verwenden
> Verwenden Sie den Hotkey [Strg+'], um das Entwicklerfenster aufzurufen, können Sie die detaillierte Protokollausgabe steuern und den Lokalisierungsentwicklungspfad der Komponente und des Komponentenbaums konfigurieren
> Wenn Sie gleichzeitig [Strg+Umschalt+] drücken, können Sie gleichzeitig mit der Maus über die Komponente fahren, um den aktuellen Komponentennamen anzuzeigen, und mit der rechten Maustaste klicken, um die Details dieser Komponente und ihrer kontextbezogenen Komponente anzuzeigen.

## Beschreibung der Bauteilinformationen
> Verwenden Sie die Komponentenbeschreibungssyntax, um intuitiv die Beschreibung der Komponente in der Komponente zu erstellen, die in den Entwicklertools angezeigt wird, damit Sie die Funktion und Verwendung der Komponente schnell verstehen können.
> Diese Anweisung erfordert eine bestimmte Syntax, die in HTML-Kommentaren wie folgt verwendet werden muss:
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
> Wenn Sie mit der rechten Maustaste klicken, können Sie das aktuell ausgewählte Element auch direkt im Browser-Entwicklungstoolfenster sehen, was zum Debuggen und Anzeigen der Details der Komponente praktisch ist.

## Probieren Sie es jetzt aus
> Bei diesem Dokument handelt es sich ausschließlich um WCEX, öffnen Sie die Entwicklertools Ihres Browsers, und versuchen Sie Folgendes:
