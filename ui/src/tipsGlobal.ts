import { Scope } from "wcex";

export const TIPS_EVENT = 'tips-global';

export default class extends Scope {
    curTips = null as HTMLElement | null;
    x = 0;
    y = 0;
    state = 0 as 0 | 1 | 2;// 三个状态，分别为0-隐藏,1-准备显示,2-完成显示

    onTipsListener = ((ev: Event) => {
        let detail = (ev as CustomEvent).detail as { isShow: boolean, el: HTMLElement; };
        this.$log('-- tips-global :', detail);
        if (detail.isShow) {
            // 判断是否有其他正在显示的TIPS
            if (this.curTips) {
                this.moveNodes(this.$id.pop, this.curTips);
                this.curTips = null;
            }
            // 显示内容
            this.curTips = detail.el;
            this.moveNodes(this.curTips, this.$id.pop);
            this.show();

        } else {
            // 还原内容,需要判断是否原有tips
            if (this.curTips == detail.el) {
                this.hide();
                setTimeout(() => {
                    if (this.curTips == detail.el) {
                        this.moveNodes(this.$id.pop, this.curTips);
                        this.curTips = null;
                    }
                });
            }
        }
    }).bind(this);


    mouse = { x: 0, y: 0 };
    onMouseMoveListener = ((ev: MouseEvent) => {
        this.mouse = { x: ev.x, y: ev.y };
        if (this.state) {
            // 根据鼠标计算位置
            this.calcMouse();
        }
    }).bind(this);

    calcMouse() {
        let w = this.$root.offsetWidth;
        let h = this.$root.offsetHeight;
        let isTop = (this.mouse.y < window.innerHeight / 2);
        let isLeft = (this.mouse.x < window.innerWidth / 2);
        this.x = isLeft ? this.mouse.x + 16 : this.mouse.x - w - 4;
        this.y = isTop ? this.mouse.y + 16 : this.mouse.y - h - 4;
    }

    override onReady(): void {
        // 注册全局事件
        window.addEventListener(TIPS_EVENT, this.onTipsListener);
        window.addEventListener('mousemove', this.onMouseMoveListener);
        // window.addEventListener();
    }
    override onDestroy(): void {
        this.$log('onDestroy()');
        window.removeEventListener(TIPS_EVENT, this.onTipsListener);
        window.removeEventListener('mousemove', this.onMouseMoveListener);
    }

    moveNodes(from: Element, to: Element) {
        let nodes = [] as Node[];
        for (let i = 0; i < from.childNodes.length; i++) {
            nodes.push(from.childNodes.item(i));
        }
        nodes.forEach(n => {
            to.append(n);
        });
    }

    show() {
        this.state = 1;
        this.calcMouse();
        setTimeout(() => {
            if (this.state == 1) {
                this.calcMouse();
                setTimeout(() => {
                    this.$root.style.visibility = "visible";
                    this.state = 2;
                }, 50);
            }
        }, 50);
    }
    hide() {
        this.$root.style.visibility = 'hidden';
        this.state = 0;
    }
}