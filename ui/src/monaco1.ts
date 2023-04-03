import { Scope } from "wcex";

class MonacoFrames {
    _free = [] as HTMLIFrameElement[];
    _nums = 0;
    _htmlSrc = "";
    _monacoFramesEl: HTMLElement;

    constructor(private frameHtml: string) {
        // 初始化创建隐藏元素用于加载monaco
        let el = document.createElement('div');
        el.id = 'monaco-frames';
        // el.style.display = "none";
        document.body.appendChild(el);
        this._monacoFramesEl = el;
    }
    async get() {
        // 初始化加载 monaco frame 数据
        if (!this._htmlSrc) {
            let html = await (await fetch(this.frameHtml)).text();
            this._htmlSrc = URL.createObjectURL(new Blob([html], { type: "text/html" }));
        }

        if (this._free.length > 0) {
            return this._free.pop()!;
        }
        console.warn('create monaco frame');

        this._nums++;
        // 新建实例
        let frame = document.createElement("iframe");
        this._monacoFramesEl.appendChild(frame);
        await new Promise((res) => {
            frame.src = this._htmlSrc ;
            // frame.src = this._htmlSrc + `#${encodeURI(WCEX.npmUrl)}`;
            // 等待frame加载完毕
            frame.addEventListener('monaco-init', () => {
                console.warn('monaco frame inited', this._nums);
                res({});
            });
        });
        return frame;
    }
    free(frame: HTMLIFrameElement) {
        if (this._free.indexOf(frame) >= 0) throw Error("FREE MONACO FRAME Failed");
        this._free.push(frame);
        this._monacoFramesEl.appendChild(frame);
    }
}
declare global {

    interface Window {
        MONACO_FRAMES: MonacoFrames;

    }
}
export default class extends Scope {
    _frame?: HTMLIFrameElement;

    async onReady() {
        this.initMonaco();
        this._frame = await window.MONACO_FRAMES.get();
        // this._frame.remove()
        setTimeout(()=>{

            this.$id.editor.appendChild(this._frame!);
            console.log("MONACO_FRAMES GET 1:", window.MONACO_FRAMES._nums);    
        },100)

        // 通知frame打开编辑器
        // 加载文件内容

    }
    onDestroy() {
        if (this._frame) window.MONACO_FRAMES.free(this._frame);
        console.log("MONACO_FRAMES FREE1:", window.MONACO_FRAMES._nums);    
    }


    initMonaco() {
        if (!window.MONACO_FRAMES) {
            window.MONACO_FRAMES = new MonacoFrames(this.$path("./monaco1_frame.html"));
        }
    }
};