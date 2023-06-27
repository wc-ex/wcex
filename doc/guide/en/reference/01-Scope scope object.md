<!--DESC: {icon:{name:"explore",pkg:"mdi",type:"filled"},id:1} -->

## Scope scope object
Scope scopes contain data, objects, and methods that can be used directly in binding template scripts and events.


### Scope references are related to HTML elements

#### $root
Points to the current WebComponent root scope object

#### $rootElem
Points to the current WebComponent root element, type HTMLElement object.

#### rootParentElem
Point to the parent element of the current **WebComponent** root element, it should be noted that if the current component root element does not have a parent element (such as a first-level tag located in another component, then use parentElement in HTML, get null, but the actual parentNode points to shadowRoot), then using rootParentElem will return the parent component of the actual current component, type HTMLElement object. Using this object will make it easy to get the data and methods of the parent component.


#### $parent
Point to the parent scope object of the current element, note that the $parent here does not point to the parent element, but gets the scope of the parent element that has the most recent dynamic tag with scope.

#### $id
  Provides a direct reference to an id element in the template of type an HTMLElement object.
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

### Data is related to events

#### $emit
Send custom or standard events
- $emit(nameOrEvent: string | Event, detailOrtoElem?: Element | any, toElem?: Element): void;
#### $watch
Monitor changes in a function or expression, and trigger callbacks when they change

#### $noWatch
Prevent the change monitoring of an object, which is often used for some objects that do not need to be monitored, such as system objects


### Route related

#### $go
Route jumping, which supports multiple ways, is a shortcut reference to the $router.go() method.
Area is a partition route, and the default is "default"

#### $router
Route objects, which provide route-related methods and attributes, refer to the Routing chapter
Common methods:
- go(tag,arrts:{}) or go(area,tag,attrs:{})
- parseLocation() resolves the current route
- back() returns to the previous level



### Tool class object
#### $log 
Output standard log, which is used in the same way as the console .log, but displays colored component names and line numbers in the console for easy debugging. Support for simplified calls $log(...) args), equivalent to $log.log(...) args)

#### $path()
Get the actual path related to the dynamic component, if an image is referenced in the component, the path of this image will be relative to the path of the component, not the path of the current page, and the correct path can be obtained by using $path.
- Support for "./" relative to the current component path
- Support "@/" relative npm package path

#### $color
Semantic dynamic color matching objects, common semantic colors: $color.pri, $color.pria, $color.sec, $color.seca, $color.text, $color.textr, $color.bg, $color.bgr, $color.ok, $color.warn, $color.info, $color.error, etc.
Support HSL-based color decorators, such as $color.pri.l3.s5.h2_.a6, etc., can be called continuously, refer to the chapter on color matching for details

#### $Colors
Manage and dynamically load color tables

#### $json
Formatting displays $json data, a simplified call to JSON.stringify, and support dynamic change detection

#### $delay
You can specify the next cycle of the implementation, using setTimeout implementation
> $delay(ms:number):Promise<void>;

#### $next
The next cycle is implemented using requestAnimationFrame
> $next():Promise<void>;

#### $step
Dynamically change property values step by step, often used for animation effects.
> $step(... args:(any|[any,number]) []):any;
