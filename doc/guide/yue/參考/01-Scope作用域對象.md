<!--DESC: {icon:{name:"explore",pkg:"mdi",type:"filled"},id:1} -->

## Scope作用域對象
Scope作用域中包含喺绑定糢闆腳本同事件中可以直接使用嘅數據、對象以及方法。


### Scope引用和HTML元素相關

#### $root
指向當前**WebComponent**根Scope對象

#### $rootElem
指向當前**WebComponent**根元素，類型為 HTMLElement對象。

#### $rootParentElem
指向當前**WebComponent**根元素的父元素，需注意的是，如果當前組件根元素無父元素（如位於另一個組件的中的一級標籤，則在HTML中使用parentElement，獲取為結果null，但實際其parentNode指向為shadowRoot），此時使用rootParentElem將返回實際的當前組件的父組件，類型為 HTMLElement對象。 使用此對象將能夠便捷嘅獲取到父組件嘅數據同方法。


#### $parent
指向當前元素父Scope對象，注意，呢度嘅$parent唔係指向父元素，而是獲取最近嘅具備scope嘅動態標籤嘅父元素嘅scope。

#### $id
  提供對糢闆中包含id元素嘅直接引用，類型為 HTMLElement對象。
  示例：
  ```html
  <template>
    <div id="mydiv"></div>
  </template>
  <script scope=".">
    return class{

      onReady(){
        this.$id.mydiv.innerHTML = "Hello World";
      }
    }
  </script>
  ```

### 數據和事件相關

#### $emit
發送自定義抑或標準事件
- $emit(nameOrEvent: string | Event, detailOrtoElem?: Element | any, toElem?: Element): void;
#### $watch
監控一個函數抑或表達式嘅變化，当變化時觸發回調函數

#### $noWatch
阻止一個對象嘅變化監控，常用於一些不需要監控嘅對象，如系統對象等


### 路由相關

#### $go
路由跳轉，支持多種方式，為$router.go（）方法的快捷引用。
area為分區路由，默認為“default”

#### $router
路由對象，提供路由相關的方法和屬性，參考路由章節
常用方法：
- go（tag，arrts：{}）或者 go（area，tag，attrs：{}）
- parseLocation （）解析當前路由
- back （）返回上一級



### 工具類對象
#### $log 
輸出標準log，用法和console.log一樣，但會在控制台中顯示彩色組件名稱和行號，方便調試。 支持簡化調用$log（... args），等同於$log.log（... args)

#### $path()
獲取動態組件相關的實際路徑，如組件中引用了一個圖片，這個圖片的路徑將是相對于組件的路徑，而不是當前頁面的路徑，使用$path可以獲取到正確的路徑。
- 支持“./”相對當前組件路徑
- 支持“@/”相對npm包路徑

#### $color
語義化動態配色對象，常用語義色：$color.pri，$color.pria，$color.sec，$color.seca，$color.text，$color.textr，$color.bg，$color.bgr，$color.ok，$color.warn，$color.info，$color.error，等。
支持基於HSL配色修飾器，如$color.pri.l3.s5.h2_.a6等，可連續調用，詳情參考配色一章

#### $Colors
管理和動態加載配色表

#### $json
格式化顯示$json數據，為JSON.stringify嘅簡化調用，支持動態變化檢測

#### $delay
可指定實現嘅下個周期，使用setTimeout實現
> $delay(ms:number):Promise<void>;

#### $next
下個周期，使用requestAnimationFrame實現
> $next():Promise<void>;

#### $step
分步驟動態變化屬性值，常用於動畫效果。
> $step(... args:(any|[ any,number])[]):any;
