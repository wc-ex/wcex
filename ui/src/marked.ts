import { Marked  } from "marked";
// @ts-ignore
import * as hljs from "@highlightjs/cdn-assets";
import { markedHighlight } from "marked-highlight";
import { Scope } from "wcex";
const marked = new Marked(
  markedHighlight({
	emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
);
export default class extends Scope {
  hljs: any;
  src = "";
  text = "";
  toc = 0;
  // hljs={} as any
  onReady(): void {
    let self = this;
    console.log("-----markedHighlight",markedHighlight)
    // marked.setOptions({
    //   baseUrl: (this as any).$npm,
    //   highlight: (code, lang, callback) => {
    //     let html = hljs.highlight(code, { language: lang || "text" }).value;
    //     return html;
    //   },
    // });
    
    marked.use({
      renderer: {
        html(html) {
          // 为svg 文件处理路径
          let m = html.text.match(/(.*<svg .* src=")(.*)(" .*>[\s\S]*<\/svg>.*)/);
          if (m && m.length == 4) {
            if (m[2].startsWith('@/')) {
              return m[1] + self.$path(m[2]) + m[3];
            }
          }
          return html.text;
        },

        image(img) {
          let m = img.href.match(/^(.+?)\{(.*)\}$/)!;
          let url = "";
          let sty = "";
          if (m && m.length == 3) {
            url = self.$path(m[1]);
            sty = m[2];
          } else {
            url = self.$path(img.href);
          }

          if (url.endsWith('.svg')) {
            return `<p align="center"> <svg src="${url}" alt="${img.text}" style="${sty}"></svg> </p>`;
          } else {
            return `<p align="center"> <img src="${url}" alt="${img.text}" style="${sty}"> </p>`;
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
    this.$watch(() => this.text, () => this.updateMarked());
    this.updateMarked();
  }
  async updateMarked() {
    let text = this.text;
    if (!this.$id.md) return;

    if (this.src) {
      text = await this.$loader.getFile(this.src).getResult();
    }

    if (text) {
      let html = await marked.parse(text.replace(/\r\n/g, "\n")) || "";
      this.$id.md.innerHTML = html;
      this.$id.content.scrollTo(0, 0);

    } else {
      this.$id.md.innerHTML = "";
      this.$id.content.scrollTo(0, 0);
    }
    setTimeout(() => {
      this.$emit("update", { md: this.$id.md });
      if (this.toc)
        this.$emit("update", { md: this.$id.md }, this.$id.toc);
    }, 100);

  }

  onScroll() {
    this.$emit('sync-scroll', this.$id.toc);
  }
}
