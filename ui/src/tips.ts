import { Scope } from 'wcex';
import { TIPS_EVENT } from './tipsGlobal';
const TIMEOUT = 800;


export default class extends Scope {
  hoverFlag = -1;

  eventsListener = ((ev: Event) => {
    if (ev.type == 'mouseenter') {
      this.hoverFlag = 0;
      setTimeout(() => {
        if (this.hoverFlag == 0) {
          this.hoverFlag = 1;
          window.dispatchEvent(new CustomEvent(TIPS_EVENT, { detail: { isShow: true, el: this.$rootElem } }));
        }
      }, TIMEOUT);
    } else if (ev.type == 'mouseleave') {
      // if (this.hoverFlag == 1) {
      window.dispatchEvent(new CustomEvent(TIPS_EVENT, { detail: { isShow: false, el: this.$rootElem } }));
      // }
      this.hoverFlag = -1;
    }
    else if (ev.type == 'mousemove') {
      // 检测是否超出元素范围
      let rt = this.$parent.getBoundingClientRect();
      if (ev instanceof MouseEvent) {
        if (!(ev.x > rt.left && ev.x < rt.right && ev.y > rt.top && ev.y < rt.bottom)) {
          if (this.hoverFlag == 1) {
            window.dispatchEvent(new CustomEvent(TIPS_EVENT, { detail: { isShow: false, el: this.$rootElem } }));
          }
          this.hoverFlag = -1;
        }
      }
    }
    ev.preventDefault();
  }).bind(this);

  onReady(): void {
    this.$parent.addEventListener('mouseenter', this.eventsListener);
    this.$parent.addEventListener('mouseleave', this.eventsListener);
    this.$parent.addEventListener('mousemove', this.eventsListener);
  }
  onDestroy(): void {
    this.$parent.removeEventListener('mouseenter', this.eventsListener);
    this.$parent.removeEventListener('mouseleave', this.eventsListener);
    this.$parent.removeEventListener('mousemove', this.eventsListener);
  }
}
