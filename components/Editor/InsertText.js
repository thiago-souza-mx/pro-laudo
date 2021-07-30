import { Language } from "../Language";
import { ScrollEditor } from "./CreateEditor";

/**-------------------------------------------------------------------------
 * 
 * @InsertText Function que insere dados de texto ao @Editor ativo no @AreaEditor
 * 
 -------------------------------------------------------------------------*/ 
 
 export const InsertText = ( msg , setData )=>{

  let _state = document.querySelector('.list-editor-item.active .ck-editor__editable').innerText;

  if( msg === false ){
    _CKEditor.setData(setData);
    return ScrollEditor();
  }
  if( _state.trim() == Language({pt:'Comece a escrever seu laudo', en:'Start writing your report' }) ){
    _CKEditor.setData("");
    return ScrollEditor();
  }

  let data = _CKEditor.getData()
  console.log(data)

  if(data.indexOf('ƒ(') > -1){
    let str1 = data.split('ƒ(');
    let str2 = str1[1].split(')');
    let str = str2[0];

    msg = data.replace(`ƒ(${str})`,`ƒ(${msg})`);
    _CKEditor.setData(msg);
    return ScrollEditor();
  }

  if(data.indexOf('t(') > -1){
    let str1 = data.split('t(');
    let str2 = str1[1].split(')');
    let str = str2[0];

    msg = data.replace(`t(${str})`,`t(${msg})`);
    _CKEditor.setData(msg);
    return ScrollEditor();
  }

  if(data.indexOf('|') > -1){
    let str1 = data.split('|');
    let str2 = str1[1].split('|');
    let str = str2[0];

    msg = data.replace(`|${str}|`,msg);
    _CKEditor.setData(msg);
    return ScrollEditor();
  }

  _CKEditor.model.change( writer => {
    writer.insertText( msg, _CKEditor.model.document.selection.getLastPosition(), 'end');    
  });
  return ScrollEditor();

}
