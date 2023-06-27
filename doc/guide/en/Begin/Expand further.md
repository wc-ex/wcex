<!--DESC: {icon:{name:"dashboard_customize",pkg:"mdi",type:"filled"},id:3} -->
# Extend and refine
> In the previous chapter we learned about basic component usage and rules, and then we will try to extend more features, such as data reference, modularity, third-party packages, etc.

## Main entry project
Next, implement a simple application that will include a menu bar as well as a route view. It also includes two routing-enabled pages, cross-references between multiple modules and libraries, and how to load third-party libraries.
- This main entry uses some of the exported components of the component library, such as route, clock
- Standard URL routing was used for component switching
- Packages that load NPM directly: lodash
- The called component library code is behind, because there are two different projects. After modifying the playground code of the component library, you need to manually click the refresh button in the upper right corner to update the display effect of this project

<div><wcex-doc.com-playground files="['ext/app/index.html','ext/app/app.html','ext/app/app.css','ext/app/title.html','ext/app/footer.html','ext/app/data.json','ext/app/ page1.html','ext/app/page2.html']"></wcex-doc.com-playground></div>


## Component library project
- Here we have created a component library that exports two components as well as simple routing components and implementations.
- The "index.html" of this project can be used as a test and development page for the current component library.
- Modify the component code here, click refresh in the **playground** above to see the effect

<div><wcex-doc.com-playground files="['ext/ui/index.html','ext/ui/menu.html','ext/ui/clock.html','ext/ui/clock.ts','ext/ui/clock.css','ext/ui/time.html','ext/ui/route.html']"></wcex-doc.com-playground></div>

> - You can try to fix some bugs, add new features and make it more beautiful.
> - Reference component libraries need to be defined in the component or main entry and index.html and loaded <meta> via script tags, and also support the standard import method for import in TS.
