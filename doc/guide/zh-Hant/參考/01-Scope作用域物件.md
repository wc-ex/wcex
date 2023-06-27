<!--DESC: {icon:{name:"explore",pkg:"mdi",type:"filled"},id:1} -->

## Scope 作用域物件
Scope作用域中包含在綁定範本和事件中可以直接使用的數據、物件以及方法。


### Scope引用和HTML元素相關

#### $root
指向當前 **WebComponent** 根Scope物件

#### $rootElem
指向當前 **WebComponent** 根元素， 類型為 HTMLElement 物件。

#### rootParentElem
指向當前 **WebComponent** 根元素的父元素，需注意的是，如果當前元件根元素無父元素（如位於另一個元件的中的一級標籤，則在HTML中使用parentElement，獲取為結果null，但實際其parentNode指向為shadowRoot）， 此時使用rootParentElem將返回實際的當前元件的父元件，類型為 HTMLElement 物件。 使用此物件將能夠便捷的獲取到父元件的數據和方法。


#### $parent
指向當前元素父Scope物件，注意，這裡的 $parent 不是指向父元素，而是獲取最近的具備scope的動態標籤的父元素的scope。

#### $id
  提供對範本中包含id元素的直接引用， 類型為 HTMLElement 物件。
  範例：
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
發送自定義或者標準事件
- $emit(nameOrEvent: string | Event, detailOrtoElem?: Element | any, toElem?: Element): void;
#### $watch
監控一個函數或者表達式的變化，當變化時觸發回調函數

#### $noWatch
阻止一個對象的變化監控，常用於一些不需要監控的物件，如系統物件等


### 路由相關

#### $go
路由跳轉，支持多種方式，為$router.go（）方法的快捷引用。
area為分區路由，默認為“default”

#### $router
路由物件，提供路由相關的方法和屬性，參考路由章節
常用方法：
- go（tag，arrts：{}） 或者 go（area，tag，attrs：{}）
- parseLocation（） 解析當前路由
- back（） 傳回上一級



### 工具類物件
#### $log 
輸出標準log， 用法和console.log一樣，但會在控制台中顯示彩色元件名稱和行號，方便調試。 支援簡化呼叫 $log（... args），等同於$log.log（... args)

#### $path()
獲取動態元件相關的實際路徑，如元件中引用了一個圖片，這個圖片的路徑將是相對於元件的路徑，而不是當前頁面的路徑，使用$path可以獲取到正確的路徑。
- 支援“./”相對當前元件路徑
- 支援 “@/” 相對npm包路徑

#### $color
語義化動態配色物件， 常用語義色： $color.pri，$color.pria，$color.sec，$color.seca，$color.text，$color.textr，$color.bg，$color.bgr，$color.ok，$color.warn，$color.info，$color.error，等。
支援基於HSL配色修飾器，如$color.pri.l3.s5.h2_.a6等，可連續調用，詳情參考配色一章

#### $Colors
管理和動態載入配色表

#### $json
格式化顯示 $json 數據，為JSON.stringify的簡化調用，支援動態變化檢測

#### $delay
可指定實現的下個週期， 使用setTimeout實現
> $delay(ms:number):Promise<void>;

#### $next
下個週期， 使用requestAnimationFrame實現
> $next():Promise<void>;

#### $step
分步驟動態變化屬性值，常用於動畫效果。
> $step(... args:(any|[any,number]) []):any;
