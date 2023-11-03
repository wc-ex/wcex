<!--DESC: {icon:{name:"attractions",pkg:"mdi",type:"filled"},id:4} -->
# Suggerimenti per gli sviluppatori
> In qualità di sviluppatori, sono disponibili alcuni modi speciali per utilizzare WCEX per sviluppare l'applicazione, visualizzare i componenti interni e persino modificare direttamente i componenti.

## Attiva la modalità sviluppatore
> Apri il pannello sviluppatore nel browser, inserisci localStorage.__DEV="" nella console e aggiorna la pagina per abilitare i widget sviluppatore forniti nell'interfaccia utente.

## Usa gli strumenti per sviluppatori
> Utilizzare il tasto di scelta rapida [Ctrl+'] per visualizzare il pannello sviluppatore, è possibile controllare l'output del log dettagliato e configurare il percorso di sviluppo della localizzazione del componente e dell'albero dei componenti
> Quando si preme contemporaneamente [Ctrl+Maiusc+], è possibile spostare il mouse sul componente contemporaneamente per visualizzare il nome del componente corrente e fare clic con il pulsante destro del mouse per visualizzare i dettagli di questo componente e del componente associato al contesto.

## Descrizione delle informazioni sul componente
> Utilizzare la sintassi di descrizione del componente per comporre in modo intuitivo la descrizione del componente nel componente, che verrà visualizzata negli strumenti di sviluppo, in modo da poter comprendere rapidamente la funzione e l'utilizzo del componente.
> Questa istruzione richiede l'utilizzo di una sintassi specifica nei commenti HTML, come indicato di seguito:
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
> Quando si fa clic con il pulsante destro del mouse, è anche possibile visualizzare l'elemento attualmente selezionato direttamente nella finestra degli strumenti di sviluppo del browser, utile per il debug e la visualizzazione dei dettagli del componente.

## Provalo ora
> Questo documento è interamente WCEX, apri gli strumenti di sviluppo del tuo browser e prova quanto segue
