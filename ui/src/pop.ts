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

let popInstance = undefined as Pop | undefined;

WC.usePlugins({
  name: "$pop",
  scope: {
    // 创建一个边缘窗口，任何外部点击将导致关闭
  },
});

class Side {
  el = undefined as HTMLElement | undefined;
  show = false;
  uiRootEl = undefined as HTMLElement | undefined;
  size='12em';
  pos='r';
  opt={} as ISideOptions;
  constructor(private scope: InstanceType<typeof Scope>) {
    this.uiRootEl = (this.scope.$rootElem as any).$scope.$rootElem as HTMLElement;
  }

  open(tagOrEl: string | HTMLElement, options?: ISideOptions) {
    this.close();
    this.size = options?.size||'12em';
    this.pos = options?.pos || 'r';

    let target = tagOrEl instanceof HTMLElement ? tagOrEl : document.createElement(tagOrEl);
    if(options?.attrs){
      for(let k of Object.keys(options.attrs)){
        let v = options.attrs[k];
        target.setAttribute(k,v);
      }
    }

    this.scope.$id.side.appendChild(target);
    this.el = target;
    this.show = true;
    this.uiRootEl?.classList.add("pop-bg");
  }
  hide() {
    this.show = false;
    this.uiRootEl?.classList.remove("pop-bg");
  }
  close() {
    if (this.el) {
      this.el.remove();
      this.el = undefined;
    }
  }
}

class Pop extends Scope {
  side = {} as Side;
  onReady(): void {
    popInstance = this;
    this.side = new Side(this);
  }
}

export default Pop;
