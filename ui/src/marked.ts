import { marked } from 'marked';
import { Scope } from 'wcex';

export default class extends Scope {
  onReady(): void {
    // 监控内容变化
    this.updateMarked();
  }
  updateMarked() {
    this.$log('MARKED!!!!!');
    let slot = this.$id.slot as HTMLSlotElement;
    let text = slot
      .assignedNodes()
      .map((n) => n.textContent?.replace(/\\n/g, '\n'))
      .join('\n').trim();
    let html = marked.parse(text);
    this.$id.mark.innerHTML = html;
  }
}
