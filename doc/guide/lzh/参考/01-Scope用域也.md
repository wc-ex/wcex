<!--DESC: {icon:{name:"explore",pkg:"mdi",type:"filled"},id:1} -->

## Scope 用域也
Scope用域中包绑定模板脚本及事可径用数、所法。


### Scope引与HTML元素相关

#### $root
指今 **WebComponent** 根Scope所

#### $rootElem
指今 **WebComponent** 根元素, 类 HTMLElement 也。

#### $rootParentElem
指 **WebComponent** 根元素父元素,需注意者,如今组件根元素无父元素(若在别组件者一级标签,则于HTML中用parentElement,取为终null,而实parentNode指为shadowRoot)。 用rootParentElem将反实组件父组件,类也 HTMLElement 者。 用此捷者得父组件之数。


#### $parent
今之所Scope,$parent 非元素也,取近具scope表父元素之scope也。

#### $id
  供模板中包id元素直引, 类 HTMLElement 。
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

### 数事相关

#### $emit
发自定义若格事
- $emit(nameOrEvent: string | Event, detailOrtoElem?: Element | any, toElem?: Element): void;
#### $watch
监控一函数或表达式之变,当变时触发回调函数

#### $noWatch
止一物之变,常用于不须监控者,如系统之类


### 路由相关

#### $go
路由跳转,扶多方,为$router.go()之捷引。
area为分区路由,默认为"default"

#### $router
路之所由,关法属性,参以章节
常用法:
- go(tag,arrts:{}) 或 go(area,tag,attrs{})
- parseLocation() 解析路由
- back() 还一秩



### 器类也
#### $log 
输格log, 用法如console.log,但会于控制台中显彩组件名行号,便宜调试。 赞简调 $log(... args),比$log.log(... args)

#### $path()
得动组件相关之实径,如组件中引一图片,此图片将为对组件之路,非当今页面之径,用$path可得正径也。
- 持"./"对组件径
- 持 "@/" 相对npm包路径

#### $color
语义化动所配色, 常以语义色: $color.pri,$color.pria,$color.sec,$color.seca,$color.text,$color.。 textr,$color.bg,$color.bgr,$color.ok,$color.warn,$color.info,$color.error。
赞HSL配色修饰器,如$color.pri.l3.s5.h2_.a6等,可连调,详参配色一章

#### $Colors
治动加载配色表

#### $json
格式化示 $json 数,为JSON.stringify简调,扶动态变化检测

#### $delay
可指下期, 用setTimeout
> $delay(ms:number):Promise<void>;

#### $next
下期, 用requestAnimationFrame
> $next():Promise<void>;

#### $step
分步骤动态变化属性直,常用动画效。
> $step(... args:(any|[ any,number])[]):any;
