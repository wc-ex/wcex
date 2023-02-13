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

    // tpl.querySelectorAll('*[$$ifslot]')?.forEach((el)=>{
    // let att = el.getAttributeNode('$ifslot')!
    // el.removeAttributeNode(att)
    // el.setAttributeNode()

    // $disp="" :style="display: ${disp||'none'};" @slotchange="disp='unset'"

    // })
  },
});

export default class extends Scope {
  onCreate() {
    // 为 CSS 设置彩色模式

    this.$Colors.mode;
  }
}
