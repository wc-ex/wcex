<p align="center"><img src="logo.png" width="200" height="128" ></p>
<p align="center">
  <a href="https://npmcharts.com/compare/wcex?minimal=true"><img src="https://img.shields.io/npm/dm/wcex.svg?sanitize=true" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/wcex"><img src="https://img.shields.io/npm/v/wcex.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/wcex"><img src="https://img.shields.io/npm/l/wcex.svg?sanitize=true" alt="License"></a>
  <a href="https://www.npmjs.com/package/wcex"><img src="https://img.shields.io/bundlephobia/minzip/wcex.svg?sanitize=true" alt="minsize"></a>
  <a href="https://www.npmjs.com/package/@wcex/cli"><img src="https://img.shields.io/npm/v/@wcex/cli?label=%40wcex%2Fcli" alt="Version"></a>
</p>
<p align="center" id="doc">
  Documents:
  <a href="https://wc-ex.com?pkg=@wcex/doc&lang=cn">中文简体</a>
  <a href="https://wc-ex.com?pkg=@wcex/doc&lang=en">English</a>
</p>

# Welcome to the World of Web Components

WCEX is an extension library that quickly implements Web Components for fast and efficient development of web front-end pages

- **Modern Framework**: WCEX also implements many of the features of modern web front-end frameworks, such as data binding, dependency updates, routing, development hot loading, and more.
- **UNIQUE FEATURES**: WCEX also has a number of unique features, such as style dynamic binding, no packaging, automated color matching, etc
- **TypeScript**: WCEX fully supports Typescript and is developed entirely in TypeScript
- **Intuitive Semantics**: WCEX fully implements modern syntax including "if", "for", "$ data binding", "event binding", etc., borrows from *VUE*, and has been simplified and optimized, so you can get started quickly
- **Real DOM**: Fast and intuitive
- The word **WCEX** is a bit difficult to pronounce, so let's simplify it and read it as **(/wɛks/)**.
- ... Refer to the following sections to continue to learn

## HTML First
We want to make it as easy and intuitive to write and use components as a traditional HTML page, so we have designed and implemented a number of features, including component scope, component internal data, component internal styles, element local scope, etc., so you can see that WCEX components are developed and used just like writing traditional HTML. We recommend that you use an HTML implementation of the logic first when developing your own components, or inline JavaScript or external Typescript depending on the complexity, and that the above can be mixed.
## Simple

The design concept of WCEX is "**simple**", "**concise**", and "**simplified**", simplifying all aspects of product development, including development, debugging, testing, release, etc., as well as subsequent version upgrades and iterations.

The idea of providing users with an efficient and intuitive experience is also reflected in the various features and usage methods of WCEX.

As a result, WCEX has done a lot of work to simplify development and deployment, moving away from the tedious packaging, publishing, and splitting and chopping, to automating the entire process by handling auto-dependencies and lazy loading at runtime, making the development and deployment of a project as easy as a link to an HTML page. At the same time, the technology of "time-to-load" is widely used in all aspects of WCEX applications, including "components", "Javascript", "third-party libraries", "CSS", "icons", "SVG", etc., and greatly improves the speed of the application through internal caching and preprocessing.

### Fully componentized

Thanks to WCEX's complete implementation of native WebComponents, every page, template, and component in our system is a standardized WebComponent, and not only that, but we have also extended the native WebComponent in the implementation, implementing many new features that can greatly help the implementation of WebComponent. Here are a few interesting features:

#### Dynamic tag parsing and loading

When using custom tags, you only need to use tags, no need to download dependencies and introduce JS in advance, WCEX will automatically recognize tags and automatically load relevant files on demand, this feature allows us to achieve "time-to-load", and the tags that are not used in the page will not be read and loaded and affect the page startup speed. Here's a simple example of a feature component in the project shown in this document, which you can easily find, with the following reference code:
- _/doc/doc.html_
- Implement markdown document previews
```html
<template url="">
  <style>
    :host {
      display: flex;
      flex-direction: column;
    }
    .title{
      padding: 0.5em;
      background-color: "$$color.bgr.a9_";
    }
  </style>
  <div class="title" $>url</div>
  <wcex-ui.marked 
    style="padding: 1em;" 
    $src="($root.url)?$path('guide/cn/'+$root.url):''"
    >
  </wcex-ui.marked>
</template>
```

> you can see that _\<wcex-ui.marked\>_ is a UI library component we are referencing, and when using the component, wcex will automatically go to the npm repository to get the component and its related dependencies, and load it on demand. You don't need to install packages to use this component, and you don't need to install third-party libraries that markdown depends on (marked and highlight are used here), and these associated libraries are automatically loaded and run from npm on demand. Of course, there is also a very simple way to get WCEX to load dependencies from a local related directory. As for the other syntax, it will be talked about in the following chapters, which is very concise, isn't it, so that a custom label WebComponent with a label named _\<doc-\>_ is implemented, which can be referenced directly on the page, or directly referenced through our routing component, and you can see it by observing the URL bar of the browser.

#### Extended WebComponent property
In the above example, you can see that the root tag of this component is _\<template url=""\>_, and in WCEX, all web components are encapsulated in _\<template\>_, along with an external attribute named _url_, which can be used as an external parameter when used, just like a normal HTML element tag. This parameter can also be easily referenced directly within the component.


#### Enhanced data binding and dependency changes as well as local data
Data can be defined and used in many ways within a component, and can be flexibly defined and set up in various parts of a component: property areas, local scopes, elements, embedded scripts, external scripts, external JSON, third-party libraries, etc., so that they can be defined and used where most appropriate according to business logic
> data is used to control and manipulate the interface, so the data should appear in the closest place to the business logic elements, so that you can intuitively find the objects you need, and easily refer to and modify them, without having to open another file to find data and definitions, which is also very conducive to component refactoring. Component refactoring is a very common thing in the daily business development process, in the process of continuous iteration, it is inevitable that sub-components need to be split with the increase of functions, and at this time, it is easy to use local data to create new components by copying and pasting.

### Dynamic references
We want all reference libraries, CSS, components, and other data to be dynamic and can be referenced directly from the static CDN. In this way, you can avoid some complicated processes such as installing packages, upgrading versions, etc. The advantage of this is that WCEX components and projects can be easily placed anywhere, such as npm, github, or any static web server. As you can see now, this documentation framework is completely developed using WCEX, and I just need to submit it to Github without the need for additional packaging and release processes. to see the results in real time. Any component package only needs to be submitted to npm, and other projects can be directly referenced. Even the third-party libraries you need are referenced directly from the npm source, so you don't need to install them separately.

> We all know that. The world of JavaScript and the web front-end is complex, and we've done a lot of compatibility work to do that. WCEX now has direct references to CommonJs, Amd, Umd, Es6 modules, css, component HTML, svg, fonts, and icon libraries directly in projects without the need for localized installations. Even when using Typescript, WCEX is able to correctly handle and recognize TS imports and convert them to dynamic dependencies. These dependencies are lazy loaded. and the ability to properly handle associated multi-level dependencies. This makes it easy for us to run projects submitted to npm directly and statically through the CDN without having to do any more work. At the same time, versioning support also makes upgrading easy.

### Time to load and dependency runs
The dynamic nature of WCEX is reflected in many ways, not only at load time, but also at runtime. Minimized DOM merge changes make the run extremely responsive, and along with the dynamic loading feature, only the minimized necessary content is loaded at runtime, including JS, CSS, icon fonts, and other components. Of course, we can also manually configure certain components or scripts to preload them in advance.

## Dynamically loaded static components
In the above description, you may have found some features of WCEX, which essentially implements dynamic loading of components and static deployment of components. In this way, our components can be easily developed and used just like the earliest HTML pages. And it can be easily statically managed, and can be easily used and deployed to various scenarios, such as CDN, NPM, native and even mobile devices.

## Intuitive
The complete implementation based on Web Components, as well as the combination of features of modern frameworks such as data binding and dependency updates, as well as the implementation based on the full real DOM, provide great convenience for development and debugging as well as the logic of the entire project. The real DOM corresponds to the edited code, and the relevant elements in the code can be found directly in the debugging console, and even directly manipulated for testing and debugging. This feature is far more than. Other frameworks require much more powerful browser plug-ins to be installed. With the debugging console, you can directly change the data sending events, observe the changes in properties, and drill down into the components internally. Even breakpoints and traces. It's all intuitive.

## Speed
WCEX is very fast and we've done a lot of work to speed it up, in addition to minimizing dynamic dependency loading, we've also implemented preprocessing and caching of templates, CSS injection, and preprocessing of all aspects of caching, font icons, and so on.
> It is worth mentioning that WCEX is not like other frameworks that use VDOM, it is completely based on the real DOM tree for merging changes and processing, we have abandoned the difference comparison algorithm of the DOM tree, and instead implemented a small change collector to achieve when the data changes, get the smallest change unit, merge it, and finally refresh to the DOM at one time, so that the response speed of the system is greatly improved.

## Progressive development
Unlike other frameworks, WCEX does not have a strong language preference, whether it is HTML, Javscript, Typescript, etc., it is a development choice that we support and recommend, but it is a gradual development process that evolves from simple to complex and then split and refactored. In this process, follow the concept of **good cat**, fast implementation, streamlined logic and convenient iterative upgrading.

> We usually use this approach in our projects:
> - First, pages with simple logic, usually in a pure _HTML_ way, try to avoid Javascript, because this will lead to the separation of the definition and reference of the variable name, which looks tiring;
> - Second, as the complexity of the business increases, especially when the JS statements embedded in the elements are long, migrate the JS to the _HTML inline script tag_ and use the Javascript syntax, so that there can be basic syntax checking and better formatting;
> - Third, as the business further increases and the number of lines of code increases, we generally control _inline JavaScript_ within 50 lines, split Js into a separate Typescript file, and complete the type. With the support of _WCEX_, this will be easy;
> - Finally, when the component becomes larger, the component needs to be split independently



## Low cost delivery
The life cycle of a software product is complex, and WCEX considers how to simplify and optimize the entire software product lifecycle, including the development and debugging chain. Test the deployment and release, and the subsequent changes again and again. version iteration and many other links. Optimize and simplify these steps. It can greatly improve the efficiency of our development. This reduces the cost of the entire software development cycle. As a result, many of the features we design are related to these. In the following chapters. You may see some interesting applications in each section.
> For example, based on the dynamic dependency and loading features, it is possible to achieve multi-component modules in team development, multi-person collaborative network collaborative hot updates, and these updates are based on local refreshes. Everyone's changes are reflected in your live preview in real time

> With the features of WCEX static components, you can even use npm and GitHub as your personal blog, so you don't need a server or a traffic fee.

> This document does just that, the framework and components of the document are written in WCEX, reference some of the third-party packages that are available on NPM, and some of the content is written in markdown. Eventually, it was published directly to NPM, through the public free CDN, which is what you can see now.

## Miscellaneous
In the upper right corner, there is a small button where you can experience the features of WCEX Semantic Real-Time Color Matching, and choose the color you like.

In addition, you can see that document uses a special Chinese font, and WCEX also implements the time loading of Chinese large fonts. The usability of using a variety of Chinese fonts in the browser has been greatly improved, and the details of font loading can be seen in the debugging console, and the use of this Chinese font does not depend on other third-party API services are also completely static, and support offline, and there will be a chapter dedicated to the support and optimization of Chinese font loading Reference items: [https://github.com/wc-ex/cn-fontsource]( https://github.com/wc-ex/cn-fontsource)


### @wcex/cli
  - Full usage,please see **Documents**
  - Develop a client toolkit that includes hot updates, builds, releases, and more, simply and quickly
  - Features:Typescript support, Local hot update support, only update the changed components each time, without affecting the overall data and current status of the current page.
  - install:
    > pnpm install @wcex/cli 
  - Usage:
    > in project dir, run: "wcex"  
 
### [Documents](#doc)
For more information, please refer to the documentation
### Update
