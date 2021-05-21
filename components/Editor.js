import React, { useState, useEffect, useRef } from 'react'

export default function Editor () {
  const editorRef = useRef()
  const [editorLoaded, setEditorLoaded] = useState(false)
  const { CKEditor, ClassicEditor } = editorRef.current || {}

  useEffect(() => {
    editorRef.current = {
      // CKEditor: require('@ckeditor/ckeditor5-react'), // depricated in v3
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
          'fontBackgroundColor',
          'fontColor',
          'fontSize',
          'fontFamily',
          '|',
          'bulletedList',
          'numberedList',
          '|',
          'outdent',
          'indent',
          'alignment',
          '|',
          'imageUpload',
          'imageInsert',
          'blockQuote',
          'insertTable',
          'mediaEmbed',
          'undo',
          'redo'
        ]
      }}
      language= 'en'
       onInit={editor => {
      }}
      onChange={(event, editor) => {
        const data = editor.getData()
        console.log({ event, editor, data }) 
      }}
    />
  ) : (
    <div>Editor loading</div>
  )
}