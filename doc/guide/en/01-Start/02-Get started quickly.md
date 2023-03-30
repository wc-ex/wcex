<!--DESC: {"icon":"sports_score"} -->

## Get started quickly

Let's quickly start a simple project and then refine it step by step. Okay, now create a new directory on disk and let's go.

### Main entry: index.html

First, write an entry file, which we generally call _index.html_ :

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <title>WCEX Doocument</title>
    <meta name="viewport" content="initial-scale=1.0,width=device-width" />
    <meta charset="utf-8" />

    <meta name="npm" content="https://cdn.jsdelivr.net/npm/" />

    <style>
      html,
      body {
        width: 100%;
        height: 100%;
        overflow: hidden;
        margin: 0;
        padding: 0;
        font-size: 18px;
      }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/wcex@1.8.104/index.js"></script>
  </head>

  <body>
    <app-></app->
  </body>
</html>
```

Compared to normal HTML, we only need three simple steps:

1. Add **npm** \<meta\> tag definition to the project to let WCEX know where to find the required third-party packages, here jsdelivr is used, you can use any CDN you like, or install NPM to your local path.

```html
<meta name="npm" content="https://cdn.jsdelivr.net/npm/" />
```

2. With your first component, we usually name it **app**, however, here its label name is \<app-\>, the reason for this is that due to the requirements of the Web Component standard specification, all custom components require at least one '-' character, so we need to append a '-' at the end.

```html
<app-></app->
```

3. Finally, we need to introduce the WCEX package, here directly through the public cdn, and import the latest version. WCEX is very small, without any third-party dependencies, loading is very fast, generally put this line in the last element of the \<head\> tag, the reason for this is that wcex initialization requires some predefined information, such as the NPM repository address described in the first article, of course, there are some other configurations, which we will see later. Another point is that you can optimize the initial initialization white screen of HTML.

```html
<script src="https://cdn.jsdelivr.net/npm/wcex@1.8.104/index.js"></script>
```

### First component: **\<app-\>**

In the previous section we saw that the first Web Component we defined was loaded in index.html, now let's create it, which is a classic Hello World.

- Create a new file in this directory, named **app.html which reads as follows:

```html
<template>
  <h1>Hello World!</h1>
</template>
```

As you can see, this is a normal HTML file, and its only requirement is that it must use \<template\> as the root tag.

> For knowledge about _template_, you can refer to: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template, This is the standard W3C specification, WCEX uses the standardized native Web Component specification to implement, and many technical points may be used in the future, all of which belong to the standard specification. So you can take a look at the specifications in advance, most of which can be found here: https://developer.mozilla.org/en-US/docs/Web/Web_Components

Okay, now that everything we need is done, let's actually get up and running.

### Open in a browser

As we covered in the previous chapter, one of the main things WCEX does is dynamic loading, which we hate for complex packaging and environment configuration. So the next thing is simple. You have many ways. You can get it running. Just put the above two files into any static WEB or even Github or NPM. These methods are described below:

#### Start the local HTTP service

- The easiest way is to install a fast HTTP server tool with npm

```shell
npm install -g http-server
```

- Then start in the directory just now, on the command line, go to your directory, and run the following command.

```shell
http-server
```

- You can see that your HTTP server has been started on port 8080, now open a browser and type in the address bar:

```
http://localhost:8080
```

Now you can see Hello World, of course, you can use any kind of HTTP server you like, nginx, lighttpd....

> Okay, next. You can open your browser's debugging window. Looking at your component in the DOM, this is the internal structure of a standardized Web component. Here you may be able to see the second main feature of WCEX: **Intuitive**. Due to the abandonment of VDOM and the template engine, the native implementation and the standardized implementation, you will find that the DOM structure you see in the debug window is basically the same as the structure in the template, which is very conducive to us to observe and debug problems, through the debug window, you can do almost everything you want, observe data changes, send events, change data, and so on. In order to achieve this goal as much as possible. WCEX implementation also did a lot of details, such as in WCEX's **if** and **for** structure, the implemented DOM is siblical, rather than adding another layer of wrapper elements, which is very conducive to our consistency and **intuitive** of CSS and data structure access elements.

#### Direct preview via web

If you submit the above files to **github** or publish the package through npm, you can access it directly through the CDN, and we have made a widget to help you preview directly, this tool uses **jsdelivr** as the CDN.
For specific access formats and descriptions, see https://www.jsdelivr.com/

- NPM access, please replace your own package name.

```
https://wc-ex.com/go?npm/@wcex/example-basic/index.html

https://wc-ex.com/go?npm/[YOUT PACKAGE NAME][@VERSION]/index.html

```

- For GitHub access, please replace your own repository name and path

```
https://wc-ex.com/go?gh/wc-ex/wcex/example/basic/index.html
https://wc-ex.com/go?gh/[YOU REPOS]@[COMMIT ID]/[YOU DIR]/index.html
```

> Of course, in addition to the above methods, we have also made a CLI toolkit. Very small, also only tens of K in size, does not rely on webpack, rollup and other complex packaging tools. It can help us do more work, such as hot update compilation and release, etc. Another important point is to support TypeScript. You can install **@wcex/CLI** via npm, the details of which will be covered in later sections.

### Try it now

<div>
<wcex-doc.com-playground files="['first/index.html','first/app.html','first/com/time.html']"></wcex-doc.com-playground>
</div>

- This is a practice hall, you can modify it directly in the editor below to see the real-time effect.
- In this initialization project, we have three files, the _index.html_ main entry, and two components
- You can see the rules for component reference and naming, and how data binding is handled
- Get acquainted with it first, you can try to experiment with the task.
  - Add the name attribute for _\<app\>_ in _index.html_ 
  - Change $_ value binding to _:_ string template binding in _com/time.html_ 
  - Adjust the interval of _@time_ to 2 seconds in _com/time.html_ 
  - The main syntax used: _"$$"_ is a two-way binding, _"$"_ is a compute binding, _":"_ is a template string binding, _'@'_ is an event binding
  - The syntax in CSS is slightly changed, variable binding needs to be surrounded by _"_ or _'_, and the first character _$_ or _:_ represents the binding method, which is consistent with the above rules
- When changing _com/time.html_, you can see that the update of the component code is local and does not affect the current state in the _app.html_ component, which is the same as the implementation mechanism of our client tool _@wcex/cli_, which we call **local hot update**, which will be very useful when we debug and develop.


### Next extension

Quite simply, in the next chapter, we'll try to add more features to it, for example. Add custom properties to add data binding. Handle events, and add more components.
and the processing of scripts.
- Don't forget, in the upper right corner you can choose your favorite color.

