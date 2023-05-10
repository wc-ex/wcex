<!--DESC: {icon:{name:"explore"},id:3} -->



## Data and scope
The first thing we need to understand is that each **WCEX** component is a standard _WebComponent_, and each component label instance has its own data object, which we call **scope**, which you can understand as an instance of a data class bound to the label.
Each **scope** can contain multiple custom data, methods, properties, event response functions, etc., this data object is bound to the current _WebComponent_, we also call it **rootScope**, **scope** can be localized and inheritable, inside the component, each entity HTML element that supports binding data has a local scope inherited from the component **rootScope**, which we call ** localScope, which inherits upwards up to rootScope, according to the current DOM hierarchy, gives access to the current element's scope, as well as all attributes of its parent element and rootScope. Please refer to the following example:

> properties, data, methods, etc. in the scope can come from multiple places, such as component properties, meta scope definitions, inline JavaScript, external JavaScript, Typescript, npm packages, etc., which can be flexibly implemented according to your preferences and actual needs

<div><wcex-doc.com-playground files="['ext/app1/index.html','ext/app1/app.html','ext/app1/data.js']"></wcex-doc.com-playground></div>


## Value binding

## Template string binding

## Two-way binding

## Select Binding

## Style binding

