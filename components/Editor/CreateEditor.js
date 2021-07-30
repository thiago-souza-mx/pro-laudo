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
      ClassicEditor: require('ckeditor5-custom-build')
    }
    setEditorLoaded(true)
  }, [])

  return editorLoaded ? (
    <CKEditor
      editor={ClassicEditor}
      data={_state.data} 
      language= 'pt'
      config={{
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
          'redo'
        ]
      }}
      onChange={(event, editor) => {
        const data = editor.getData()
        console.log({ event, editor, data }) 
        _state.save.handleSaveData();
      }}
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
        global._CKEditor = editor;
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
  let editor = document.querySelector('.active .ck-editor__editable');
  editor.scrollTop = editor.scrollHeight;
}


