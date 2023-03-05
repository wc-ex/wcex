import { Scope } from "wcex";
import { ScopedElement } from "wcex/types/plugins/IPlugins";

// 弹出框,弹出框直接位于 body,fullscreen时 绝对定位
console.log("-->>>> $POP   ");
interface ISideOptions {
  // 属性
  attrs?: { [k: string]: string };
  //弹出位置
  pos: "t" | "b" | "l" | "r" ;
  // 边缘框大小
  size:string;
}

let popInstance = undefined as Side | undefined;

WC.usePlugins({
  name: "$side",
  scope: {
    $side(tagOrEl: string | HTMLElement, options?: ISideOptions) {
        popInstance?.open(tagOrEl, options);
      },
  },
});

export default class Side extends Scope {
  el = undefined as HTMLElement | undefined;
  show = false;
  uiRootEl = undefined as HTMLElement | undefined;
  size='12em';
  pos='r';
  sty={} as {color?:any}
  constructor() {
    super();
  }

  onReady(): void {
    this.uiRootEl = (this.$rootElem as any).$scope.$rootElem as HTMLElement;
    popInstance = this;
  }
  open(tagOrEl: string | HTMLElement, options?: ISideOptions) {
    this.close();
    this.size = options?.size||'12em';
    this.pos = options?.pos || 'r';

    // 下个周期插入元素,
    requestAnimationFrame(()=>{
        let target = tagOrEl instanceof HTMLElement ? tagOrEl : document.createElement(tagOrEl);
        if(options?.attrs){
          for(let k of Object.keys(options.attrs)){
            let v = options.attrs[k];
            target.setAttribute(k,v);
          }
        }
        this.$id.side.appendChild(target);
        this.el = target;
        this.show = true;
        this.$emit('blur-bg',true)
    })

  }
  hide() {
    this.show = false;
    this.$emit('blur-bg',false)
  }
  close() {
    if (this.el) {
      this.el.remove();
      this.el = undefined;
    }
    this.show=false;
  }
}

