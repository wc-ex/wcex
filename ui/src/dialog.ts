// 防止影响，将dialog移动到body中弹出，弹出位置：默认水平居中，垂直为top:30%
// 背景虚化

import { Logger, Scope } from 'wcex'
let log = Logger("dialog")


export interface IDialogOptions {

}
log.info("----------->> INIT Dialog")
WCEX.usePlugins({
  name: "$dialog",
  scope: {
    $dialog(id:string) {
      log.info("dialog", id)
      
    },
  },
});

export default class extends Scope {
  onReady(): void {
  }
}

