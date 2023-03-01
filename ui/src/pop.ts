import { Scope } from "wcex";

// 弹出框,弹出框直接位于 body,fullscreen时 绝对定位
console.log("-->>>> $POP   ");
interface IPopOptions {
  attrs?: { [k: string]: string };
}



class Pop {
    constructor(private _tagOrEl: string | HTMLElement, private _options?: IPopOptions) {}
  }
  WC.usePlugins({
    name: "$pop",
    scope: {
      $pop(tagOrEl: string | HTMLElement,fullscreen?:boolean, options?: IPopOptions) {
        console.log("-->>>> $POP   ");
        if (tagOrEl instanceof HTMLElement) {
          (tagOrEl as any).__pop = new Pop(tagOrEl, options);
        } else if (typeof tagOrEl == "string") {
          let el = document.createElement(tagOrEl);
          (el as any).__pop = new Pop(tagOrEl, options);
        }
      },
    },
  });

  export default class extends Scope{

  } 

  
