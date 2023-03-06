import { Scope } from "wcex";
import { ScopedElement } from "wcex/types/plugins/IPlugins";

// 弹出框,弹出框直接位于 body,fullscreen时 绝对定位
console.log("-->>>> $POP   ");
interface ISideOptions {
  // 属性
  attrs?: { [k: string]: string };
  //弹出位置
  pos?: "t" | "b" | "l" | "r";
  // 框大小
  size?: string;
  autoclose?:boolean;
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
  size = "12em";
  pos = "r";
  sty = {} as { color?: any };
  autoclose = true;
  constructor() {
    super();
  }

  onReady(): void {
    this.uiRootEl = (this.$rootElem as any).$scope.$rootElem as HTMLElement;
    popInstance = this;
  }
  open(tagOrEl: string | HTMLElement, options?: ISideOptions) {
    this.close();
    this.size = options?.size || "12em";
    this.pos = options?.pos || "r";
    this.autoclose = (options?.autoclose === false )?false:true;
    let target = tagOrEl instanceof HTMLElement ? tagOrEl : document.createElement(tagOrEl);

    // 下个周期插入元素,
    requestAnimationFrame(() => {
      if (options?.attrs) {
        for (let k of Object.keys(options.attrs)) {
          let v = options.attrs[k];
          target.setAttribute(k, v);
        }
      }
      this.$id.side.appendChild(target);
      this.el = target;
      this.show = true;
      this.$emit("blur-bg", true);
    });
    let closeListener = (ev:Event)=>{
        if(ev.target == target){
            this.hide();
            // 移除监听
            target.removeEventListener('close',closeListener);
        }
    }
    // 监听 close 事件
    target.addEventListener('close',closeListener)
    return target;
  }
  hide() {
    this.show = false;
    this.$emit("blur-bg", false);
  }
  close() {
    if (this.el) {
      this.el.remove();
      this.el = undefined;
    }
    this.show = false;
  }
}
