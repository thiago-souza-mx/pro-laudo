import React, { useState, useEffect, useRef } from 'react';
import { SetNotification } from './NotificationEditor/SetNotification';
import { Language } from './../Language';
import User from '../../controllers/User';

/**-------------------------------------------------------------------------
 * 
 * @createEditor Function que cria a prancheta para adiciona-la ao @AreaEditor
 * 
 -------------------------------------------------------------------------*/ 

 export const CreateEditor__ = ({_state, id, _new, _editor})=>{

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
          'highlight',
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
        global.NemmoEditor = editor;
        _state.editor.new = true; 

        CursorEditor('end');

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
  let editor = document.querySelector('.active .textarea');
  editor.scrollTop = editor.scrollHeight;
}


/**-------------------------------------------------------------------------
 * 
 * @CursorEditor Function que seta o cursor na posição escolhida do editor 
 * As posições aceitas são:
 * @start coloca cursor inicio do nó
 * @end coloca cursor final do nó
 * @init coloca cursor inicio do documento
 * @final coloca cursor final do documento
 * 
 * 
 -------------------------------------------------------------------------*/ 

 export const CursorEditor = (pos)=>{
  let range = document.createRange();
  let sel = window.getSelection();
  let id = '#inner_editor_0'
  let editor = document.querySelector(id);

  if(pos == 'start'){ 

    let elements = editor.lastElementChild || editor.lastChild;
    range.setStart(elements, 0);

  }else if(pos == 'end'){

    let elements = editor.lastElementChild || editor.lastChild;
    range.setStart(elements, editor.lastElementChild ? 1 : elements.length);

  }else if(pos == 'init'){

    let elements = editor.firstElementChild
    ;
    range.setStart(elements, 0);

  }else if(pos == 'final'){

    let elements = editor.lastElementChild;
    range.setStart(elements, 1);

  }

  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);

}

export const GetTextNode = text =>{
  let editor = document.querySelector('.active .ck-editor__editable');
  let NodeDad = editor.childNodes;
  
  NodeDad.forEach((node , i)=>{
      if(node.innerText && node.innerText.indexOf(text)>-1){
          SelectText({
              node:NodeDad[i].childNodes[0], 
              start:node.innerText.indexOf(text),
              end:node.innerText.indexOf(text) + text.length
          });
      }
  });

}

const SelectText = selection =>{    
  const range = document.createRange();
  range.setStart(selection.node, selection.start);  
  range.setEnd(selection.node, selection.end);
  let select = window.getSelection();
  if(select.rangeCount > 0) {
      select.removeAllRanges();
  }  
  select.addRange(range);
}


export class CreateEditor  extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      ...props
    }
  }

  componentDidMount(){
    let st = this.state;
    if(this.state._editor){
      st._state.data = st._editor.body;
      st._state.name = st._editor.name;
    }else{
      st._state.data  = Language({pt:'Comece a escrever seu laudo', en:'Start writing your report' });
      st._state.name = Language({en:"New Document" ,pt:"Novo Documento"});
    }
    this.setState(st);
  }

  render(){
    const id_editor = 'inner_'+this.props.id;
    return (
      <div id={id_editor} className={"textarea"} contentEditable="true">
        {this.state._state.data}
      </div>
    )
  }

}


export const SetData = text => {
  let id = 'inner_editor_0'
  let data = GetData(id);
  document.getElementById(id).innerHTML = text; 
}

export const GetData = (id) => {
  id = 'inner_editor_0'
  return document.getElementById(id).innerHTML; 
}