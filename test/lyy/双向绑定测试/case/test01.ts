/**
 */
import { Scope } from "wcex";

export default class extends Scope {
  _selfdata: any = {}; // 内存中表单数据

  onReady() {
    setTimeout(async () => {
      this._selfdata = {
        "基础组件/性别": "女",
      };
    }, 4);
  }
}
