import React, { useState, useEffect, useRef } from 'react'
import ReactDOM, { render } from 'react-dom';
import { Language } from './../Language'

const state = {
  data : null,
  name: null,
  save:{
    _status:'',
    get status(){
      return this._status;
    },
    set status(v){
      this._status = v;
    }
  },
  event:null,
  saveData: null,
  editor:{
    new: false
  },

  notification:{
    message:'',
    role:'',
    stage:'off'
  }
} 

export const AreaEditor = ()=> {
  const component = {
    editor:{
      _list:[],
      get list(){
        return this._list
      },
      set list(v){
        this._list.push(v)
        setNavigate(v)
      }
    },
    id_editor:0
  }

  /**-------------------------------------------------------------------------
   * 
   * @setNavigate Function para adicionar uma nova aba de Navegação no @AreaEditor
   * Essa function é chamada ao clicar sobre o item (+) no navigatorArea
   * 
   -------------------------------------------------------------------------*/  

  const setNavigate = (item)=>{

    let aba = document.createElement('li')
    aba.id = item.id;
    aba.setAttribute('data-editor', item.id_aba);
    aba.setAttribute('class','aba-editor-item active') 
    aba.setAttribute('title',item.file_name) 
    aba.onclick = ()=> selectEditor(aba);
    aba.innerHTML = `<span></span><i></i>`
    document.querySelector("#area-editor .aba-editor ul").appendChild(aba)
    ReactDOM.render( item.file_name , document.getElementById(aba.id).querySelector('span') );

    ReactDOM.render( 
      <i className="far fa-times" onClick={(e)=> removeEditor( item.id, item.id_aba, e )}></i>,
      document.getElementById(aba.id).querySelector('i') 
    );
       
  }

  /**-------------------------------------------------------------------------
   * 
   * @setEditor Function para adicionar uma nova pracheta de edição no @AreaEditor
   * Essa function é chamada ao clicar sobre o item (+) no #navigation-area
   * 
   -------------------------------------------------------------------------*/  

  const setEditor = ()=>{

    document.querySelectorAll('.aba-editor-item').forEach(item=>{
      item.classList.remove('active');
    })

    document.querySelectorAll('.list-editor-item').forEach(item=>{
      item.classList.remove('active');
    })
    
    let editor = document.createElement('div')
    editor.id = 'editor_'+component.id_editor;
    editor.setAttribute('class','list-editor-item active')
    document.querySelector("#list-editor").appendChild(editor)
    ReactDOM.render( <CreateEditor component={component} id={editor.id} _new={state.editor.new} /> , document.getElementById(editor.id) );
    component.id_editor++;

  }

  /**-------------------------------------------------------------------------
   * 
   * @removeEditor Function para remover uma pracheta de edição no @AreaEditor
   * Essa function é chamada ao clicar sobre o item (x) da aba no #navigation-area
   * 
   -------------------------------------------------------------------------*/ 

  const removeEditor = ( aba_id ,editor_id, e ) => {
    e.stopPropagation();
    let count_abas = document.getElementById('navigation-area').childNodes;
    if(count_abas.length > 1){
      document.getElementById(aba_id).previousSibling.click()
      document.getElementById(aba_id).remove()
      document.getElementById(editor_id).remove()
    }
    
  }

  /**-------------------------------------------------------------------------
   * 
   * @selectEditor Function para selecionar a prancheta e ativa-la no @AreaEditor
   * Essa function é acionada ao clicar na aba correspondente a prancheta selecionada
   * 
   -------------------------------------------------------------------------*/  

  const selectEditor = (e)=>{

    let editor_id = e.getAttribute('data-editor');
    let editor = document.getElementById(editor_id);

    global._CKEditor = editor.querySelector('.ck-editor__editable').ckeditorInstance
    document.querySelectorAll('.aba-editor-item').forEach(item=>{
      item.classList.remove('active');
    })

    e.classList.add('active');
    document.querySelectorAll('.list-editor-item').forEach(item=>{
      item.classList.remove('active');
    })
    editor.classList.add('active');

  }

  useEffect(()=>{    
    setEditor()   
  })
  
  return(
    <div id="area-editor">
      <div className="d-flex">
        <div className="aba-editor name-laudo">          
          <ul id="navigation-area">
            {component.navigate}
          </ul>
        </div>
        <div className="new-document" onClick={setEditor}> 
          <i className="fas fa-plus"></i>
        </div>
      </div>
      <div id="list-editor">
      </div>
      <div className="editor-footer">
        <div className="insert-notification">
        </div>
        <div className="status-foter">
          <StatusFooter state={state} />
        </div>
      </div>             
    </div>
  )
}

/**-------------------------------------------------------------------------
 * 
 * @createEditor Function que cria a prancheta para adiciona-la ao @AreaEditor
 * 
 -------------------------------------------------------------------------*/ 

const CreateEditor = ({component, id, _new})=>{

  state.data  = Language({pt:'Comece a escrever seu laudo', en:'Start writing your report' });
  state.name = Language({en:"New Document" ,pt:"Novo Documento"});
  state.save.status = <Language en="Editing" pt="Editando"/>;
  state.event = null;

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
      data={state.data} 
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
      }}
      onReady={(editor) => {

        if( 
          (sessionStorage.getItem('Current-laudo') && !_new) ||
          (sessionStorage.getItem('Current-laudo') && JSON.parse(sessionStorage.getItem('Current-laudo')).open)
        ){
          let current = JSON.parse(sessionStorage.getItem('Current-laudo'))
          delete current.open
          editor.id = current.id
          editor.setData(current.body);
          sessionStorage.setItem('Current-laudo',JSON.stringify(current))
          state.name = current.name;
          editor.file_name = current.name;
        }

        editor.id_aba = id
        editor.file_name = editor.file_name ? editor.file_name : `${state.name.replace(' ','_')}_${editor.id}`
        component.editor.list = editor;
        editor.setNotification = setNotification
        global._CKEditor = editor;
        state.editor.new = true; 

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
 * @StatusFooter Function que cria a o evento de @save_status no footer 
 * do @AreaEditor
 * 
 -------------------------------------------------------------------------*/ 

class StatusFooter extends React.Component{
  constructor(props){
    super(props)

    this.state={
      ...props.state,
    }
    this.handleSaveData = this.handleSaveData.bind(this);
  }

  handleSaveData = ()=>{

    let laudo = sessionStorage.getItem('Current-laudo') ? JSON.parse(sessionStorage.getItem('Current-laudo')) : {}
    laudo.body = _CKEditor.getData(),
    laudo.id= _CKEditor.id

    sessionStorage.setItem('Current-laudo', JSON.stringify(laudo) );
    let st = this.state;
    st.save.status = <Language en="Automatic Save" pt="Salvo Automáticamente"/>;
    this.setState(st);

  }

  componentDidMount(){
    
    if(state.saveData){
      clearInterval(state.saveData);
    }
    state.saveData = setInterval(this.handleSaveData,5000);
  }

  render(){
    return (
      <div className="text">
        {this.state.save.status} ...
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

const ScrollEditor = ()=>{
  document.querySelector('.active .ck-editor__editable').scrollTop = document.querySelector('.active .ck-editor__editable').scrollHeight;
}

const setNotification = (message, role) =>{
  let notification = {
    message: message,
    role: role,
    stagE: 'off'
  }

  document.querySelector(".editor-footer .insert-notification").innerHTML='';

  let notif = document.createElement('div')
  notif.id = 'notif_';
  document.querySelector(".editor-footer .insert-notification").appendChild(notif)  

  ReactDOM.render( <NotificationEditor notification={notification} /> , document.getElementById( notif.id ) );
}

/**-------------------------------------------------------------------------
 * 
 * @InsertText Function que insere dados de texto ao @Editor ativo no @AreaEditor
 * 
 -------------------------------------------------------------------------*/ 
 
export const InsertText = ( msg , setData )=>{
  state.save.status = <Language en="Editing" pt="Editando"/>;
  ReactDOM.render( <StatusFooter state={state} /> , document.querySelector(".editor-footer .status-foter") );
  
  let _state = document.querySelector('.ck-editor__editable').innerText;

  if( msg === false ){
    _CKEditor.setData(setData);
    return ScrollEditor();
  }
  if( _state.trim() == Language({pt:'Comece a escrever seu laudo', en:'Start writing your report' }) ){
    _CKEditor.setData("");
    return ScrollEditor();
  }

  let data = _CKEditor.getData()
  console.log(data)

  if(data.indexOf('ƒ(') > -1){
    let str1 = data.split('ƒ(');
    let str2 = str1[1].split(')');
    let str = str2[0];

    msg = data.replace(`ƒ(${str})`,`ƒ(${msg})`);
    _CKEditor.setData(msg);
    return ScrollEditor();
  }

  if(data.indexOf('t(') > -1){
    let str1 = data.split('t(');
    let str2 = str1[1].split(')');
    let str = str2[0];

    msg = data.replace(`t(${str})`,`t(${msg})`);
    _CKEditor.setData(msg);
    return ScrollEditor();
  }

  if(data.indexOf('|') > -1){
    let str1 = data.split('|');
    let str2 = str1[1].split('|');
    let str = str2[0];

    msg = data.replace(`|${str}|`,msg);
    _CKEditor.setData(msg);
    return ScrollEditor();
  }

  _CKEditor.model.change( writer => {
    writer.insertText( msg, _CKEditor.model.document.selection.getLastPosition(), 'end');    
  });
  return ScrollEditor();

}

class NotificationEditor extends React.Component{
  constructor(props){
    super(props)

    this.state={
      ...props.notification,
    }

    this.handleStageOff = this.handleStageOff.bind(this)
  }
  handleStageOff = ()=>{
    this.setState({stage:'off'})
  }

  componentDidMount(){
    setTimeout(()=> this.setState({stage:'on'}), 50  )
    setTimeout(()=> this.handleStageOff() , 10000  )
  }

  render(){
    return(
    <div className={`notification-editor ${this.state.role} ${this.state.stage}`}>
      <div className="message">
        {this.state.message}
      </div>
      <div>
        <i className="far fa-times" onClick={this.handleStageOff}></i>
      </div>
    </div>
  )}
  
}