import { Scope } from "wcex";

export default class extends Scope {
    language = '';
    file = '';

    async updateEditor(){
        let frame = this.$id.frame as HTMLIFrameElement;
        if (this.file) {
            let m = this.file.match(/^.*\.(\w+)$/); // 获取扩展名
            if (m && m.length == 2) {
                let lang = { js: 'javascript' ,html:'html',css:'css',svg:'svg',ts:'typescript',json:'json'}[m[1]];
                if (lang) {
                    // 设置编辑器
                    let html = await (await fetch(this.$path('./monaco_frame.html'))).text();
                    let text = await (await fetch(this.file)).text();
                    frame.srcdoc = html.replace(/\$([\w]+)\((.*?)\)/g, (s, method, arg) => {
                        switch (method) {
                            case 'path':
                                return this.$path(arg);
                            case 'colorMode':
                                return this.$Colors.mode ? 'vs' : 'vs-dark';
                            case 'language':
                                return lang!;
                            case 'text':
                                return encodeURI(text);
                            default: return s;
                        }
                    }).replace('\r\n', '\n');
                }
            }
        }
    }

    async onReady() {
        this.updateEditor()
        this.$watch(() => this.file, () => {
            this.updateEditor()  
        });

        this.$watch(() => this.$color.pri, () => {
            let frame = this.$id.frame as HTMLIFrameElement;
            frame.contentWindow?.postMessage({ type: 'color', value: this.$Colors.mode ? 'vs' : 'vs-dark' }, "*");
        });
    }
    layout(){
        let frame = this.$id.frame as HTMLIFrameElement;
        frame.contentWindow?.postMessage({ type: 'layout', value: ''}, "*");
    }
    reload(){
        this.updateEditor()
    }

}