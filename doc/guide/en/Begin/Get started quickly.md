<!--DESC: {icon:{name:"sports_score",pkg:"mdi",type:"filled"},id:2} -->

## Get started quickly

Let's quickly start with a simplest project and refine it step by step. Okay, now create a new directory on the disk.

### Main entrance: index.html

First, write an entry file, which we usually call _index.html_:

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

Compared to normal HTML, we only need to do three simple steps:

1. Add the **npm** \<meta\> tag definition to the project so that WCEX knows where to find the third-party packages you need, in this case jsdelivr, you can use any CDN you like, or install NPM to your local path.

```html
<meta name="npm" content="https://cdn.jsdelivr.net/npm/" />
```

2. Use your first component, which we usually name **app**, but here it is labeled \<app-\>, because the Web Component standard specification requires all custom components to have at least one '-' character, so we need to append a '-' at the end.

```html
<app-></app->
```

3. Finally, we need to import the WCEX package, here directly through the public cdn, and import the latest version. WCEX is very small, doesn't have any third-party dependencies, loads very quickly, and usually puts this line in the last element of the \<head\> tag, because wcex needs some predefined information when initializing, such as the address of the NPM repository described in the first article, and of course, there are some other configurations, which we will see later. Another point is that it is possible to optimize the initial initialization of the HTML white screen.

```html
<script src="https://cdn.jsdelivr.net/npm/wcex@1.8.104/index.js"></script>
```

### First component: **\<app-\>**

In the previous section we saw that the first Web Component we defined was loaded in index.html, now let's create it, which is a classic Hello World.

- Create a new file in this directory called **app.html** with the following content:

```html
<template>
  <h1>Hello World!</h1>
</template>
```

As you can see, this is a normal HTML file, and the only requirement is that it must have \<template\> as the root tag.

> For more information about the template, you can refer to: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template, This is a standard W3C specification, WCEX uses a standardized native Web Component specification to implement, and many technical points may be used in the future, all of which belong to the standard specification. So you can take a look at the relevant specifications in advance, and most of them can be found here: https://developer.mozilla.org/en-US/docs/Web/Web_Components

Okay, now that we've got everything we need done, let's get it up and running.

### Open in your browser

As we mentioned in the previous chapter, one of the main things WCEX does is that it is loaded dynamically, and we hate complicated packaging, environment configurations. So the rest is simple. You have many ways. You can get it up and running. Just put the above two files in any static WEB, even Github or NPM. Here's how to do it:

#### Start the local HTTP service

- The easiest way to do this is to install a fast HTTP server tool with npm

```shell
npm install -g http-server
```

- Then start in the directory you just wanted, and on the command line, go to your directory and run the following command.

```shell
http-server
```

- You can see that your HTTP server is already up on port 8080, now open your browser and type in the address bar:

```
http://localhost:8080
```

Now you can see **Hello World**, of course, you can use any HTTP server you like, nginx, lighttpd...

> Okay, next. You can open your browser's debugging window. Take a look at your component in the DOM, which is the internals of a standardized Web Component. Here you may be able to see the second major feature of WCEX: Intuitive. By abandoning the VDOM and the template engine, using the native implementation and following a standardized implementation, you will find that the DOM structure you see in the debug window is basically the same as the structure in the template, which is very beneficial for us to observe and debug problems, and through the debug window, you can do almost everything you want, watch the data change, send events, change the data, and so on. In order to achieve this goal as much as possible. There are also many details in the WCEX implementation, such as the implementation of the DOM in the **if** and **for** structure of WCEX, instead of adding another layer of wrapper elements, which is very conducive to the consistency and **intuitiveness** of the elements accessed by CSS and data structures.

#### Preview directly over the web

If you submit the above files to github or publish the package via npm, you can access it directly through the CDN, and we have made a widget to help you preview it directly, this tool uses jsdelivr as the CDN.
For more information about the access format and description, please refer to: https://www.jsdelivr.com/

- For NPM access, please replace your own package name.

```
https://wc-ex.com/go?npm/@wcex/example-basic/index.html

https://wc-ex.com/go?npm/[YOUT PACKAGE NAME][@VERSION]/index.html

```

- GitHub access, please replace your repository name and path

```
https://wc-ex.com/go?gh/wc-ex/wcex/example/basic/index.html
https://wc-ex.com/go?gh/[YOU REPOS]@[COMMIT ID]/[YOU DIR]/index.html
```

> Of course, in addition to the above methods, we have also made a CLI toolkit. It's very small, and it's only a few tens of kilobytes in size, and it doesn't rely on complex packaging tools like webpack and rollups. It can help us do more work, such as hot updates, compilation, release, etc. Another important point is to support TypeScript. You can install **@wcex/cli** via npm, the details will be explained in the following chapters.

### Try it now
- This is a drill ground that you can modify directly in the editor to see the effect in real time.
- There are two small buttons in the upper right corner, __reload__ to refresh the display, and __reset__ to restore the content to its original state

<div>
<wcex-doc.com-playground files="['first/index.html','first/app.html','first/com/time.html']"></wcex-doc.com-playground>
</div>

- In this initialization project, we have three files, the _index.html_ main portal, and two components
- You can see the rules for component referencing and naming, as well as how data binding is handled
> Component naming: With the main html as the root node and *"-"* as the directory splitter, the component name can use a small hump rule, such as "helloWorld", such a component name will be "hello_world", due to the HTML specification requirements, if the final name does not contain the "-" character, you need to add a "-" character at the end. If you want to reference an external package, you need to use the "." character to split the package name and component name.  
- Let's familiarize yourself with it first, and you can try to experiment with a task.
  - Add the name attribute for _\<app\>_ in _index.html_ 
  - Change the _$_ value binding to _:_ string template binding in _com/time.html 
  - Adjust the time interval for _@time_ to every 2 seconds in the com/time.html 
  - The main syntax used: _"$$"_ is a two-way binding, _"$"_ is a calculation binding, _":"_ is a template string binding, and _'@'_ is an event binding
  - The syntax in CSS has changed slightly, variable bindings need to be surrounded by _"_ or _'_, and the first character _$_ or _:_ represents the binding method, which is the same as the above rules
- When changing _com/time.html_, you can see that the update of the component code is partial and does not affect the current state in the _app.html_ component, which is the same as the implementation mechanism of our client-side tool _@wcex/cli_, which we call **local hot update**, which can be very useful when we are debugging and developing.
- Finally, open your debug window and look at the structure of the document, and you'll see that the DOM structure is consistent with the template source file, which is another feature of WCEX: *Intuitive*


### Next Extension

Quite simply, in the next chapter, we'll try to add more features to it, for example. Add custom properties to add data bindings. Handle events, and add more components.
and the processing of scripts.
- Don't forget, you can choose your favorite color in the top right corner.

