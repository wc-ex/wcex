<!--DESC: {icon:{name:"explore"},id:1} -->

! [img] (@/@wcex/doc/assets/logo.svg{width:16em; height:6em})

# Components and WebComponents

Components are the main functionality of WCEX implementations, each component is a standard html file and is created as a standard native WebComponent.
- The component needs to use the unique **\<template\>** tag as the root tag.
- Components can contain standard HTML content.
- Due to the good encapsulation of standard WebComponents, you don't have to worry about CSS, naming, and variable globalization conflicts.

## Naming of the component
1. The name of the component is the name of the Web Components tag used in the html
2. According to the requirements of the WebComponents specification, the tag name of the custom component must contain "-"
3. All component names use lowercase letters, which can support Chinese

Component tag name conversion rules:
> - The component file name must be named with the small hump and the tag name corresponding to the component is the underscore ("_") for the split word.
> - The path separator "/" will be converted to "-".
> - If the converted result does not contain "-", add **"-"** to the very end of the component name.
> - There are two types of labels for each component, a short name referenced within a project or project and a full label that contains the package name referenced in another project.
> - The long name format is "Package Name. Composition name", split the package name and component name with "."
> - If the package name contains the format of the organization name, such as "@abc/def", the "@" character must be removed from the actual converted tag name

### Short name format
The short name format is often used for calling components within a project to each other, or for calling components of the project in the main entrance project.
- The short name of the component usually starts from the root directory, and each level of directory is converted to a standard directory separator, separated by a "-" in the corresponding tag.
- If you open the current package main portal file (usually named index.html) in the browser, the actual component path starts with the directory where the main portal file is located as the root directory
- All component paths can only be calculated downward, that is, only the subdirectory pathnames are calculated.

#### example
Suppose your project has the following file structure and mounts it to the local localhost:8080 port root:
```text
/-
 |-- index.html
 |-- app.html
 |-- component \
 |-------------|-- com1.html
 |-------------|-- com2.html
 |-------------|-- index.html
 |-- test \
 |--------|-- helloWorld.html 
```

When you visit: __http://localhost:8080/index.html__ in your browser, the corresponding tag names are as follows:

> **\<app-\>**, **\<component-com1\>**, **\<component-com2\>**, **\<test-hello_world\>**

For example, when you visit: __http://localhost:8080/components/index.html__ in your browser, the corresponding tag name is as follows:

> **\<com1-\>**, **\<com2\>**
> —Components in their parent and sibling directories cannot be accessed with short names, or long name naming formats are required if access is required.

### Full name (including package name)
The full name is used to access components in other project component library packages.

#### example
Let's say you have two projects with package names: abc and @pkg/ui, and each package has two components, com1.html and com2.html. The full tag name is as follows:

- Package: ABC
>  **\<abc.com1-\>**, **\<abc.com2-\>**

- Package: @pkg/ui
>  **\<pkg-ui.com1\>**, **\<pkg-ui.com2\>**

- You can see that in the 2nd package, there is no need to append a "-" at the end since the name is already included in the name.

## Implementation of components
The component implementation file is a standard HTML file, and the common structure is as follows:

<div><wcex-doc.com-playground files="['component/index.html','component/app.html','component/com.html','component/com.ts']"></wcex-doc.com-playground></div>

### Component properties
- Components can define their own props, which can be used externally to pass parameters when the component is used
- Component properties can be appended with type modifiers, type modifiers support: **bool**, **int**,**float**,**obj**,**array**, **string** type, default is "string" 
- When a component has a value property defined, it behaves similarly to a standard __input__ component, and can be bound bidirectionally via **$$**
- The default component properties are passed using String for conversion, and the $ modifier can be used to use the value pass mode, at which point the $props will be able to use the expression to calculate the initial default

### Component data
- Internal variables can be set via the \<meta name="scope" \> tag, which also supports type modifiers
- You can also use the script tag to introduce classes to create component variables and methods
- All variables or methods defined in prop and meta[scope] and script can be used directly in component data binding
- The scope class can be imported with the script tag in the component, so the src attribute of the tag is ".", which means that the js or ts with the same name of the current component is introduced
- When using TypeScript files, you can get complete syntax hints and other information, and you can directly import third-party libraries, please see the following section for specific rules
