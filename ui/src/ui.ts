import { Scope, usePlugins } from "wcex";

const IFSLOT="$ifslot"
usePlugins({
  name: IFSLOT,
  priority: 0,
  tplParse(tpl) {
    if(tpl.attrs[IFSLOT]){
      tpl.remove(IFSLOT)
      tpl.addAttrs({
        '$slotattached':'0',
        '@slotchange':"console.log('--slotchanged111');slotattached=1",
        "$show":"slotattached"
      })
      console.log("!!=================>>>! $ifslot", tpl.elem);
    }

  },
});

export default class extends Scope {
  onCreate() {
    // 为 CSS 设置彩色模式

    this.$Colors.mode;
  }
}
