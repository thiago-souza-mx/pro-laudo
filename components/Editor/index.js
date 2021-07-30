import React from 'react'
import ReactDOM from 'react-dom';
import { Language } from './../Language'
import User from '../../controllers/User';
import { CreateEditor } from './CreateEditor';


global._CKEditor = false;

export class AreaEditor extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      ...props.state,
      data  : null,
      name  : null,
      event : null,
      save  : {
        handleSaveData  : this.handleSaveData.bind(this),
        status          : '',
      },
      tiping: false,
      handleSetNavigate  : (v)=> this.handleSetNavigate(v),
      
    }

    this.handleSetNavigate  = this.handleSetNavigate.bind(this);
    this.handleSetEditor    = this.handleSetEditor.bind(this);
    this.handleRemoveEditor = this.handleRemoveEditor.bind(this);
    this.handleSelectEditor = this.handleSelectEditor.bind(this);    
    this.handleStartEditor  = this.handleStartEditor.bind(this);    

  }


  /**-------------------------------------------------------------------------
   * 
   * @handleSetNavigate Function para adicionar uma nova aba de Navegação no @AreaEditor
   * Essa function é chamada ao clicar sobre o item (+) no navigatorArea
   * 
   -------------------------------------------------------------------------*/  

  handleSetNavigate = (item)=>{


    let aba = document.createElement('li')
    aba.id = item.id;
    aba.setAttribute('data-editor', item.id_aba);
    aba.setAttribute('class','aba-editor-item active') 
    aba.setAttribute('title',item.file_name) 
    aba.onclick = ()=> this.handleSelectEditor(aba);
    aba.innerHTML = `<i class="fas fa-notes-medical"></i><span></span><i class="icon"></i>`
    document.querySelector("#area-editor .aba-editor ul").appendChild(aba)
    ReactDOM.render( item.file_name , document.getElementById(aba.id).querySelector('span') );

    ReactDOM.render( 
      <i className="far fa-times" onClick={(e)=> this.handleRemoveEditor( item.id, item.id_aba, e )}></i>,
      document.getElementById(aba.id).querySelector('.icon') 
    );

    console.log(this.state)
       
  }

  /**-------------------------------------------------------------------------
   * 
   * @handleSetEditor Function para adicionar uma nova pracheta de edição no @AreaEditor
   * Essa function é chamada ao clicar sobre o item (+) no #navigation-area
   * 
   -------------------------------------------------------------------------*/  

  handleSetEditor = ( _editor )=>{

    document.querySelectorAll('.aba-editor-item').forEach(item=>{
      item.classList.remove('active');
    })

    document.querySelectorAll('.list-editor-item').forEach(item=>{
      item.classList.remove('active');
    })
    
    let editor = document.createElement('div')
    editor.id = 'editor_'+this.state.id_editor;
    editor.setAttribute('class','list-editor-item active')
    document.querySelector("#list-editor").appendChild(editor)
    ReactDOM.render( <CreateEditor _state={this.state} id={editor.id} _new={this.state.editor.new} _editor={_editor} /> , document.getElementById(editor.id) );
    this.setState({id_editor: this.state.id_editor +1})

  }

    /**-------------------------------------------------------------------------
   * 
   * @handleStartEditor Function para inicia a pracheta de edição no @AreaEditor
   * Essa function é chamada no load da página
   * 
   -------------------------------------------------------------------------*/  


  handleStartEditor = ()=>{

    let listOpen = User.getOpenFiles();
    let files = User.getFiles();

    
    if(listOpen.length > 0){
      listOpen.forEach((o,i)=>{

        let editor = files[o];
        let obj_editor = {
          id    : editor.id,
          body  : editor.body || editor.getData() ,
          name  : editor.name || editor.file_name
        }
        setTimeout(()=> this.handleSetEditor(obj_editor), 300 * (i+1) ) 

      })

    }else
      setTimeout(()=> this.handleSetEditor(), 500 ) 

    
    
  }

  /**-------------------------------------------------------------------------
   * 
   * @handleRemoveEditor Function para remover uma pracheta de edição no @AreaEditor
   * Essa function é chamada ao clicar sobre o item (x) da aba no #navigation-area
   * 
   -------------------------------------------------------------------------*/ 

  handleRemoveEditor = ( aba_id ,editor_id, e ) => {
    e.stopPropagation();

    User.CloseFile(aba_id);

    let count_abas = document.getElementById('navigation-area').childNodes;
    if(count_abas.length > 1){
      if(document.getElementById(aba_id).classList.contains('active')){
        if(document.getElementById(aba_id).previousSibling)
          document.getElementById(aba_id).previousSibling.click()
        else
          document.getElementById(aba_id).nextSibling.click()
      }
      document.getElementById(aba_id).remove()
      document.getElementById(editor_id).remove()
    }
    
  }

  /**-------------------------------------------------------------------------
   * 
   * @handleSelectEditor Function para selecionar a prancheta e ativa-la no @AreaEditor
   * Essa function é acionada ao clicar na aba correspondente a prancheta selecionada
   * 
   -------------------------------------------------------------------------*/  

  handleSelectEditor = (e)=>{

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

  /**-------------------------------------------------------------------------
   * 
   * @handleSaveData Function para salvar o conteúdo da prancheta 
   * Essa function é acionada ao editar o conteúdo da prancheta e salva automáticamente 
   * cada edição.
   * 
   -------------------------------------------------------------------------*/ 

  handleSaveData = ()=>{

    if(_CKEditor){
      if(document.querySelector('.list-editor-item.active .ck-editor__editable').innerText != <Language pt='Comece a escrever seu laudo' en='Start writing your report'/>){
        let st = this.state;
        st.save.status = <Language en="Editing" pt="Editando"/>;
        this.setState(st);

        if(this.state.tiping)
          clearTimeout(this.state.tiping);
        
        this.setState({
          tiping:setTimeout(()=>{
          
            let laudo   = {}
            laudo.body  = _CKEditor.getData(),
            laudo.id    = _CKEditor.id
            laudo.name  = _CKEditor.file_name
            laudo.open  = true;

            User.automaticSaveFile(laudo);    
            st.save.status = <Language en="Automatic Save" pt="Salvo Automáticamente"/>;
            this.setState(st)

          },5000)
        }) 
      }
    }
  }

  componentDidMount(){
    let st = this.state;
    st.editor.new = false;
    this.setState(st)
     
    setTimeout(()=> this.handleStartEditor(), 300 ) 
  }


  render(){
    return(
      <div id="area-editor">
        <div className="d-flex">
          <div className="aba-editor name-laudo">          
            <ul id="navigation-area">
              {this.state.navigate}
            </ul>
          </div>
          <div className="new-document" onClick={()=>this.handleSetEditor()}> 
            <i className="fas fa-plus"></i>
          </div>
        </div>

        <div id="list-editor">
          {/**
           * 
           * O componente Editor será carregado nesta área
           * 
           */}
        </div>

        <div className="editor-footer">
          <div className="insert-notification">
          </div>
          <div className="status-foter">
            <div className="text">
              {this.state.save.status} ...
            </div>
          </div>
        </div>             
      </div>
    )
  }
}
