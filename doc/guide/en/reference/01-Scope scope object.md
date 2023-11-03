<!--DESC: {icon:{name:"explore",pkg:"mdi",type:"filled"},id:1} -->

## Scope Scope object
Scopes contain data, objects, and methods that can be used directly in binding templates, scripts, and events.


### Scope references are related to HTML elements

#### $root
Point to the current WebComponent root Scope object

#### $rootElem
Point to the current WebComponent root element, of type HTMLElement object.

#### $rootParentElem
Point to the parent element of the current **WebComponent** root element, note that if the current component root element has no parent element (e.g. a first-level tag in another component, then use parentElement in HTML to get the result null, but the actual parentNode points to shadowRoot), then using rootParentElem will return the parent component of the actual current component, of type HTMLElement object. Using this object will make it easy to get the data and methods of the parent component.


#### $parent
Point to the current element's parent Scope object, note that the $parent here does not point to the parent element, but to get the scope of the parent element that has the nearest dynamic tag with the scope.

#### $id
  Provide a direct reference to the id element contained in the template, of type HTMLElement object.
  Example:
  ```html
  <template>
    <div id="mydiv"></div>
  </template>
  <script scope=".">
    return class{

      onReady(){
        this.$id.mydiv.innerHTML = "Hello World";
      }
    }
  </script>
  ```

### Data and event dependencies

#### $emit
Send custom or standard events
- $emit(nameOrEvent: string | Event, detailOrtoElem?: Element | any, toElem?: Element): void;
#### $watch
Monitor changes in a function or expression, and trigger a callback function when changes occur

#### $noWatch
Prevent the change monitoring of an object, which is often used for some objects that do not need to be monitored, such as system objects


### Routing-related

#### $go
Route redirect, which supports multiple methods, is a shortcut reference to the $router.go() method.
area is a partition route, and the default is default.

#### $router
Route objects, which provide methods and properties related to routes, see Routes
Common Methods:
- go(tag,arrts:{}) or go(area,tag,attrs:{})
- parseLocation() resolves the current route
- back() to return to the previous level



### Utility objects
#### $log 
The output standard log is the same as that of the console .log, but the colored component name and line number will be displayed in the console for easy debugging. Support for simplified calls to $log (...) args), which is equivalent to $log.log(... args)

#### $path()
Get the actual path related to the dynamic component, for example, if an image is referenced in the component, the path of this image will be relative to the path of the component, not the path of the current page, and the correct path can be obtained by using $path.
- Support "./" relative to the current component path
- Support "@/" relative to npm packet paths

#### $color
Semantic dynamic color matching objects, common semantic colors: $color.pri, $color.pria, $color.sec, $color.seca, $color.text, $color.textr, $color.bg, $color.bgr, $color.ok, $color.warn, $color.info, $color.error, etc.
HSL-based color modifiers, such as $color.pri.l3.s5.h2_.a6, can be called continuously, please refer to the chapter on color matching for details

#### $Colors
Manage and dynamically load color palettes

#### $json
Format the display of $json data, which is a simplified call to JSON.stringify, and supports dynamic change detection

#### $delay
You can specify the next period of implementation, using setTimeout
> $delay(ms:number):Promise<void>;

#### $next
In the next cycle, use requestAnimationFrame
> $next():Promise<void>;

#### $step
Dynamically change property values in steps, often used in animation effects.
> $step(... args:(any|[ any,number])[]):any;
