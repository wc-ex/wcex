import { Scope } from "wcex";

// 注入插件 $ifslot 语法糖结构
// 主要用于在slot父元素上检测内部slot是否被attach，成功则显示父级元素，否则隐藏父级
const IFSLOT = "$ifslot";
WCEX.usePlugins({
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
  async onCreate() {
    // 初始化字体, 从<meta> 标签中获取 name="fonts" 的配置内容
    await this.initFont();
  }

  async initFont() {
    // 初始化字体, 从<meta> 标签中获取 name="fonts" 的配置内容,获取属性 normal, bold, en-normal, en-bold
    const fontMeta = document.querySelector('meta[name="fonts"]');
    if (!fontMeta) return;
    let fontsConfig: {
      normal?: { pkgName: string; family: string };
      bold?: { pkgName: string; family: string };
      "en-normal"?: { pkgName: string; family: string };
      "en-bold"?: { pkgName: string; family: string };
    } = {};
    for (let key of ["normal", "bold", "en-normal", "en-bold"] as (keyof typeof fontsConfig)[]) {
      let pkgName = fontMeta.getAttribute(key);
      try {
        if (pkgName) {
          let pkg = await this.$loader.getFile(this.$path(`@/${pkgName}/package.json`)).getResult();
          let family = pkg?.font?.familyName;
          if (family) family = "'" + family + "', ";
          fontsConfig[key] = family ? { pkgName, family } : undefined;
        }
      } catch (e: any) {
        this.$log.error("load font failed:", pkgName, e.message);
      }
    }


    let promises: Promise<any>[] = [];
    // // 创建全局加载
    for (let key of Object.keys(fontsConfig)) {
      let font = fontsConfig[key as keyof typeof fontsConfig];
      let elLink = document.createElement("link");
      elLink.rel = "stylesheet";
      elLink.href = this.$path(`@/${font!.pkgName}/font.css`);
      document.head.appendChild(elLink);
      promises.push( new Promise((resolve) => {
        elLink.addEventListener("load", resolve);
      }));
    }

    let css = `
    .bold,h1,h2,h3,h4,h5,h6,th,strong,b{
      font-family: ${fontsConfig["en-bold"]?.family || ""} ${fontsConfig.bold?.family || ""} Arial, sans-serif !important;
      font-weight:500 !important
    }
    * {
    font-family: ${fontsConfig["en-normal"]?.family || ""} ${fontsConfig.normal?.family || ""} Arial, sans-serif ;
    font-weight:300 !important
  }
    `;

    let elImportCss = document.createElement("style");
    elImportCss.setAttribute("global", "import");
    elImportCss.innerHTML = css;
    document.head.appendChild(elImportCss);

    // 等待字体加载完成
    promises.push( new Promise((resolve) => {
      elImportCss.addEventListener("load", resolve);
    }));

    await Promise.all(promises);
    this.$emit("ready")

  }
}
