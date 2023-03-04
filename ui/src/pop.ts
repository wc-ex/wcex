import { Scope } from "wcex";

// 弹出框,弹出框直接位于 body,fullscreen时 绝对定位
console.log("-->>>> $POP   ");
interface IPopOptions {
  // 属性
  attrs?: { [k: string]: string };
  //   弹出方向
  dir: "h" | "v";
  //弹出位置
  pos: "t" | "b" | "l" | "r" | "lt" | "rt" | "lb" | "rb" | HTMLElement;
  //  自动关闭超时
  // 使用背景特效，暗化和虚化
  bg: false;
}

let popInstance = undefined as Pop | undefined;

WC.usePlugins({
  name: "$pop",
  scope: {
    // 创建一个边缘窗口，任何外部点击将导致关闭
    $side(tagOrEl: string | HTMLElement, options?: IPopOptions) {
        popInstance?.side(tagOrEl,options)
    },
    $dlg(tagOrEl: string | HTMLElement, options?: IPopOptions) {
      console.log("-->>>> $POP   ");
    },

    // $pop(tagOrEl: string | HTMLElement,  options?: IPopOptions) {
    //   console.log("-->>>> $POP   ");
    //   if (tagOrEl instanceof HTMLElement) {
    //     (tagOrEl as any).__pop = new Pop(tagOrEl, options);
    //   } else if (typeof tagOrEl == "string") {
    //     let el = document.createElement(tagOrEl);
    //     (el as any).__pop = new Pop(tagOrEl, options);
    //   }
    // },
  },
});

class Pop extends Scope {

    vis=false;
  onReady(): void {
    popInstance = this;
  }

  side(tagOrEl: string | HTMLElement, options?: IPopOptions){
    let target = tagOrEl instanceof HTMLElement ? tagOrEl : document.createElement(tagOrEl);
    target.classList.add("side-r");
    (this.$rootElem as any).shadowRoot.appendChild(target);
    this.vis=true;
  }
}

export default Pop;
