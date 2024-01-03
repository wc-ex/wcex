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
interface IDevConfig {
    pkgs?: { [key: string]: { [key: string]: any } };
}

export default class extends Scope {
    devConfig:IDevConfig = {};
    wctree = [] as ITreeItem[];
    wcItems=[] as Item[];
    onCreate() {
        this.buildWcTree(document.body, this.wctree);
        this.buildWcItemsArray(document.body,-1,0);
    }
    async onReady() {
        this.$log("--!!!onReady",this.wcItems.length)
        await this.loadModules()
       
        this.$watch(
            () => this.$json(this.devConfig),
            () => {
                localStorage.setItem("__DEV", JSON.stringify(this.devConfig));
            }
        );
    }
    
    async loadModules() {
        if (!this.devConfig.pkgs) this.devConfig.pkgs = {};
        // 整理预制软件包
        Object.keys(WCEX.modules).sort().forEach((p) => {
            if(!this.devConfig.pkgs) this.devConfig.pkgs = {};
            if (!this.devConfig.pkgs[p]) {
                this.devConfig.pkgs[p] = {};
            }
        });

        // 尝试请求根目录package.json，如存在则添加到预制软件包中
        try {
            let pathname = location.pathname.endsWith(".html")?location.pathname.replace(/[^\/]+$/,""):location.pathname;
            if(pathname.endsWith("/")) pathname = pathname.substr(0,pathname.length-1);
            let rootPkg = await (await fetch(`${location.origin}${pathname}/package.json`)).json();
           if(!this.devConfig.pkgs[rootPkg.name]){
                this.devConfig.pkgs[rootPkg.name]={};
           }            
        } catch (e) { }

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
                // this.wcItems.push(WCEX.watch(item));
                // wcItems为Array,因此push的this指针指向为原始数组
            //    debugger; 
                this.wcItems.push(item);
                this.buildWcItemsArray(el.shadowRoot,id,level+1);
            }
        })
    }
    switchHideChild(item:Item){
        if(item.childCount==0) return;
        
        this.$log("switchHideChild",item.id)
        item.openChilds = !item.openChilds;
        // console.log("switchHideChild",JSON.stringify(this.wcItems,null,2));

        function hideChilds(items:Item[],parentId:number,hide:boolean){
            for(let i=0;i<items.length;i++){
                if(items[i].parentId===parentId){
                    items[i].hide=hide;
                    hideChilds(items,items[i].id,hide);
                    // console.log("hideChilds",i,hide,JSON.stringify(items[i],null,2));
                }
            }
        }

        hideChilds(this.wcItems,item.id,!item.openChilds);    
        // this.wcItems[item.id] = item;
        // console.log("switchHideChild",JSON.stringify(this.wcItems,null,2));    
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