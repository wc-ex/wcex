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

1. Add **npm**\tag definition to the project<meta\> to let WCEX know where to find the required third-party packages, jsdelivr is used here, you can use any CDN you like, or install NPM to your local path. </meta\>

```html
<meta name="npm" content="https://cdn.jsdelivr.net/npm/" />
```

2. With your first component, we usually name it **app**, however, here its tag name is \, the <app-\>reason for this is that due to the requirements of the Web Component standard specification, all custom components require at least one '-' character, so we need to append a '-' at the end. </app-\>

```html
<app-></app->
```

3. Finally, we need to introduce the WCEX package, here directly through the public cdn, and import the latest version. WCEX is very small, without any third-party dependencies, very fast to load, generally put this line<head\> in the last element of the \ tag, the reason for this is that wcex initialization requires some predefined information, such as the first description of the NPM repository address, etc., of course, there are some other configurations, which we will see later. Another point is that you can optimize the initial initialization white screen of HTML. </head\>

```html
<script src="https://cdn.jsdelivr.net/npm/wcex@1.8.104/index.js"></script>
```

### First component: **\<app-\>**</app-\>

In the previous section we saw that the first Web Component we defined was loaded in index.html, now let's create it, which is a classic Hello World.

- Create a new file in this directory, named _app.html_, which reads as follows:

```html
<template>
    <h1>Hello World!</h1>
</template>

```
As you can see, this is a normal HTML file, and its only requirement is that it must use \<template\> as the root tag. </template\>

> For knowledge about _template_, you can refer to: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template, This is a standard W3C specification, WCEX uses a standardized native Web Component specification to implement, and many technical points may be used in the future, all of which belong to the standard specification. So you can take a look at the specifications in advance, most of which can be found here: https://developer.mozilla.org/en-US/docs/Web/Web_Components

Okay, now that everything we need is done, let's actually get up and running.

### Open in a browser
As we covered in the previous chapter, one of the main things WCEX does is dynamic loading, and we hate complex packaging, environment configuration, these things. So the next thing is simple. You have many ways. You can get it running. Just put the above two files into any static web, even Github or NPM. These methods are described below:

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

> Okay, next. You can open your browser's debugging window. Look at your component in the DOM, which is the internals of a standardized Web component. Here you may be able to see the second main feature of WCEX: **Intuitive**. Due to the abandonment of VDOM and the template engine, the native implementation and the standardized implementation, you will find that the DOM structure you see in the debug window is basically the same as the structure in the template, which is very conducive to our observation and debugging of problems, through the debug window, you can do almost everything you want, observe data changes, send events, change data, etc. In order to achieve this goal as much as possible. WCEX implementation also did a lot of details, such as in the **if** and **for** structure of WCEX, the implemented DOM is sibling, rather than adding another layer of wrapper elements, which is very conducive to our consistency and **intuitive** of accessing elements in CSS and data structures.

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

> Of course, in addition to the above methods, we have also made a CLI toolkit. It is very small, and it is also only tens of K in size, and does not rely on complex packaging tools such as webpack and rollup. It can help us do more work, such as hot update compilation and release, etc. Another important point is to support TypeScript. You can install **@wcex/cli** via npm, the details of which will be covered in a later section.

### Further refinement
Quite simply, in the next chapter, we'll try to add more features to it, for example. Add custom properties to add data binding. Handle events, and add more components.

