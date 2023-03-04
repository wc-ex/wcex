import { marked } from "marked";
// @ts-ignore
import * as hljs from "@highlightjs/cdn-assets";

import { Scope } from "wcex";

export default class extends Scope {
  hljs:any;
  src = "";
  // hljs={} as any
  onReady(): void {
    let self = this;
    this.$log("---1 hljs", hljs);
    marked.setOptions({
      baseUrl: (this as any).$npm,
      highlight: (code, lang, callback) => {
        let html = hljs.highlight(code, { language: lang || "text" }).value;
        return html;
      },
    });
    marked.use({
      renderer: {
        image(href: string, title: string, text: string) {
          let m = href.match(/^(.+?)\{(.*)\}$/)!
          let url = "";
          let sty = "";
          if(m && m.length == 3){
            url=self.$path(m[1]);
            sty=m[2];
          }else{
            url=self.$path(href);
          }
          console.log("============================IMG",url,sty)
          // let sty = (sp[1] && sp[2])?`width:${sp[1]};height:${}`

          if(url.endsWith('.svg')){
            return `<p align="center"> <svg src="${url}" alt="${text}" style="${sty}"></svg> </p>`;
          }else{
            return `<p align="center"> <img src="${url}" alt="${text}" style="${sty}"> </p>`;
          }
        },
      },
    });

    this.$watch(
      () => this.src,
      () => {
        this.updateMarked();
      }
    );
    this.updateMarked();
  }
  async updateMarked() {
    if (this.src) {
      let text = await this.$loader.getFile(this.src).getResult();
      // let text = await (await fetch()).text()
      let html = marked.parse(text.replace(/\\n/g, "\n"));
      this.$id.mark.innerHTML = html;
      this.$emit("update");
    } else {
      this.$id.mark.innerHTML = "";
    }
  }
}
