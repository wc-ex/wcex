import { Logger, Scope, usePlugins } from "wcex";

const log = Logger('pop');
// 初始化创建 pop 弹出窗全局容器

export const popOptions = {
  globalEl: null as any as HTMLElement
};

type IPopElem = HTMLElement & { popData: _PopData; };

class _PopData {
  popEl: HTMLElement;
  parentEl: HTMLElement | null;
  prevNode: ChildNode | null;
  stat = 'closed' as "closed" | 'pop' | 'preclose';
  aniStatus = 'stop' as 'running' | 'stop';
  CLOSE_TIMEOUT = 1000;
  constructor(targeiEl: HTMLElement | string) {
    this.popEl = ((targeiEl instanceof Element) ? targeiEl : document.createElement(targeiEl));
    this.parentEl = this.popEl.parentElement;
    this.prevNode = this.popEl.previousSibling;
    this._initListeners();
  }

  private _removePopEl() {
    if (this.prevNode) {
      this.prevNode.after(this.popEl);
      log.debug("$pop close after", this.popEl);
    } else if (this.parentEl) {
      this.parentEl.appendChild(this.popEl);
      log.debug("$pop close parent", this.popEl);
    } else {
      this.popEl.remove();
      log.debug("$pop close remove", this.popEl);
    }
  }

  _initListeners() {
    this.popEl.addEventListener('close', () => {
      log.debug('close event');
      if (this.stat == 'pop') this.stat = 'preclose';
      // 关闭弹出框，如果当前在动画状态，则等待动画完成或者超时（500ms最长）后关闭
      let startTm = new Date().getTime();
      let _checkClose = () => {

        if (this.stat == 'preclose') {
          if (this.aniStatus == 'stop') {
            // 关闭元素
            this.stat = 'closed';
            this._removePopEl();
          } else if ((new Date().getTime() - startTm) > this.CLOSE_TIMEOUT) {
            // 动画超时强制关闭 
            this.stat = 'closed';
            this._removePopEl();
          } else {
            // 下一帧继续关闭状态检测超时
            setTimeout(_checkClose, 50);
          }
        } else {
          // 检测关闭被中断，可能新发送一个 $pop事件
          log.warn('$pop chose interrupted, stat=', this.stat);
        }
      };
      // 等待50毫秒，检测关闭
      setTimeout(_checkClose, 50);
    });

    this.popEl.addEventListener('ani', (ev) => {
      this.aniStatus = (ev as CustomEvent).detail ? 'running' : 'stop';
    });
  }
}

/**
 * 弹出指定元素或者创建新的元素
 * 关闭弹窗时等待动画结束
 */
function _pop(target: HTMLElement | string, ev?: Event) {
  if (!popOptions.globalEl) return;
  let el = ((target instanceof Element) ? target : document.createElement(target)) as IPopElem;
  if (!el.popData) {
    // 初始化pop数据
    el.popData = new _PopData(target);
  }

  if (el.parentElement != popOptions.globalEl) {
    popOptions.globalEl.appendChild(el);
  }
  el.popData.stat = 'pop';  
  // 下个周期发送pop事件
  setTimeout(() => {
    el.dispatchEvent(new CustomEvent('pop', { detail: { ev } }));
  });

}

usePlugins({
  name: '$pop',
  priority: 0,
  scope: {
    $pop: _pop
  },
});
log.debug("using plugins $pop");


// 注册插件函数 $pop
export default class extends Scope {
  dir = '' as 'b' | 't' | 'l' | 'r'; // 弹出方向
  open = false;
  host = {
    x: 0,
    y: 0
  };
  popPos = {
    left: '0',
    top: '0'
  };
  width = 0;
  maxWidth = 0;
  color: any;
  vert = false;

  onReady(): void {
    this.calcDir();
    setTimeout(() => {
      this.calcPop();
    }, 50);

    this.$watch(() => this.open, () => {
      this.calcPop();
    });
  }

  onDestroy(): void {

  }
  calcDir() {
    let rt = this.$rootElem.getBoundingClientRect();
    // 计算弹出方向
    if (this.vert) {
      this.dir = rt.top < (window.innerHeight / 2) ? 'b' : 't';
    } else {
      this.dir = rt.left < (window.innerWidth / 2) ? 'r' : 'l';
    }
    this.$log("-- DIR--", this.dir);
    this.$emit('change');
  }

  // 计算弹出窗口位置
  calcPop() {
    // 计算移动位置
    let selfRt = this.$rootElem.getBoundingClientRect();
    // 计算Host位置

    switch (this.dir) {
      case 'b':
        this.host.x = 0;
        // this.host.y = this.targetElem.offsetHeight;
        break;
      case 't':
        this.host.x = 0;
        this.host.y = 1 - this.$rootElem.offsetHeight;
        break;
      case 'r':
        this.host.x = this.$parent.offsetWidth;
        this.host.y = 0;
        this.$log("--!!!!! parent", this.$parent, this.$parent.offsetWidth);
        break;
      case 'l':
        // this.host.x = 1 - selfRt.width;
        // this.host.y = this.targetPos ? this.targetElem.offsetTop : 0;
        break;
    }

    switch (this.dir) {
      case 'b':
        this.popPos.left = '0';
        this.popPos.top = this.open ? '0' : `${-this.$rootElem.offsetHeight}px`;
        break;
      case 't':
        this.popPos.left = '0';
        this.popPos.top = this.open ? '0' : `${selfRt.height}px`;

        break;
      case 'l':
        this.popPos.left = this.open ? '0' : `${selfRt.width}px`;
        this.popPos.top = '0';
        break;
      case 'r':
        this.popPos.left = this.open ? '0' : `${-selfRt.width}px`;
        this.popPos.top = '0';
        break;
    }

    this.$log("calcPos11", this.dir, this.popPos);

  }
}
