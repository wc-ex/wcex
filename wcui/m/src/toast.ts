import { Scope } from "wcex";

(window as any).__TOAST_ELEM = null;

WCEX.usePlugins({
  name: "$dialog",
  scope: {
    $toast(message: string): void {
        document.body.querySelector(".toast")?.dispatchEvent(
        new CustomEvent("toast", { detail: { type: "toast", message } })
      );
    },

    $info(message: string): void {
        document.body.querySelector(".toast")?.dispatchEvent(
        new CustomEvent("toast", { detail: { type: "info", message } })
      );
    },
    $ok(message: string): void {
        document.body.querySelector(".toast")?.dispatchEvent(
        new CustomEvent("toast", { detail: { type: "ok", message } })
      );
    },
    $warn(message: string): void {
        document.body.querySelector(".toast")?.dispatchEvent(
        new CustomEvent("toast", { detail: { type: "warn", message } })
      );
    },
    $error(message: string): void {
        document.body.querySelector(".toast")?.dispatchEvent(
        new CustomEvent("toast", { detail: { type: "error", message } })
      );
    },
  },
});

interface IToast {
  type: "info" | "ok" | "warn" | "error";
  message: string;
  createAt: number;
}
export default class extends Scope {
    toastList: IToast[] = [];

  onReady(): void {
  }

  addToast(ev:CustomEvent<IToast>){
    this.toastList.push({createAt:new Date().getTime(),type:ev.detail.type, message:ev.detail.message});
  }
  onTimer(){
    // 删除超时的toast
    this.toastList = this.toastList.filter(t=>t.createAt + 2000 > new Date().getTime());
  }
  typeColor(typ:string){
    return ((this.$color[typ] || this.$color.pri) as any).l3.a2
  }
}

// 初始化创建全局toast元素
document.body.querySelector(".toast")?.remove()
document.body.appendChild(document.createElement("wcui-m.toast"));
