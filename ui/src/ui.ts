import { Scope } from "wcex";

// 注入插件 $ifslot 语法糖结构
// 主要用于在slot父元素上检测内部slot是否被attach，成功则显示父级元素，否则隐藏父级
const IFSLOT = "$ifslot";
WC.usePlugins({
  name: IFSLOT,
  priority: 0,
  tplParse(tpl) {
    if (tpl.attrs[IFSLOT]) {
      tpl.remove(IFSLOT);
      tpl.addAttrs({
        $slotattached: "0",
        "@slotchange": "slotattached=1",
        $show: "slotattached",
      });
    }
  },
});

export default class extends Scope {
  onCreate() {
    // 检测和启用dev面板
    if (localStorage.getItem("__DEV") != null) {
      window.addEventListener("keydown", (ev) => {
        if (ev.altKey && ev.key == "`") {
          (this as any).$side('wcex-ui.dev_panel',{pos:'t',size:'16em',color:this.$color.sec})
        }
      });
    }
  }
}
