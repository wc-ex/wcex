import { Scope } from "wcex";

type Icon = string | { icon: string, pkg: string, type: string, color: "" | {}; };
interface ITreeItem {
    title: string,
    icon?: string | Icon,
    actions?: [{ name: string, icon: Icon, }],
    child?: ITreeItem[]; // 有此参数则为节点
    el?:HTMLElement
}
export default class extends Scope {
    dev = <any>{};
    pkgs = <any[]>[];
    ob = "";
    wctree = [] as ITreeItem[];
    onCreate() {

        // debugger;
        this.buildWcTree(document.body, this.wctree);
        // debugger;
    }
    onReady() {
        try {
            this.dev = JSON.parse(localStorage.getItem("__DEV") || "{}");
        } catch (e) { }
        if (!this.dev.pkgs) this.dev.pkgs = {};
        this.pkgs = Object.keys(WCEX.modules).sort();
        this.pkgs.forEach((p) => {
            if (!this.dev.pkgs[p]) {
                this.dev.pkgs[p] = {};
            }
        });

        this.$watch(
            () => this.$json(this.dev),
            () => {
                localStorage.setItem("__DEV", JSON.stringify(this.dev));
            }
        );
    }

    deepChildEl(parent: HTMLElement | ShadowRoot, callback: (el: HTMLElement) => void) {
        for (let i = 0; i < parent.children.length; i++) {
            let el = <HTMLElement>parent.children.item(i);
            callback(el);
            this.deepChildEl(el, callback);
        }
    }
    buildWcTree(parent: HTMLElement | ShadowRoot, tree: ITreeItem[]) {
        this.deepChildEl(parent, (el) => {
            // 如果是wc元素，则遍历其shadowRoot
            if (el.shadowRoot) {
                let child = <ITreeItem[]>[];
                this.buildWcTree(el.shadowRoot, child);
                let item: ITreeItem = {el,
                     title: `<${el.tagName.toLowerCase()}>${child.length > 0 ? '[' + child.length + ']' : ''}`, child: child.length > 0 ? child : undefined };
                tree.push(item);
            }
        });
    }

}