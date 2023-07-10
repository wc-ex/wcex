// 防止影响，将dialog移动到body中弹出，弹出位置：默认水平居中，垂直为top:30%
// 背景虚化

import {Scope} from 'wcex'


export interface IDialogOptions {

}


WCEX.usePlugins({
    name: "$dialog",    
    scope: {
        $dialog(dlgEl:HTMLElement, options?: IDialogOptions) {
      },
    },
  });

export default class extends Scope{
    onReady(): void {
    }
}