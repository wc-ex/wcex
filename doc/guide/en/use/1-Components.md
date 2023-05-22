<!--DESC: {icon:{name:"explore"},id:1} -->

! [img] (@/@wcex/doc/assets/logo.svg{width:16em; height:6em})

# Components and WebComponents

Components are the main feature of the WCEX implementation, each component is a standard html file and is created as a standard native WebComponent.
- Components need to use a unique **\<template\>** tag as the root label.
- Components can contain standard HTML content.
- Due to the good encapsulation of standard WebComponents, you don't have to worry about CSS and naming and variable globalization conflicts.

## Naming of the component
1. The name of the component, which is the name of the **Web Components** tag used in the html
2. According to the WebComponents specification, the label name of the custom component must contain "-"
3. All component names use lowercase letters and can support Chinese

Component label name conversion rules:
> - The component file name must be named with **Little Hump**, and the label corresponding to the component is **Underscore ("_")** as a split word.
> - The path separator "/" will be converted to "-".
> - If the converted result does not contain "-", add **"-"** to the end of the component name.
> —There are two types of labels for each component, short names referenced within the project or project, and full labels containing package names referenced in other projects.
> - Long name format "package name. Component name", splitting the package name and component name with "."
> - If the package name contains the format of the organization name, such as "@abc/def", the "@" character needs to be removed from the actual converted label name

### short name format
The short name format is often used to call each other between components within a project, or to call the project's components in the main entry project.
- The short name of the component usually starts with the root directory, and each level of directory will be converted to a standard directory separator, separated by "-" in the corresponding label.
- If you open the current package main entry file (usually named index.html in your browser), the actual component path starts with the directory where the main entry file is located as the root directory
- All component paths can only be evaluated downward, i.e. only subdirectory pathnames.

#### example
Assume that your project has the following file structure and is mounted to the local localhost:8080 port root:
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

When you visit __http://localhost:8080/index.html__ in your browser, the corresponding tag name is as follows:

> **\<app-\>**, **\<component-com1\>**, **\<component-com2\>**, **\<test-hello_world\>**

For example, when you access __http://localhost:8080/components/index.html__ in a browser, the corresponding tag name is as follows:

> **\<com1-\>**, **\<com2\>**
> - Components in their parent and sibling directories cannot be accessed using short names, and long name naming formats are required if they must.

### Full name (including package name)
The full name is used to access components in other project component library packages.

#### example
Suppose you have two projects with package names: abc and @pkg/ui, each with two components, com1.html and com2.html. Then its full label name is as follows:

- Package: ABC
>  **\<abc.com1-\>**, **\<abc.com2-\>**

- Package: @pkg/UI
>  **\<pkg-ui.com1\>**, **\<pkg-ui.com2\>**

- You can see that in the 2nd package, since the name already contains "-", there is no need to append "-" at the end.

## Implementation of components
The component implementation file is a standard HTML file with the following common structure:

<div><wcex-doc.com-playground files="['component/index.html','component/app.html','component/com.html','component/com.ts']"></wcex-doc.com-playground></div>

### Component properties
- Components can define their own props, and the defined properties can be used to pass parameters when using the component externally
- Component properties can be appended with type modifiers, type modifiers support: **bool**, **int**, **float**, **obj**, **array**, **string** types, default to "string" 
- When a component defines the value attribute, it behaves similarly to standard __input__ components, and can be bound in both directions via **$$**
- Default component properties are passed using a string for conversions and a value pass pattern using the $** modifier, at which point $props will be able to calculate the initial default value using the expression

### Component data
- Internal variables can be set via the \<meta name="scope" \> tag, and type modifiers are also supported
- You can also use the script tag to introduce classes, create component variables and methods
- All variables or methods defined in **prop** and **meta[scope]** and **script** mode can be used directly when the component data is bound
- Use the script tag in the component to import a scoped class, such as the tag **src** attribute is ".", which means that the js or ts of the same name as the current component is introduced
- When using TypeScript files, you can get complete syntax hints and other information, and you can import directly into third-party libraries, please refer to the following sections for specific rules
