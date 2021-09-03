import { Language } from "../Language";
import { ScrollEditor } from "./CreateEditor";

/**-------------------------------------------------------------------------
 * 
 * @InsertText Function que insere dados de texto ao @Editor ativo no @AreaEditor
 * 
 -------------------------------------------------------------------------*/ 
 const insertHTML = (html) => {
  
  const viewFragment =  NemmoEditor.data.processor.toView( html );
  const modelFragment =  NemmoEditor.data.toModel( viewFragment );
  NemmoEditor.model.insertContent(modelFragment);
}  

 export const InsertText = ( msg , setData )=>{

  let _state = document.querySelector('.list-editor-item.active .ck-editor__editable').innerHTML;

  console.log(_state)
  if( msg === false ){
    NemmoEditor.setData(setData);
    return ScrollEditor();
  }
  if( _state.trim() == Language({pt:'Comece a escrever seu laudo', en:'Start writing your report' }) ){
    NemmoEditor.setData("");
    return ScrollEditor();
  }

  let data = _state;
  

  if(data.indexOf('ƒ(') > -1){
    let str1 = data.split('ƒ(');
    let str2 = str1[1].split(')');
    let str = str2[0];

    msg = data.replace(`ƒ(${str})`,`ƒ(${msg})`);
    NemmoEditor.setData(msg);
    return ScrollEditor();
  }

  if(data.indexOf('t(') > -1){
    let str1 = data.split('t(');
    let str2 = str1[1].split(')');
    let str = str2[0];

    msg = data.replace(`t(${str})`,`t(${msg})`);
    NemmoEditor.setData(msg);
    return ScrollEditor();
  }

  if(data.indexOf('<mark') > -1){
    console.log(data);
    let str1 = data.split('<mark class="marker-green">');
    let str2 = str1[1].split('</mark>');
    let str = str2[0];

    msg = data.replace(`<mark class="marker-green">${str}</mark>`,msg);
    NemmoEditor.setData(msg);
    return ScrollEditor();
  }



  insertHTML(`<mark class="marker-green">${msg}</mark>`);
  return ScrollEditor();

}
