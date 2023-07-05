<!--DESC: {icon:{name:"explore",pkg:"mdi",type:"filled"},id:1} -->

## Scope 作用域对象
Scope作用域中包含在绑定模板脚本和事件中可以直接使用的数据、对象以及方法。


### Scope引用和HTML元素相关

#### $root
指向当前 **WebComponent** 根Scope对象

#### $rootElem
指向当前 **WebComponent** 根元素, 类型为 HTMLElement 对象。

#### $rootParentElem
指向当前 **WebComponent** 根元素的父元素，需注意的是，如果当前组件根元素无父元素（如位于另一个组件的中的一级标签，则在HTML中使用parentElement，获取为结果null，但实际其parentNode指向为shadowRoot）, 此时使用rootParentElem将返回实际的当前组件的父组件，类型为 HTMLElement 对象。使用此对象将能够便捷的获取到父组件的数据和方法。


#### $parent
指向当前元素父Scope对象，注意，这里的 $parent 不是指向父元素，而是获取最近的具备scope的动态标签的父元素的scope。

#### $id
  提供对模板中包含id元素的直接引用, 类型为 HTMLElement 对象。
  示例:
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

### 数据和事件相关

#### $emit
发送自定义或者标准事件
- $emit(nameOrEvent: string | Event, detailOrtoElem?: Element | any, toElem?: Element): void;
#### $watch
监控一个函数或者表达式的变化，当变化时触发回调函数

#### $noWatch
阻止一个对象的变化监控，常用于一些不需要监控的对象，如系统对象等


### 路由相关

#### $go
路由跳转，支持多种方式，为$router.go()方法的快捷引用。
area为分区路由，默认为"default"

#### $router
路由对象，提供路由相关的方法和属性，参考路由章节
常用方法:
- go(tag,arrts:{}) 或者 go(area,tag,attrs:{})
- parseLocation() 解析当前路由
- back() 返回上一级



### 工具类对象
#### $log 
输出标准log, 用法和console.log一样，但会在控制台中显示彩色组件名称和行号，方便调试。支持简化调用 $log(...args),等同于$log.log(...args)

#### $path()
获取动态组件相关的实际路径，如组件中引用了一个图片，这个图片的路径将是相对于组件的路径，而不是当前页面的路径，使用$path可以获取到正确的路径。
- 支持"./"相对当前组件路径
- 支持 "@/" 相对npm包路径

#### $color
语义化动态配色对象, 常用语义色: $color.pri,$color.pria,$color.sec,$color.seca,$color.text,$color.textr,$color.bg,$color.bgr,$color.ok,$color.warn,$color.info,$color.error,等。
支持基于HSL配色修饰器,如$color.pri.l3.s5.h2_.a6等，可连续调用，详情参考配色一章

#### $Colors
管理和动态加载配色表

#### $json
格式化显示 $json 数据,为JSON.stringify的简化调用，支持动态变化检测

#### $delay
可指定实现的下个周期, 使用setTimeout实现
> $delay(ms:number):Promise<void>;

#### $next
下个周期, 使用requestAnimationFrame实现
> $next():Promise<void>;

#### $step
分步骤动态变化属性值，常用于动画效果。
> $step(...args:(any|[any,number])[]):any;
