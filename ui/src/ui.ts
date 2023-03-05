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
    // 检测当前父元素是否为WC并进行CSS注入（因为当前包含ui库的元素已经创建，无法注入css）
    
    // 为 CSS 设置彩色模式
    // this.$Colors.mode;
  }
}
