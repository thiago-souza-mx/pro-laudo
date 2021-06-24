import React, { useState, useEffect, useRef } from 'react'

export default function Editor_ () {
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
      data='<p>Comece a escrever seu laudo</p>'
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
      language= 'en'
      onChange={(event, editor) => {
        const data = editor.getData()
        console.log({ event, editor, data }) 
      }}
    />
  ) : (
    <div>Editor loading</div>
  )
}

export function Insert( msg , setData ){

  let state = document.querySelector('.ck-editor__editable').innerText;
  let editor = document.querySelector('.ck-editor__editable').ckeditorInstance;
  
  if( msg === false ){
   return  editor.setData(setData);
  }
  if( state.trim() == 'Comece a escrever seu laudo' ){
    editor.setData("");
  }

  let data = editor.getData()
  console.log(data)
  if(data.indexOf('|') > -1){
    let str1 = data.split('|');
    let str2 = str1[1].split('|');
    let str = str2[0];

    msg = data.replace(`|${str}|`,msg);
    return editor.setData(msg);
  }

  editor.model.change( writer => {
    writer.insertText( msg, editor.model.document.selection.getLastPosition(), 'in');
  });

}