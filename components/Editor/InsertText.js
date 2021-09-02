import { Language } from "../Language";
import { ScrollEditor , CursorEditor } from "./CreateEditor";

/**-------------------------------------------------------------------------
 * 
 * @InsertText Function que insere dados de texto ao @Editor ativo no @AreaEditor
 * 
 -------------------------------------------------------------------------*/ 
 
 export const InsertText = ( msg , setData )=>{

  NemmoEditor.save()
  let _state = NemmoEditor.getData();

  msg = msg+' '

  if( msg === false ){
    NemmoEditor.setData(setData);
    return ScrollEditor();
  }
  if( _state.trim() == Language({pt:'Comece a escrever seu laudo', en:'Start writing your report' }) ){
    NemmoEditor.setData("");
    return ScrollEditor();
  }

  let data =  NemmoEditor.getData();

  if(data.indexOf('ƒ(') > -1){
    let str1 = data.split('ƒ(');
    let str2 = str1[1].split(')');
    let str = str2[0];

    msg = data.replace(`ƒ(${str})`,`ƒ(${msg})`);
    NemmoEditor.setData(msg);
    //CursorEditor('end');
    return ScrollEditor();
  }

  if(data.indexOf('t(') > -1){
    let str1 = data.split('t(');
    let str2 = str1[1].split(')');
    let str = str2[0];

    msg = data.replace(`t(${str})`,`t(${msg})`);
    NemmoEditor.setData(msg);
    //CursorEditor('end');
    return ScrollEditor();
  }

  if(data.indexOf('<mark>') > -1){
    let str1 = data.split('<mark>');
    let str2 = str1[1].split('</mark>');
    let str = str2[0];

    msg = data.replace(`<mark>${str}</mark>`,msg);
    NemmoEditor.setData(msg);
    CursorEditor('end');
    return ScrollEditor();
  }

  NemmoEditor.setData(_state+msg);
  CursorEditor('end');

}
