import { Scope } from "wcex";

export default class extends Scope{
  value=0
  onReady(): void {
    console.log('com ready');
  }
  clickIcon(){
    console.log('click icon');
    this.value=parseInt(<any>this.value)+1000;
  }
}