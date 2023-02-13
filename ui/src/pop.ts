import { Scope, usePlugins, Logger } from 'wcex';

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
  trans = '';
  width = 0;
  maxWidth = 0;
  color: any;
  focus = false;
  hover = false;
  contextmenu = false;
  vert = false;
  targetElem = null as any as HTMLElement;
  targetPos = false;// 弹出时是否引用目标对象的绝对位置
  selfEnter = false;


  eventsListener = ((ev: Event) => {
    this.$log("ev--->", ev.type, ev.target);
    switch (ev.type) {
      case 'focus':
        this.open = true;
        this.calcPop();
        this.$emit('change');
        break;
      case 'blur':
        this.open = false;
        this.calcPop();
        this.$emit('change');
        break;
      case 'contextmenu':
        this.open = true;
        this.calcPop();
        this.$emit('change');
        break;
      case 'mouseenter':
        // 处理hover事件
        this.open = true;
        this.calcPop();
        this.$emit('change');
        break;
      case 'mouseleave':
        this.open = false;
        this.calcPop();
        this.$emit('change');
        break;
    }
  }).bind(this);


  hoverModeListener = ((ev: Event) => {
    // 处理hover事件
    switch (ev.type) {
      case 'mouseenter':
        if (ev.target == this.$rootElem) {
          this.$log("hoverModeListener self enter", ev.type);
          // 自身
          this.selfEnter = true;
        } else if (ev.target == this.targetElem) {
          this.$log("hoverModeListener target enter", ev.type);
          // 目标
          this.selfEnter = false;
          this.open = true;
          this.calcPop();
          this.$emit('change');
        }
        break;
      case 'mouseleave':
        if (ev.target == this.$rootElem) {
          this.$log("hoverModeListener self leave", ev.type);

          // 自身
          this.selfEnter = false;
          this.open = false;
          this.calcPop();
          this.$emit('change');

        } else if (ev.target == this.targetElem) {
          this.$log("hoverModeListener target leave", ev.type);
          // 目标移出，延时50ms后判断
          setTimeout(() => {
            if (!this.selfEnter) {
              // 当不在自身移出时关闭
              this.open = false;
              this.calcPop();
              this.$emit('change');
            }
          }, 50);
        }
        break;
    }
  }).bind(this);


  // 自动计算传入的color参数, 转换
  usedColor() {
    return (typeof this.color == 'string') ? (this.$color[this.color] || this.$color.pri) : this.color;
  }

  onReady(): void {
    // if (this.$parent.tagName.match(/SUBMENU/)) debugger;
    this.$log("--!!! targetElem", this.targetElem, this.$parent.tagName, this.$rootElem);
    if (!this.targetElem) this.targetElem = this.$parent;


    if (this.contextmenu) {
      this.targetElem.addEventListener('contextmenu', this.eventsListener);
    } else if (this.focus) {
      this.targetElem.addEventListener('focus', this.eventsListener);
      this.targetElem.addEventListener('blur', this.eventsListener);
    } else if (this.hover) {
      this.targetElem.addEventListener('mouseenter', this.hoverModeListener);
      this.targetElem.addEventListener('mouseleave', this.hoverModeListener);
      this.$rootElem.addEventListener('mouseenter', this.hoverModeListener);
      this.$rootElem.addEventListener('mouseleave', this.hoverModeListener);
    }

    this.calcDir();
    setTimeout(() => {
      this.calcPop();
    }, 50);
  }
  onDestroy(): void {
    if (this.contextmenu) {
      this.targetElem.removeEventListener('contextmenu', this.eventsListener);
    } else if (this.focus) {
      this.targetElem.removeEventListener('focus', this.eventsListener);
      this.targetElem.removeEventListener('blur', this.eventsListener);
    } else if (this.hover) {
      this.targetElem.removeEventListener('mouseenter', this.hoverModeListener);
      this.targetElem.removeEventListener('mouseleave', this.hoverModeListener);
      this.$rootElem.removeEventListener('mouseenter', this.hoverModeListener);
      this.$rootElem.removeEventListener('mouseleave', this.hoverModeListener);
    }
  }
  calcDir() {
    let targetRt = this.targetElem.getBoundingClientRect();
    // 计算弹出方向
    if (this.vert) {
      this.dir = targetRt.top < (window.innerHeight / 2) ? 'b' : 't';
    } else {
      this.dir = targetRt.left < (window.innerWidth / 2) ? 'r' : 'l';
    }
    this.$log("-- DIR--", this.dir);
    this.$emit('change');

  }

  // 计算弹出窗口位置
  calcPop() {
    // 计算移动位置
    let selfRt = this.$id.pop.getBoundingClientRect();
    // 计算Host位置

    switch (this.dir) {
      case 'b':
        this.host.x = 0;
        this.host.y = this.targetElem.offsetHeight;
        break;
      case 't':
        this.host.x = 0;
        this.host.y = 1 - this.$rootElem.offsetHeight;
        break;
      case 'r':
        this.host.x = this.targetElem.offsetWidth;
        this.host.y = this.targetPos ? this.targetElem.offsetTop : 0;
        break;
      case 'l':
        this.host.x = 1 - selfRt.width;
        this.host.y = this.targetPos ? this.targetElem.offsetTop : 0;
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

  }
}
