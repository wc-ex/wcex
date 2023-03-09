<!--DESC: {"icon":"explore"} -->
<p align="center"><svg width=8em src="/logo.svg" ></svg></p>

# Welcome to the world of Web Components

WCEX is an extension library that quickly implements Web Components and enables fast and efficient development of web front-end pages

- **Modern Framework Features**: WCEX also implements many of the features of modern web front-end frameworks today, such as data binding, dependency updates, routing, development hot loading....
- **Unique Features**:WCEX also has many unique features, such as Style dynamic binding, no packaging, automatic color matching, etc
- **TypeScript**: WCEX fully supports Typescript and is fully developed using TypeScript
- Intuitive Semantics: WCEX fully implements modern syntax including "if", "for", "$ data binding", "event binding", etc., borrows from *VUE*, and simplifies and optimizes it for quick use
- **Real Dom**: Fast and intuitive
- The word **WCEX** is a bit difficult to read, let's simplify it and read it as **(/wɛks/)**.
- ... Refer to the subsequent sections to continue learning

## Simple

WCEX's design philosophy is "** simple** " ** simple ** " **
Providing users with an efficient and intuitive experience can also be reflected in the various function points and usage methods of WCEX.

> Therefore, WCEX** has done a lot of work to simplify development and deployment, no longer using cumbersome packaging, publishing, separation and cutting, but automating the entire process by handling automatic dependencies and lazy loading at runtime, making the development and deployment of projects as easy as the original HTML page links. At the same time, the technology of time-consuming loading is widely used in all aspects of WCEX applications, including components, Javascript, third-party libraries, CSS, icons, SVG, etc., and greatly improves the startup and running speed of applications through internal caching and preprocessing.

### Fully componentized

Thanks to WCEX's complete implementation of native Web Components, every page, template, and component in our system is a standardized WebComponent, not only that, but we also extend the native WebComponent in the implementation and implement many new features, which can greatly help the implementation of WebComponent. Here are a few interesting features:

#### Dynamic tag parsing and loading

When using custom tags, just use tags, no need to download dependencies and introduce JS in advance, WCEX will automatically identify tags and automatically load relevant files on demand, this feature allows us to achieve "time-consuming loading", unused tags in the page will not be read and loaded and affect the page startup speed. Below is a simple example and a functional component in the project shown in this document that you can easily find, the reference code is as follows:
- _/doc/doc.html_
- Implement markdown document preview
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

> can see that _\<wcex-ui.marked\>_ is a UI library component we are referencing, and when using the component, wcex will automatically go to the npm warehouse area to get the component and its related dependencies and load it on demand. There is no need to install packages or third-party libraries that markdown depends on (marked and highlight are used here) to use this component, and these associated libraries are automatically loaded and run from npm on demand. Of course, there is also a very simple way to let WCEX load dependent packages from the local relevant directory. As for the other syntax, it will be discussed in later chapters, very concise, isn't it, so that a <doc-\>WebComponent with a custom label named _\_ is implemented, which can be referenced directly on the page, or directly through our routing component, and you can see it by observing the URL bar of the browser. </doc-\></wcex-ui.marked\>

#### Extended WebComponent properties
In the above example, you can see that the root tag of this component is _\_<template url="" \="">, and in WCEX, all web components are encapsulated in _\_, <template\>along with an external attribute named _url_, which can be used to pass external parameters when used, just like an attribute of a normal HTML element tag. Inside the component, it is also convenient to reference this parameter directly. </template\></template>


#### Enhanced data binding and dependency changes as well as local data
Within a component, data can be defined and used in many ways, and data can be flexibly defined and set in various parts of a component: property areas, local scopes, elements, embedded scripts, external scripts, external JSON, third-party libraries, etc., in order to define and use it in the most suitable place according to business logic
> data is used to control and operate the interface, so the data should appear closest to the business logic element, which can intuitively find the object you need, and easily reference and modify, without having to open another file to find data and definitions, which is also very conducive to our component refactoring. Component refactoring is a very common thing in the daily business development process, in the continuous iterative development process, it is inevitable that with the increase of functions and need to split out sub-components, at this time the use of local data can be easily created by a copy and paste to create new components.

### Dynamic references
We want all reference libraries, CSS, components, etc. data to be dynamic and can be referenced directly from a static CDN. This way you can avoid some complicated processes such as installing packages, upgrading versions, etc. The advantage of this is that WCEX components and projects can be easily placed anywhere such as npm, github, or any static web server. As you can see now, the documentation framework was developed entirely in WCEX, and I just committed it to Github without additional packaging and distribution. to see the effect in real time. Any component package only needs to be submitted to npm, and other projects can be directly referenced. Even the third-party libraries you need directly reference the npm source without having to install it separately.

> We all know that. The world of JavaScript and the web front end is complex, and we do a lot of compatibility work for that. WCEX can now directly reference CommonJs, Amd, Umd, Es6 modules, css, component HTML, svg, fonts, and icon libraries directly in projects without the need for localized installation. Even when using Typescript, WCEX is able to correctly handle and recognize TS imports, and convert them to dynamic dependencies. These dependencies are lazy loaded. And be able to handle associated multi-level dependencies correctly. This allows us to easily staticize projects submitted to npm directly via CDN without having to do more work. At the same time, versioning support also makes upgrading a breeze.

### Runtime loading and dependency run
The dynamic nature of WCEX is reflected in many ways, not only at load time, but also at runtime. The minimized DOM incorporates changes to make the runtime extremely responsive, and together with the dynamic loading feature, only the minimized necessary content is loaded at runtime, including JS, CSS, icon fonts, and other components. Of course, we can also manually configure certain components or scripts for preloading.

## Dynamically loaded static components
In the above description, you may find some features of WCEX, which essentially implements the dynamic loading of components and the static deployment of components. In this way, our components can be developed and used as easily as the earliest HTML pages. And it can be very easy to manage statically, and can be easily used and deployed to various scenarios, such as CDN, NPM, native and even mobile devices.

## Intuitive
A complete Web Components-based implementation, as well as a combination of features of modern frameworks such as data binding, dependency updates, and a full real-world DOM-based implementation, provides great convenience for development and debugging and the logic of the entire project. The real DOM and the edited code correspond one-to-one, and the relevant elements in the code can be found directly in the debug console, and even manipulated directly for testing and debugging. This feature is far more than. Other frameworks require browser plugins to be installed that are much more powerful. Through the debug console, you can send events directly to change data, observe changes in properties, and drill down into components. Even breakpoints and traces. It's all intuitive.

## Speed
WCEX runs very fast, we have done a lot of work to speed it up, in addition to minimizing dynamic dependency loading, we also implement template preprocessing and caching, CSS injection, and caching, font icons, etc.
> It is worth mentioning that WCEX is not like other frameworks that use VDOM, it is completely based on the real DOM tree for merge changes and processing, we abandon the DOM tree difference comparison algorithm, and instead implement a small change collector to achieve when the data changes, get the smallest change unit, merge it, and finally refresh to the DOM at one time, so that the response speed to the system is greatly improved.

## Progressive development
Unlike other frameworks, WCEX does not have a strong language preference, whether it is HTML, Javscript, Typescript, etc., it is a development choice that we support and recommend, but as the project evolves, it is a gradual development process that goes from simple to complex and then split and reconstructed. In this process, follow the **Good Cat** concept, fast implementation, streamlined logic and convenient iterative upgrade.

> We usually do this in our projects:
> - First, logically simple pages, usually in a pure _HTML_ way, try to avoid using Javascript, because this will lead to the definition of variable names and references separated, looks tired;
> - Second, as the complexity of the business increases, especially when the inline JS statement is long, migrate JS to the _HTML inline script tag_ and use Javascript syntax, so that there can be basic syntax checking and better formatting;
> - Third, as the business further increases and the number of lines of code increases, we generally control _inlining JavaScript_ Within 50 lines, Js is split into independent Typescript files and completes the type. With the support of _WCEX_, this work would be easy;
> - Finally, the component is further large, and this is when the component is split independently



## Low cost delivery
The life cycle of a software product is more complex, WCEX considers how to achieve overall simplification and optimization in the entire life cycle of the software product, including from the development and debugging chain. Test deployment releases, and subsequent changes. Version iteration and many other links. Optimize and simplify these links. It can greatly improve the efficiency of our development. This reduces the cost of the entire software development cycle. Therefore, many of the features we design are related to these. In the following chapters. You'll probably see some interesting apps in each step.
> For example, based on the characteristics of dynamic dependencies and loading, multi-component modules and multi-person collaborative network collaborative hot updates can be achieved in team development, and these updates are based on local refreshes. Everyone's changes are reflected in your live preview in real time

> Through the feature of WCEX static components, you can even directly use npm and GitHub as your personal blog, so that there is no need for servers and no traffic fees, how good.

> This document does just that, with frameworks and components written in WCEX, references some ready-made third-party packages on NPM, and some content is written in markdown. It was eventually released directly to NPM, through a public free CDN, which is what can be seen now.

## Other
There is a small button in the upper right corner, you can experience the characteristics of WCEX _Semantic Real-time Color Matching_, choose your favorite color.

In addition, you can see that this document uses special Chinese fonts, and WCEX also implements time-consuming loading of Chinese large fonts. The usability to use a variety of Chinese fonts in the browser is greatly improved, and the details of font loading can be seen in the debugging console, and the use of this Chinese font does not depend on other third-party API services are also completely static and support offline, and there will be a chapter dedicated to the support and optimization of Chinese font loading Reference project: [https://github.com/wc-ex/cn-fontsource]( https://github.com/wc-ex/cn-fontsource)
