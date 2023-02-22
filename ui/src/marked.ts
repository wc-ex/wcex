import { marked } from 'marked';
// import hljs  from 'highlight.js';
import { Scope } from 'wcex';

export default class extends Scope {
  src=""
  hljs=''
  onReady(): void {
    this.$log('---',this.hljs )
    this.$watch(()=>this.src,()=>{
      this.updateMarked()
    })
    this.updateMarked()
  }
  async updateMarked() {
    if(this.src){
      let text = await this.$loader.getFile(this.src).getResult()
      // let text = await (await fetch()).text()
      let html = marked.parse(text.replace(/\\n/g, '\n'));
      this.$id.mark.innerHTML = html;  
      this.$emit('update');
    }else{
      this.$id.mark.innerHTML=""
    }
  }
}
