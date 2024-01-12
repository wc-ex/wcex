import { Scope } from "wcex";
import * as ace from 'ace-builds';

export default class extends Scope {
  onReady(){
    console.log('ACE----',ace);
    var editor = ace.edit(this.$id.editor,{
      autoScrollEditorIntoView: true,
      copyWithEmptySelection: true,
      mode: "ace/mode/json",
      selectionStyle: "text",
      value:JSON.stringify({a:1,b:2},null,2)
    });
  }
}