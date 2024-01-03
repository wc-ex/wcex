// 防止影响，将dialog移动到body中弹出，弹出位置：默认水平居中，垂直为top:30%
// 背景虚化

import { Scope } from "wcex";

interface IIconOptions {
  pkg: string;
  type: string;
  icon: string;
}

interface IInputOptions {
  [k: string]: {
    type: string;
    placeholder: string;
    value: string;
  };
}

export interface IDialogOptions {
  srcEl?: HTMLElement;
  targetEl?: HTMLElement;
  icon: IIconOptions;
  title: string;
  message?: string;
  color?: any;
  outsideCancle: boolean;
  inputs?: IInputOptions;
  actions?: {
    ok: string;
    cancel: string;
  };
}

const defaultDialogOptions: IDialogOptions = {
  icon: {
    pkg: "@material-design-icons/svg",
    type: "filled",
    icon: "info",
  },
  title: "提示",
  outsideCancle: true,
  actions: {
    cancel: "取消",
    ok: "确定",
  },
};

/**
 * 对话框
 */
export default class DlgClass extends Scope {
  options = {} as IDialogOptions;
  initFlag = false;
  onCreate() {
    this.options = {
      ...defaultDialogOptions,
      ...(this.$rootElem as any).__dlg_options,
    };
  }
  onReady(): void {
    // 为body添加虚化背景
    document.body.classList.add("blur-bg");
    // 添加监听事件，点击空白处关闭弹窗
    document.body.addEventListener("mousedown", this._overClickListener);
    this.initFlag = true;
 
  }
  onDestroy(): void {
    this._close();
  }
  onClickAction(actionName: string) {

    // 获取所有输入框的值
    let values = {};
    if (this.options.inputs) {
      values = Object.keys(this.options.inputs).reduce((pre, cur) => {
        pre[cur] = this.options.inputs![cur].value;
        return pre;
      }, {} as any);
    }
    // 触发事件
    this.options.srcEl?.dispatchEvent(new CustomEvent(actionName,{detail: values}));
    // 关闭弹窗
    this.$rootElem.remove();
  }

  private _overClickListener = (ev: Event) => {
    if (ev.target == document.body && this.options.outsideCancle) {
      // 关闭弹窗
      this.$rootElem.remove();
    }
  };

  private _close() {
    document.body.classList.remove("blur-bg");
    document.body.removeEventListener("mousedown", this._overClickListener);
  }
}

WCEX.usePlugins({
  name: "$dialog",
  scope: {
    /**
     * 显示自定义对话框,自定义对话框需指定el作为自定义对话框中的内容
     * @param targetEl 自定义对话框内容
     * @param options 对话框配置，可选
     */
    $dialog(targetEl: HTMLElement, options?: IDialogOptions): void {
      let dlg = document.createElement("wcui-m.dialog");
      (dlg as any).__dlg_options = { targetEl, ...options };
      document.body.appendChild(dlg);
    },

    /**
     * 弹出信息对话框, 仅显示一个按钮
     */
    $alert(
      srcEl: HTMLElement,
      title: string,
      message: string,
      options?: IDialogOptions
    ): void {
      let dlg = document.createElement("wcui-m.dialog");
      (dlg as any).__dlg_options = { srcEl, title, message, ...options };
      document.body.appendChild(dlg);
    },

    /**
     * 弹出输入对话框, 仅显示一个按钮
     */
    $input(
      srcEl: HTMLElement,
      title: string,
      inputs?: IInputOptions,
      options?: IDialogOptions
    ): void {
      console.log("INPUTS!!!-->>", (self as any).$ev);
      let dlg = document.createElement("wcui-m.dialog");
      if (!inputs)
        inputs = {
          value: {
            type: "text",
            placeholder: "请输入",
            value: "",
          },
        };

      (dlg as any).__dlg_options = { srcEl, title, inputs, ...options };
      document.body.appendChild(dlg);
    },
    $loading(options: IDialogOptions, onOk?: () => void): void {},
 
  },
});
