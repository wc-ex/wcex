import { Scope } from "wcex";

type Icon = string | { icon: string, pkg: string, type: string, color: "" | {}; };
interface ITreeItem {
    title: string,
    icon?: string | Icon,
    actions?: [{ name: string, icon: Icon, }],
    child?: ITreeItem[]; // 有此参数则为节点
    el?:HTMLElement
}
interface Item{
    id:number,
    title:string,
    parentId:number, // 父ID
    childCount:number, // 子元素数量
    level:number, // 缩进级别
    hide:boolean, // 是否隐藏
    openChilds:boolean, // 是否展开子元素
}
export default class extends Scope {
    dev = <any>{};
    pkgs = <any[]>[];
    ob = "";
    wctree = [] as ITreeItem[];
    wcItems=[] as Item[];
    onCreate() {
        this.buildWcTree(document.body, this.wctree);
        this.buildWcItemsArray(document.body,-1,0);
    }
    onReady() {
        try {
            this.dev = JSON.parse(localStorage.getItem("__DEV") || "{}");
        } catch (e) { }
        if (!this.dev.pkgs) this.dev.pkgs = {};
        // 整理预制软件包
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
    buildWcItemsArray(parent: HTMLElement | ShadowRoot,parentId:number,level:number) {

        this.deepChildEl(parent, (el) => {
            if(el.shadowRoot){
                let id = this.wcItems.length;
                // 首先添加自己
                let item:Item={
                    id:this.wcItems.length,
                    title:`<${el.tagName.toLowerCase()}>`,
                    parentId,
                    level:level,
                    hide:false,
                    childCount:0,
                    openChilds:true,
                }
                if(parentId>=0){
                    this.wcItems[parentId].childCount++;
                }

                // 如果是wc元素，则遍历其shadowRoot
                this.wcItems.push(item);
                this.buildWcItemsArray(el.shadowRoot,id,level+1);
            }
        })
    }
    switchHideChild(parentId:number,){
        this.$log("switchHideChild",parentId)
        this.wcItems[parentId].openChilds = ! this.wcItems[parentId].openChilds;

        function hideChilds(items:Item[],parentId:number,hide:boolean){
            for(let i=0;i<items.length;i++){
                if(items[i].parentId===parentId){
                    items[i].hide=hide;
                    hideChilds(items,items[i].id,hide);
                }
            }
        }

        hideChilds(this.wcItems,parentId,!this.wcItems[parentId].openChilds);        
    }
    buildWcTree(parent: HTMLElement | ShadowRoot, tree: ITreeItem[]) {
        this.deepChildEl(parent, (el) => {
            // 如果是wc元素，则遍历其shadowRoot
            if (el.shadowRoot) {
                let child = <ITreeItem[]>[];
                this.buildWcTree(el.shadowRoot, child);
                let item: ITreeItem = {el,
                     title: `<${el.tagName.toLowerCase()}>`, child: child.length > 0 ? child : undefined };
                tree.push(item);
            }
        });
    }

}