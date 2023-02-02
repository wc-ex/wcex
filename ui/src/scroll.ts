import { Scope } from 'wcex';
// 全局初始化执行一次
window.addEventListener('mouseenter', () => {
  document.body.style.pointerEvents = '';
});

export default class extends Scope {
  rootArea = { x: 0, y: 0, w: 0, h: 0 }; // 滚动区信息
  scArea = { x: 0, y: 0, w: 0, h: 0 }; // 滚动区信息
  hTracker = { len: 0, pos: 0, scale: 0 }; //水平滚动条数据
  vTracker = { len: 0, pos: 0, scale: 0 }; //垂直滚动条数据

  drag: any;
  mouse = { x: 0, y: 0 };
  x = false;
  y = false;

  dragStart = { x: 0, y: 0 };
  dragging = false;
  predragging = false;
  active = false;

  _mouseMoveHandle: any;
  _touchMoveHandle: any;
  _mouseUpHandle: any;
  _mouseEnterHandle: any;
  _dragDir = false;
  _dragX = false;
  _dragY = false;
  _lastMouse = undefined as { x: number; y: number } | undefined;

  onReady() {
    this.updateSize();
    // === window 添加 鼠标移动
    this._mouseMoveHandle = (ev: MouseEvent) => {
      this.onMouseMove(ev.x, ev.y);
    };
    window.addEventListener('mousemove', this._mouseMoveHandle);
    // === window 添加 触摸移动
    this._touchMoveHandle = (ev: TouchEvent) => {
      let touches = ev.changedTouches;
      if (touches.length == 1) {
        this.onMouseMove(touches[0].pageX, touches[0].pageY);
      }
      ev.preventDefault();
    };
    window.addEventListener('touchmove', this._touchMoveHandle, { passive: true });
    // === 鼠标抬起
    this._mouseUpHandle = (ev: MouseEvent) => {
      this.leaveDrag();
    };
    window.addEventListener('mouseup', this._mouseUpHandle);
  }

  enterDrag(ev: Event, dir: boolean, x: boolean, y: boolean) {
    if (this.hTracker.scale < 0 && this.vTracker.scale < 0) return;
    if (!this.drag) {
      if (!(ev.target == this.$root || ev.target == this.$id.vtracker || ev.target == this.$id.htracker)) return;
    }

    // console.log('---enterDrag:', this.vTracker.scale);

    this.predragging = true;
    setTimeout(() => {
      // 拖动检测
      if (this.predragging) {
        console.log('--!! DRAGING');
        this.dragging = true;
        this._dragDir = dir;
        this._dragX = x;
        this._dragY = y;
        document.body.style.pointerEvents = 'none';
        document.body.style.userSelect = 'none';
        document.body.parentElement!.style.cursor = 'grabbing';
      }
    }, 200);
  }
  leaveDrag() {
    this.dragging = false;
    this.predragging = false;
    this.dragStart = { x: 0, y: 0 };
    document.body.style.userSelect = '';
    document.body.parentElement!.style.cursor = '';
    document.body.style.pointerEvents = '';
    this._lastMouse = undefined;
  }
  onDestory() {
    this.leaveDrag();
    window.removeEventListener('mousemove', this._mouseMoveHandle);
    window.removeEventListener('mouseup', this._mouseMoveHandle);
    window.removeEventListener('mouseenter', this._mouseMoveHandle);
  }

  onScroll(ev: Event) {
    let r = this.$id.area;

    this.scArea = {
      x: Math.round(r.scrollLeft),
      y: Math.round(r.scrollTop),
      w: Math.round(r.scrollWidth),
      h: Math.round(r.scrollHeight),
    };
    this.updatePos();
  }

  // 当区域大小发生改变或者变更时，更新区域信息和滚动条大小
  updateSize() {
    let r = this.$id.area;
    this.scArea = {
      x: Math.round(r.scrollLeft),
      y: Math.round(r.scrollTop),
      w: Math.round(r.scrollWidth),
      h: Math.round(r.scrollHeight),
    };
    let rtRoot = this.$root.getBoundingClientRect();
    this.rootArea = {
      x: Math.round(rtRoot.x),
      y: Math.round(rtRoot.y),
      w: Math.round(rtRoot.width),
      h: Math.round(rtRoot.height),
    };

    // 更新vTrack大小
    let vlen = (this.rootArea.h * this.rootArea.h) / this.scArea.h;
    if (vlen < 50) vlen = 50;
    if (vlen > this.rootArea.h / 2) vlen = this.rootArea.h / 2;
    this.vTracker.len = Math.round(vlen);
    this.vTracker.scale =
      this.scArea.h > this.rootArea.h ? (this.rootArea.h - this.vTracker.len) / (this.scArea.h - this.rootArea.h) : -1;

    // 更新hTrack大小
    let hlen = (this.rootArea.w * this.rootArea.w) / this.scArea.w;
    if (hlen < 50) hlen = 50;
    if (hlen > this.rootArea.w / 2) hlen = this.rootArea.w / 2;
    this.hTracker.len = Math.round(hlen);
    this.hTracker.scale =
      this.scArea.w > this.rootArea.w ? (this.rootArea.w - this.hTracker.len) / (this.scArea.w - this.rootArea.w) : -1;

    // console.log('--update size:', this.vTracker);
    this.updatePos();
  }

  updatePos() {
    // 更新位置
    this.hTracker.pos = Math.round(this.scArea.x * this.hTracker.scale);
    this.vTracker.pos = Math.round(this.scArea.y * this.vTracker.scale);
  }

  onWheel(ev: WheelEvent) {
    this.$log('-- onWheel');

    this.$id.area.scrollBy(this.x ? ev.deltaX : 0, this.y ? ev.deltaY : 0);
  }

  onMouseMove(mx: number, my: number) {
    if (this.dragging && this._lastMouse) {
      let deltaX = mx - this._lastMouse.x;
      let deltaY = my - this._lastMouse.y;
      if (this._dragDir) {
        deltaX = -deltaX;
        deltaY = -deltaY;
      }
      if (!this._dragX) deltaX = 0;
      if (!this._dragY) deltaY = 0;

      this.$id.area.scrollBy(deltaX, deltaY);
    }
    this._lastMouse = { x: mx, y: my };
  }
}
