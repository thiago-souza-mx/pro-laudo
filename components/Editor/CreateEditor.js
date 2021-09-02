import React, { useState, useEffect, useRef } from 'react';
import { SetNotification } from './NotificationEditor/SetNotification';
import { Language } from './../Language';
import User from '../../controllers/User';

const { v4: uuidv4 } = require('uuid');

/**-------------------------------------------------------------------------
 * 
 * @createEditor Function que cria a prancheta para adiciona-la ao @AreaEditor
 * 
 -------------------------------------------------------------------------*/ 

export class CreateEditor  extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      ...props,
      id: uuidv4()

    }

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  GetInstance = (state)=>{
    delete state._state
    return state;
  }

  componentDidMount(){
    const editor = {}    
    let st = this.state;
    st.data  = Language({pt:'Comece a escrever seu laudo', en:'Start writing your report' });
    st.name = Language({en:"New Document" ,pt:"Novo Documento"});
    editor.id = st.id;

    if( st._editor ){
      let current = st._editor
      editor.id = current.id
      editor.file_name = current.name;
      st.data = st._editor.body
      st.name = st._editor.name;
    }

    editor.id_aba = this.props.id
    editor.name = editor.file_name = editor.file_name ? editor.file_name : `${st.name.replace(' ','_')}_${st.id}`
    editor.body = st.data
    editor.open = true;
   // _state.editor.list.push(editor);
    User.automaticSaveFile(editor);
    User.setOpenFile(editor.id);
    st._state.handleSetNavigate(editor);
    editor.setNotification = SetNotification
    editor.setData = this.SetData;
    editor.getData = this.GetData;
    editor.save = this.handleOnChange;
    st._state.editor.new = true; 

    //CursorEditor('end');
    st._state.Nemmo.Editor.push(editor);
    global.NemmoEditor = editor
    this.setState(st);    
    
  }

  handleOnChange = ()=>{    
    this.state._state.save.handleSaveData();
  }

  SetData = (text) => {
    let id = this.state.id;
    let data = this.GetData();
    document.getElementById(id).querySelector('p').innerHTML = text; 
  }
  
  GetData = () => {
    return document.getElementById(this.state.id).querySelector('p').innerHTML; 
  }


  render(){
    return (
      <div id={this.state.id} className={"textarea"} contentEditable="true" onInput={this.handleOnChange}>
        <p>{this.state.data}</p>
      </div>

    )
  }

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

 export const CursorEditor = (pos, mark)=>{
  let range = document.createRange();
  let sel = window.getSelection();
  let id = NemmoEditor.id
  let editor = document.getElementById('area-editor').querySelector('.active .textarea');

  if(mark)
    editor = editor.querySelector('mark');
    
  if(pos == 'start'){ 

    let elements = editor.lastElementChild || editor.lastChild;
    range.setStart(elements, 0);

  }else if(pos == 'end'){

    let elements = editor.lastElementChild || editor.lastChild;
    console.log(elements);
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


