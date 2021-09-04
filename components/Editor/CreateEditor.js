import React, { useState, useEffect, useRef } from 'react';
import { SetNotification } from './NotificationEditor/SetNotification';
import { Language } from './../Language';
import User from '../../controllers/User';

/**-------------------------------------------------------------------------
 * 
 * @createEditor Function que cria a prancheta para adiciona-la ao @AreaEditor
 * 
 -------------------------------------------------------------------------*/ 

export const CreateEditor = ({_state, id, _new, _editor})=>{

  if(_editor){
    _state.data = _editor.body;
    _state.name = _editor.name;
  }else{
    _state.data  = Language({pt:'Comece a escrever seu laudo', en:'Start writing your report' });
    _state.name = Language({en:"New Document" ,pt:"Novo Documento"});
  }


  _state.event = null;

  const editorRef = useRef()
  const [editorLoaded, setEditorLoaded] = useState(false)
  const { CKEditor, ClassicEditor } = editorRef.current || {}

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, // v3+
      ClassicEditor: require('../../libs/ckeditor/build/ckeditor'),
     
    }
    setEditorLoaded(true)
  }, [])

  return editorLoaded ? (
    <CKEditor
      editor={ClassicEditor}
      data={_state.data} 
      language= 'pt'
      config={{
        
        highlight: {
          options: [
              {
                  model: 'greenMarker',
                  class: 'marker-green',
                  title: 'Green marker',
                  color: 'var(--ck-highlight-marker-green)',
                  type: 'marker'
              },
              {
                  model: 'redPen',
                  class: 'pen-red',
                  title: 'Red pen',
                  color: 'var(--ck-highlight-pen-red)',
                  type: 'pen'
              }
          ]
        },
        toolbar:[
          'heading',
          '|',
          'bold',
          'italic',
          'link',
          '|',
          //'fontBackgroundColor',
          'fontColor',
          'fontSize',
          'fontFamily',
          '|',
          'bulletedList',
          'numberedList',
          '|',
          //'outdent',
          //'indent',
          'alignment',
          '|',
          'imageUpload',
          
          //'imageInsert',
          //'blockQuote',
          'insertTable',
          //'mediaEmbed',
          'undo',
          'redo',
          'highlight'
        ]
      }}
      onChange={ _state.save.handleSaveData }
      onReady={(editor) => {

        if( _editor ){
          let current = _editor
          editor.id = current.id
          editor.file_name = current.name;
        }

        editor.id_aba = id
        editor.name = editor.file_name = editor.file_name ? editor.file_name : `${_state.name.replace(' ','_')}_${editor.id}`
        editor.body = editor.getData()
        editor.open = true;
       // _state.editor.list.push(editor);
        User.automaticSaveFile(editor);
        User.setOpenFile(editor.id);
        _state.handleSetNavigate(editor);
        editor.setNotification = SetNotification
        global.NemmoEditor = editor;
        _state.editor.new = true; 

      }}
      onFocus={(event,editor) =>{ }}
      onBlur={(event,editor) =>{ }}
    />      
  ) : (
    <div>Editor loading</div>
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

export const GetTextNode = text =>{
  let editor = $('.active .ck-editor__editable');
  let NodeDad = editor.childNodes;  
  NodeDad.forEach((node , i)=>{
      if(node.innerText && node.innerText.indexOf(text)>-1){        
          SelectText({
              node:node.childNodes[i], 
              start:node.innerText.indexOf(text),
              end:node.innerText.indexOf(text) + text.length
          });
      }
  });
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

const SelectText = selection =>{    
  const range =  new Range();
  range.setStart(selection.node, selection.start);  
  range.setEnd(selection.node, selection.end);
  let select = window.getSelection();
  if(select.rangeCount > 0) {
      select.removeAllRanges();
  }  
  select.addRange(range);
}

