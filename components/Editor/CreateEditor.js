import React, { useState, useEffect, useRef } from 'react';
import { SetNotification } from './NotificationEditor/SetNotification';
import { Language } from './../Language';
import User from '../../controllers/User';
import { Editor } from '@tinymce/tinymce-react';
import { Tiny } from './styles';



/**-------------------------------------------------------------------------
 * 
 * @createEditor Function que cria a prancheta para adiciona-la ao @AreaEditor
 * 
 -------------------------------------------------------------------------*/ 

export const CreateEditor = ({_state, id, _new, _editor})=>{

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
       <Editor
         onInit={(evt, editor) => editorRef.current = editor}
         initialValue="<p>This is the initial content of the editor.</p>"
         init={{
           height: 500,           
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar: 'undo redo | formatselect | ' +
           'bold italic backcolor | alignleft aligncenter ' +
           'alignright alignjustify | bullist numlist outdent indent | ' +
           'removeformat | help',
           content_style: Tiny
         }}
       />
       
     </>
  )
}

/**-------------------------------------------------------------------------
 * 
 * @ScrollEditor Function que aciona o evento de rolagem no editor no footer 
 * do @AreaEditor
 * 
 -------------------------------------------------------------------------*/ 

export const ScrollEditor = ()=>{
  let editor = $('.active .ck-editor__editable');
  editor.scrollTop = editor.scrollHeight;
}



export const CursorEditor = (pos, mark)=>{

  let editor = $('#area-editor .active .ck-editor__editable');    
  if(pos == 'start'){ 

  }else if(pos == 'end'){
    setCursor(editor, 
        (
          editor.querySelector('mark') ?
          ( editor.querySelector('mark') )
        :
          ( editor.lastChild || editor )
        )
    )

 /* }else if(pos == 'final'){
    setCursor(editor,  editor.querySelector('mark') || (editor.lastElementChild || editor ))*/

  }
}

export const GetMarkSelection = ({text, mark} , callback) =>{
  let editor = $('.active .ck-editor__editable');
  let marker = editor.querySelector('mark.marker-green');  

  if(marker && marker.innerText){     

    /*const range =  new Range();
    range.setStart( marker , 0 );  
    range.setEnd( marker , marker.childElementCount ? marker.childElementCount : 1 );
    range.deleteContents()*/

    callback(mark);
      SelectText({
          node:marker, 
          start:0,
          end: marker.childElementCount ? marker.childElementCount : 1
      });

  }else{
    callback(mark);
  }
}


export const MarkReplace = (text, callback) =>{
  let editor = $('.active .ck-editor__editable');
  let mark = editor.querySelector('mark.marker-green');  

  if(mark && mark.innerText){        
      const range =  new Range();
      range.setStart( mark , 0 );  
      range.setEnd( mark , mark.childElementCount ? mark.childElementCount : 1 );
      range.deleteContents()
    console.log('apagou')
  }
}


function setCursor(node, cursorElement) {
  
  const  range = new Range();
  range.setStart(cursorElement , 1 );
  range.collapse(true);
  if (window.getSelection) {
      var sel = window.getSelection();      
      sel.removeAllRanges();
      sel.addRange(range);
      node.focus();
  } else if (document.selection && range.select) {
      range.select();
  }  
}

const GetTextNode = text =>{
  let editor = tinyMCE.activeEditor.dom.doc.body;
  let NodeDad = editor.getElementsByTagName("*");  
  NodeDad = [...NodeDad].reverse();
  for(let i = 0;i < NodeDad.length; i++){
    let node = NodeDad[i];
    if(node.innerText && node.innerText.indexOf(text)>-1){        
        SelectText({
            node:node, 
            start:node.innerText.indexOf(text),
            end:node.innerText.indexOf(text) + text.length
        });
        return;
    }
  }
}

const SelectText = selection =>{     
  const range =  tinymce.activeEditor.dom.createRng();
  range.setStart(selection.node.firstChild, selection.start);  
  range.setEnd(selection.node.firstChild, selection.end);
  tinymce.activeEditor.selection.setRng(range)

}

const insert = (text, end) =>{

  let mark =  tinyMCE.activeEditor.dom.doc.querySelector('mark', end);
  if(mark)    
    tinyMCE.activeEditor.execCommand('mceSelectNode', false, mark);

  if(end)
    tinyMCE.activeEditor.execCommand('mceInsertContent', false, text );
  else
    tinyMCE.activeEditor.execCommand('mceReplaceContent', false, `<mark>${text}</mark>`);
}
/*
// SELECT NODE
  tinyMCE.activeEditor.execCommand('mceSelectNode', false, tinyMCE.activeEditor.dom.doc.querySelector('mark'));

// REPLACE NODE
  tinyMCE.activeEditor.execCommand('mceReplaceContent', false, "<mark>some text</mark>");

// INSERT CONTENT IN CURSOR POSITION
  tinyMCE.activeEditor.execCommand('mceInsertContent', false, "<mark>some text</mark>");
  
// INSERT CALC
  tinyMCE.activeEditor.execCommand('mceReplaceContent', false, `<mark class="calc">oi</mark>`);
  */