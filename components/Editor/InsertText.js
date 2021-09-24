import { Language } from "../Language";
import { CursorEditor, GetMarkSelection, GetTextNode, MarkReplace, ScrollEditor } from "./CreateEditor";

export const Marker = {
  green : text =>{
    return {
      mark: `<mark class="marker-green">${text}</mark>`,
      text : text
    }
  }
}
/**-------------------------------------------------------------------------
 * 
 * @InsertText Function que insere dados de texto ao @Editor ativo no @AreaEditor
 * 
 -------------------------------------------------------------------------*/ 
 const insertHTML = (html , pos ) => {
  
  const viewFragment =  NemmoEditor.data.processor.toView( html );
  const modelFragment =  NemmoEditor.data.toModel( viewFragment );
  NemmoEditor.model.insertContent(modelFragment, NemmoEditor.model.document.selection.getLastPosition());
  //CursorEditor( pos ? pos : 'end');
}  

 export const InsertText = ( msg , setText )=>{

  console.log(msg)
  /*let _state = document.querySelector('.list-editor-item.active .ck-editor__editable').innerHTML;
  if( msg !== false )
    msg = ' '+msg;*/

 
  if( NemmoEditor.getData().trim() == Language({pt:'Comece a escrever seu laudo', en:'Start writing your report' }) ){
    NemmoEditor.setData("");
    CursorEditor('end');
    return ScrollEditor();
  }
/*
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
  }*/

  if(!setText){ 
  
    MarkReplace()  
    setTimeout(()=>{
       insertHTML( msg.mark , 'end')
       CursorEditor('end');
    } )
    
  }else{
    setTimeout(()=> {
      MarkReplace()
      setTimeout(()=>{ 
        
        insertHTML( `<p>&nbsp;${msg.text}</p>` , 'end')
        CursorEditor('end');

      },100 )
    },50)
    
  }

  return ScrollEditor();

}
