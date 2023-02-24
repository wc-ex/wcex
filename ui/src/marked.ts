import { marked } from "marked";
// @ts-ignore
import * as hljs from "@highlightjs/cdn-assets";

import { Scope } from "wcex";

export default class extends Scope {
  src = "";
  // hljs={} as any
  onReady(): void {
    this.$log("---", hljs);
    marked.setOptions({ highlight: (code, lang, callback) => {
      let html = hljs.highlight(code, {language: lang}).value;
      return html;
    } });

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
      let text = await this.$loader.getFile(decodeURI(this.src)).getResult();
      // let text = await (await fetch()).text()
      let html = marked.parse(text.replace(/\\n/g, "\n"));
      this.$id.mark.innerHTML = html;
      this.$emit("update");
    } else {
      this.$id.mark.innerHTML = "";
    }
  }
}
