<!--DESC: {icon:{name:"explore"},id:1} -->

! [img] (@/@wcex/doc/assets/logo.svg{width:16em; height:6em})

# Components and WebComponents

Components are the main feature of the WCEX implementation, each component is a standard html file and is created as a standard native WebComponent.
- Components need to use a unique **\<template\>** tag as the root label.
- Components can contain standard HTML content.
- Due to the good encapsulation of standard WebComponents, you don't have to worry about CSS and naming and variable globalization conflicts.

## Naming of the component
1. The name of the component, which is the name of the **Web Components** tag used in the html.
2. According to the requirements of the WebComponents specification, the label name of a custom component must contain "-", so the rules for defining the naming convention of the component are as follows:

- The component file name must be named with **Little Hump**, and the label name corresponding to the component is **Underscore ("_")** as a split word.
- The path separator "/" will be converted to "-".
- If the converted result does not contain "-", add **"-"** at the end of the component name.
- There are two types of labels for each component, short names referenced within the project or project, and full labels containing package names referenced in other projects.
- The long name format is "package name. Component name", splitting the package name and component name with "."
- If the package name contains the format of the organization name, such as "@abc/def", the "@" character must be removed from the actual converted label name

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


