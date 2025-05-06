import { marked } from 'marked';
import { Scope } from 'wcex';

export default class extends Scope {
  src=""
  onReady(): void {
    // this.
    // 监控内容变化

  }
  async content(){
    return (await fetch(this.src)).text()
  }
  async updateMarked() {
    this.$log('MARKED!!!!!');
    let slot = this.$id.slot as HTMLSlotElement;
    let text = slot
      .assignedNodes()
      .map((n) => n.textContent?.replace(/\\n/g, '\n'))
      .join('\n').trim();
    let html = await marked.parse(text);
    this.$id.mark.innerHTML = html;
  }
}
