import { Scope } from "wcex";

function _isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

interface TriggerListeners {
  onShowDevPanel: () => void;
  onShowElementInfo: (el: Element) => void;
}

// 触发器定义
interface ITrigger {
  init(listeners: TriggerListeners): void;
}

class PcTrigger implements ITrigger {
  init(listeners: TriggerListeners) {
    console.log("PC Trigger Inited");
    // 注册触发器
    window.addEventListener("mousemove", (ev) => {
      // console.log("PC Trigger Mousemove");
    });
  }
}

// 实现用于移动模式的触发器
class MobileTrigger implements ITrigger {
  init(listeners: TriggerListeners) {
    console.log("Mobile Trigger Inited");
    // 注册触发器
    window.addEventListener("touchstart", (ev) => {
      // console.log("Mobile Trigger Touchstart:", ev.touches.length);
      if (ev.touches.length == 5) listeners.onShowDevPanel();
    });
  }
}

export default class extends Scope {
  devConfig = undefined as { [key: string]: any } | undefined;
  sel = {} as { [key: string]: any };
  // showConfig = false;
  helpTags = null as { [key: string]: boolean } | null;
  helpPos = "l";
  _trigger = _isMobile() ? new MobileTrigger() : new PcTrigger();
  constructor() {
    super();
    // 初始化开发模式配置
    const __dev = localStorage.getItem("__DEV");
    if (__dev) {
      try {
        this.devConfig = JSON.parse(__dev);
        if(typeof this.devConfig != "object") this.devConfig = {};
      } catch (e) {
        this.devConfig = {};
      }
    }
  }
  onReady() {
    if (this.devConfig) {
      this._trigger.init({
        onShowDevPanel: () => {
          this.$rootElem.focus();
          this.$emit("update",this.$id.panel);
        },
        onShowElementInfo: (el) => {},
      });
      this.initDev();
    }
  }
  // 全局监控鼠标
  findWcElFromPoint(x: number, y: number) {
    let el = document.elementFromPoint(x, y);
    let wcel;
    while (el?.shadowRoot) {
      if (el?.shadowRoot) wcel = el;
      // let rect = el.getBoundingClientRect();
      let findEl = el.shadowRoot.elementFromPoint(x, y);
      if (findEl == el) break;
      else el = findEl;
    }
    return wcel;
  }

  findParentWcDeep(el: Element, callback: (el: Element) => void) {
    let parent = <any>(
      (el.parentNode instanceof ShadowRoot ? el.parentNode.host : el.parentNode)
    );
    if (!parent) return;

    if (parent.rootScope) callback(parent);
    this.findParentWcDeep(parent, callback);
  }

  findShadowChildWcDeep(
    el: Element & { shadowRoot: ShadowRoot },
    callback: (el: Element) => void
  ) {
    if (el.shadowRoot) {
      const items = el.shadowRoot.querySelectorAll("[wcid]");
      items?.forEach((ch) => {
        this.findShadowChildWcDeep(<any>ch, callback);
        callback(ch);
      });
    }
  }

  async initDev() {
    // 监控热键，调试弹窗
    window.addEventListener("keydown", (ev) => {
      if (
        (ev.ctrlKey || ev.altKey) &&
        (ev.code.toLowerCase() == "backquote" || ev.key == "`")
      ) {
        console.log("Dev Panel Opened");
        // this.showConfig = true;
        this.$next().then(() => {
          this.$rootElem.focus();
        });
      }
    });

    window.addEventListener("mousemove", (ev) => {
      if (ev.ctrlKey && ev.shiftKey) {
        // debugger;
        // 查找所有鼠标下面的元素，弹出按钮，点击显示组件说明
        let el = this.findWcElFromPoint(ev.clientX, ev.clientY);
        if (el) {
          let { width, height, left, top } = el.getBoundingClientRect();
          this.sel = {
            el,
            width,
            height,
            left,
            top,
            tag: el.tagName.toLowerCase(),
          };
        } else {
          this.sel = {};
        }
      } else this.sel = {};
    });
    window.addEventListener("contextmenu", (ev) => {
      if (ev.ctrlKey && ev.shiftKey) {
        ev.preventDefault();
        if (this.sel.el) {
          this.$log(this.sel.el.tagName, this.sel.el);

          // 查找关联组件
          let tags = {} as { [key: string]: boolean };
          tags[this.sel.el.tagName.toLowerCase()] = true;
          // tagSets.add(this.sel.el.tagName.toLowerCase());
          // this.$log("--!!! FIND",)

          //  递归查找父组件
          this.findParentWcDeep(this.sel.el, (el) => {
            let tagName = el.tagName.toLowerCase();
            if (!tags[tagName]) tags[tagName] = false;
          });
          // 查找自身子元素
          for (let el of this.sel.el.querySelectorAll("[wcid]")) {
            let tagName = el.tagName.toLowerCase();
            if (!tags[tagName]) tags[tagName] = false;
          }
          // 查找shadowRoot子元素
          this.findShadowChildWcDeep(this.sel.el, (el) => {
            let tagName = el.tagName.toLowerCase();
            if (!tags[tagName]) tags[tagName] = false;
          });

          // 显示组件帮助信息
          this.helpTags = tags;
          this.helpPos = ev.clientX > window.innerWidth / 2 ? "l" : "r";

          this.$next().then(() => {
            this.$rootElem.focus();
          });

          // this.$side("wcex-ui.dev-help", {
          //   color: this.$color.pri.l5,
          //   pos,
          //   size: "50vw",
          //   attrs: {
          //     tags: [...tagSets].join(" "),
          //     cur: this.sel.el.tagName.toLowerCase(),
          //   },
          //   autoclose: false,
          // });
          this.sel = {};
        }
      }
    });
    console.log("Dev Mode Opened");
  }
}
