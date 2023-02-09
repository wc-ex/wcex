<p align="center"><img src="logo.png" width="128" height="128" ></p>
<p align="center">
  <a href="https://npmcharts.com/compare/wcex?minimal=true"><img src="https://img.shields.io/npm/dm/wcex.svg?sanitize=true" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/wcex"><img src="https://img.shields.io/npm/v/wcex.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/wcex"><img src="https://img.shields.io/npm/l/wcex.svg?sanitize=true" alt="License"></a>
  <a href="https://www.npmjs.com/package/wcex"><img src="https://img.shields.io/bundlephobia/minzip/wcex.svg?sanitize=true" alt="minsize"></a>
</p>

### WCEX - Web Components Extensions (原生Web组件扩展库)

> Dynamic Native WebComponent MVVM Library, Free and MIT license. This repos includes Usage, Doc, Ui, Not include Sources, opensource will be later.

> 动态原生WEB组件数据绑定库，免费使用（MIT）。这个仓库包括：使用说明，文档，样例，UI库，但不包含源码，开源将在晚些时候。
- 示例DEMO:
> - (Github)
> https://wc-ex.com/go?gh/wc-ex/wcex@main/example@4c89c52/basic/index.html
> - (NPM-国内)
> https://wc-ex.com/go?npm/@wcex/example-basic@1.0.15/index.html

### Introduction(简介)

> The primary goal of WCEX is to componentized development, dynamic loading, in order to solve problems such as continuous iteration, multi-person and multi-team collaborative development, version release, and launch in the face of (OFFLINE-INTERNET) complex businesses and products.

> 本项目主要目标为实现: "完全组件化的WEB开发", "动态加载和依赖加载", 尝试为持续演进开发、多人和多团队开发、版本发布以及为复杂的离线运行产品提供支持。

> Another that each component and library is released dynamically, realizes online assembly and developing, and supports online development and collaboration.

> 另外的目标为项目中的每个部分可以进行动态的发布、在线组装、以及动态开发的支持，并支持在线开发。


> Different from other , our focus is quickly, includes: **No Packaging**, **Dynamic Dependencies** ,**Lazy Loading** ..., All componentization methods are implemented by standard WebComponent technology, and **Data model-driven** is implemented at the same time.

> 和其他框架不一样的是，我们聚焦在 “快速实现”, 包括 无打包、动态依赖、懒加载等, 所有组件的实现为标准的WebComponent, 并同时支持现代框架的 “数据模型驱动”。

> It is very similar to "Vue", and in fact, many Vue syntax and patterns are used and borrowed in the implementation, which can be quickly started.

> 使用上非常相似 "Vue", 实际上在实现中沿用和借鉴了许多Vue语法和模式，可快速上手。

### Features(特性)
The following are main features:
以下为已实现的部分特性:

- **REAL DOM** (原生真实DOM)
  > Modern browser performance and optimizations are nearly powerful, we tested actual DOM performance, and when properly designed, it can fully meet the needs of the project, and can provide better performance and operability. Therefore, we decided to abandon VDOM and implement it entirely with native DOM, and combined with technologies such as template preloading, merge update, and dynamic change dependencies to finally implement the entire framework.

  >  现代浏览器性能和优化已近很强大了，我们测试过实际的 DOM 性能，在恰当的设计后完全可以满足项目需求，并且能够提供更优秀的性能和可操作性。 因此，我们决定抛弃 VDOM，完全以原生 DOM 实现，并结合了模板预加载、合并更新、动态变更依赖等技术，来最终实现整个框架。

- **Minimum size independent** (最小尺寸无三方依赖)
  > In order to optimize the size and improve performance, this framework does not rely on any third-party components. Currently, the complete function library including dynamic loading and other functions is about 60K in size, and about 20K after gzip compression.

  > 为优化大小和提升性能，本框架不依赖任何第三方组件，目前包括动态加载等完整功能库大小约为 70K，gzip 压缩后 30K 左右。

- _Typescript support_ (Typescript支持)

- _Dynamic loading and dependency loading_(_动态加载和依赖加载_):
  > Full dynamic and dependency loading supported* components * ,_Third-party library_,JS,CSS; Each component can define its own dependencies. When the page uses this component, the relevant dependencies are automatically loaded, and repeated loading can be avoided.

  > 全动态和依赖加载可支持 _组件_,_第三方库_,JS,CSS; 每个组件均可定义自身依赖项，当页面使用到此组件时自动加载相关依赖，并能避免重复多次加载。

- _MVVM view and data dependency changes_ ( _响应式和依赖变更_):
  > Simplified data view model, similar to VUE

  > 简化的数据视图模型，类似 VUE

- _Enhanced style data binding_ ( _增强的样式数据绑定_):
  > Direct data binding to any CSS style

  > 可直接数据绑定到任意 CSS style
- _Development mode hot update_ (_开发模式热更新_)
- _Automatic color matching management_(_自动配色管理_)
- _template dynamic loading and caching_ (_模板动态加载和缓存_)
- _routing_( _路由_)
- _Animation support_(_动画的支持_)
- ...

### Links
 - [wcex library](https://www.npmjs.com/package/wcex) npm library      
 - [wcex cli](https://www.npmjs.com/package/wcex) dev tools for WCEX  [Readme](./cli/README.md)
 - [wcex ui](https://www.npmjs.com/package/wcex) ui library for WCEX [Readme](./ui/README.md)
 - [wcex document](https://www.npmjs.com/package/wcex) document for WCEX [Readme](./doc/README.md)

### Usage (使用):

#### **Regression and Intuitive (回归和直观)**
  > In the past, front-end development was very intuitive, writing HTML, adjusting JS, and changing CSS...
  > Now we have to toss a lot of packaging, environments, segmentation, frameworks..., and the energy that should be focused on aesthetics and design has been largely placed on code and environment.
  > Therefore, we expect to return to the original, let's try it.

  > 曾经的年代，前端开发很直观，写写 HTML，调调 JS，再改点 CSS...
  > 现在却要折腾许多打包、环境、分段、框架...，本该集中在美观和设计的精力却大量放在了代码和环境。
  > 因此，我们期望能回归原始，开始尝试吧。

#### **Quickly Start (快速上手)**
  - Create project (创建项目):
    > Just a normal NPM project, create a directory, run _npm init_

    > 就是一个普通的NPM工程，创建一个目录，运行 _npm init_

  - Create main entry (创建主入口): "_index.html_"
    > Of course, you can give it any name, which is a standard HTML

    > 当然，你可以起任意名字，这就是一个标准的HTML
    ```html
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="npm" content="https://cdn.jsdelivr.net/npm/" />
      </head>
      <script src="https://cdn.jsdelivr.net/npm/wcex/index.js"></script>
      <body>
        <main-></main->
      </body>
    </html>
    ```

    - here*\<meta name="npm"\>* Represents the location of the npm package repository, the location of the required third-party packages and components, here we use the standard CDN.
    - \_\<main-\>\</main-\>\_The tag indicates that this is our component, and due to the requirements of the WebComponent specification, custom components must contain**"-"** This tag represents that main.html in the current directory will be loaded as a component.
    
    - 这里的 _\<meta name="npm"\>_ 代表 npm 软件包仓库位置，所需要的第三方包和组件的位置，这里我们使用标准 CDN
    - _\<main-\>\</main-\>_ 标签代表这是一个我们的组件，由于 WebComponent 规范的要求, 自定义组件必须包含 **"-"**
      这个标签代表将要加载当前目录下的 main.html 作为组件。

   - First Component(第一个组件):
     > Create a new file in the root directory and name it "main.html"

     > 在根目录下新建一个文件，命名为 "main.html" 
        ```html
        <template @timer.1000="counter++">
        <meta name="scope" counter.number="0" />
        <style>
            :host {
            display: block;
            border: ":${counter%10}px solid red ";
            }
            button {
            background-color: rgb("$counter*20%255", "$counter*50%255", 0);
            }
        </style>
        <h3>Main Content</h3>
        <h3 $>counter</h3>
        <h5 :>This is a Counter: ${counter}</h5>
        <button @click="data.a++">click data</button>
        <h3 $>data</h3>
        <button @click="onClick($ev)">click data</button>
        <h3 $if="counter%2">Hello World</h3>
        <script scope=".">
            return class {
                data = { a: 1, b: 2 };
                onClick() {
                alert("CLICK ME");
                }
            };
        </script>
        </template>
        ```
        > - _`<template @timer.2000="counter++" >`_
        > Component standard entry label, all components are this entry. @timer represents the current component event, you can bind any DOM event or component standard event(timer, ready,click ...) 

        > 组件标准入口标签，所有组件均为此入口。@timer 代表当前组件事件,可以绑定任意的 DOM 事件或者组件标准事件(timer,ready,click ...) - \

        > - _`<meta name="scope" />`_

        > 当前组件作用域,你可以理解为 Vue 的组件域，其中定义的变量可以直接通过数据绑定使用。

        > - _`html <h3 $>counter</h3>`_ 
        > _`<h5 :>This is a Counter: ${counter}</h5>`_
        > this is data binding, where "\$" represents value binding, which means that the content is directly executed as a _js_ evaluation statement, and the result is passed to the binding element. Currently a single "\$" represents the text content bound to the element. The other is the ":" content binding, in fact, the ":" binding content is executed as an ES6 template string, which is easy to understand.

        > 这个就是数据绑定了, 其中 "\$" 代表值绑定, 代表直接执行内容作为*js*求值语句,并把结果传递给绑定元素。当前单独的 "\$" 代表绑定到元素的文本内容。
        另外就是 ":" 内容绑定，其实就是 ":" 绑定内容作为 ES6 的模板字符串执行，这个很容易理解。

        > - _`<button @click="data.a++">click data</button>`_ 
        > This line uses "@" event binding, which is basically the same as in Vue. It can bind all native events and custom events, and can directly write execution statements(JS) or use methods defined in scope.

        > 这一行使用了 "@" 事件绑定, 和 vue 中基本一致，可以绑定所有原生事件和自定义事件，可以直接写执行语句(JS)或者使用 scope 中定义的方法。

        > - _`<script scope=".">`_
        > Use js to import the scope, scope='.' means to import the root scope, you can customize the scope variable. js references use the standard AMD dynamic loading format. use_ script _ Defined scope variables and usage_ meta name=scope \_ Can be mixed or used alone.

        > 使用 js 导入作用域, scope='.' 代表引入根作用域，可自定作用域变量。js 引用使用标准 AMD 动态加载格式。
        > 使用 _script_ 定义的作用域变量和使用 _meta name=scope_ 可以混用，也可单独使用。


        > - _`border: ":${conter%10}px solid red";`_
        > You can see that data binding can be used directly in the style, and the format requires the use of " or ' Include, the first character in quotation marks indicates whether to use \$ or \: quotation, the format is the same as above.

        > 可以看到,数据绑定可直接使用在 style 中, 格式要求使用 " 或者 ' , 引号内第一个字符代表使用 \$ 还是 \:引用, 格式同上.

    - Run(运行):
     > Mount the home directory using any HTTP server, such as _http-server_ (npm install -g http-server), open the browser to see the effect.

     > 使用任何一个http服务器挂载主目录，如: _http-server_ (npm install -g http-server), 打开浏览器即可看到效果。
- Online(在线)
  - You can direct run your package from NPM or Github.
  - 你可直接通过发布的NPM仓库包或者github运行你的软件包
  > npm: (https://wc-ex.com/go?npm/@wcex/example-basic/index.html)

  > github: (https://wc-ex.com/go?gh/wc-ex/wcex/example/basic/index.html)

  - These using  https://cdn.jsdelivr.net as CDN, you can replace URL to load your project.
  - 上述地址使用 https://cdn.jsdelivr.net 作为CDN，你可替换对应URL加载自己的项目。

### @wcex/cli (开发客户端)
  - Develop a client toolkit that includes hot updates, builds, releases, and more, simply and quickly
  - 开发客户端工具包，包含热更新、构建、发布等功能, 简单和快速
  - Features:Typescript support, Local hot update support, only update the changed components each time, without affecting the overall data and current status of the current page.
  - 特性：TypeScript支持, 局部热更新支撑，每次仅更新变更的组件，不影响当前页面整体数据和当前状态。
  - install: ( 安装 )
    > pnpm install @wcex/cli 
  - Usage: (使用)
    > in project dir, run: "wcex"  
    > 在项目目录下执行: "wcex", 即启动开发模式

### Documents
  document(NPM): (https://wc-ex.com/go?npm/@wcex/doc/index.html)
### Update
