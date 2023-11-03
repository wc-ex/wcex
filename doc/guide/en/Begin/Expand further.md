<!--DESC: {icon:{name:"dashboard_customize",pkg:"mdi",type:"filled"},id:3} -->
# Expand and improve
> In the previous chapter, we learned about the basic component usage and rules, and then we will try to extend more features, such as data referencing, modularization, third-party packages, etc.

## Main Entrance Project
Next, implement a simple application that will include a menu bar and a route view. It also includes two pages that support routing, and will also demonstrate cross-referencing between multiple modules and libraries, as well as how to load third-party libraries.
- This main portal uses some of the exported components of the component library, such as route and clock
- Standard URL routes are used for component switching
- Load NPM's package directly: lodash
- The call to the component library code is at the back, since there are two different projects. After modifying the playground code of the component library, you need to manually click the refresh button in the upper right corner to update the display of the project

<div><wcex-doc.com-playground files="['ext/app/index.html','ext/app/app.html','ext/app/app.css','ext/app/title.html','ext/app/footer.html','ext/app/data.json','ext/app/ page1.html','ext/app/page2.html']"></wcex-doc.com-playground></div>


## Component Library Project
- Here we've created a component library that exports two components as well as simple routing components and implementations.
- The "index.html" of this project can be used as a test and development page for the current component library.
- Modify the component code here, click Refresh in the **playground** above to see the effect

<div><wcex-doc.com-playground files="['ext/ui/index.html','ext/ui/menu.html','ext/ui/clock.html','ext/ui/clock.ts','ext/ui/clock.css','ext/ui/time.html','ext/ui/route.html']"></wcex-doc.com-playground></div>

> - You can try to fix some bugs, as well as add some new features and make it more beautiful.
> - Referencing a component library needs to be defined with a tag in the component or the main entry and index .html, <meta> and loaded by script tags, and it also supports the use of standard import methods in TS to import.
