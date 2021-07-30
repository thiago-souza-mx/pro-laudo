import React from "react";
import { AreaEditor } from "../components/Editor";
import { Language } from "../components/Language";
const Modal  = require('../helpers/Modal');

export default class Home extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      ...props.state,
    }

    this.handleToggleSave = this.handleToggleSave.bind(this);
    this.handleSaveCloud = this.handleSaveCloud.bind(this);
    this.handleDownloadTxtFile = this.handleDownloadTxtFile.bind(this);
    this.handleCopyTxt = this.handleCopyTxt.bind(this);
    this.handleNewReport = this.handleNewReport.bind(this)
  }

  handleToggleSave = (e) => {
    e.stopPropagation();
    let save = e.target.closest('.action');

    if(save.classList.contains('open'))
      save.classList.remove('open');
    else
      save.classList.add('open');
  }

  handleSaveCloud = () => {
    let st = this.state;
    Modal.Open({name:'Save', st})
  }

  handleDownloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([document.querySelector('.ck-editor__editable').ckeditorInstance.getData()], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  handleCopyTxt = ()=>{
    navigator.clipboard.writeText(_CKEditor.getData());
  }

  handleNewReport = () => {
    document.querySelector('.new-document').click();
  }

  render(){
    return (
      <div id="__home">
        
        <div id="editor" className="d-flex flex-row h-100">
            <div className="col-9 d-flex flex-column h-100 editor">            
              <AreaEditor state={this.state} />
            <div className="editor-actions">
              <div className="action save">
                <button className="btn btn-primary radius" onClick={(e)=>this.handleToggleSave(e)}>
                  <i className="fas fa-save"></i>
                </button>
                <ul>
                  <li onClick={this.handleSaveCloud}>
                    <i className="fas fa-cloud"></i>
                    <Language en="Save" pt="Salvar"/>
                  </li>
                  <li onClick={this.handleDownloadTxtFile}>
                    <i className="fas fa-save"></i>
                    <Language en="Save in PC" pt="Salvar no PC"/>
                  </li>

                  <li onClick={this.handleCopyTxt}>
                    <i className="fas fa-copy"></i>                  
                    <Language en="Copy" pt="Copiar"/>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          <div id="__list_actions" className="col-3">
            <ul className="scrolling">
              <li>
                <i className="fas fa-text"></i> 
                <div className="text">
                  <span className="nameaction">
                    <Language en="AutoTexts" pt="AutoTextos"/>
                  </span>              
                  <small>texto descritivo</small>
                </div>
              </li>

              <li onClick={this.handleSaveCloud}>
                <i className="fas fa-save"></i> 
                <div className="text">
                  <span className="nameaction">
                    <Language en="Save Report" pt="Salvar Laudo"/>  
                  </span>              
                  <small>texto descritivo</small>
                </div>
              </li>

              <li onClick={this.handleNewReport}>
                <i className="fas fa-notes-medical"></i> 
                <div className="text">
                  <span className="nameaction">
                    <Language en="New Report" pt="Novo Laudo"/>  
                  </span>              
                  <small>texto descritivo</small>
                </div>
              </li>

              <li>
                <i className="fas fa-gamepad-alt"></i> 
                <div className="text">
                  <span className="nameaction">
                    <Language en="Commands" pt="Comandos"/>  
                  </span>              
                  <small>texto descritivo</small>
                </div>
              </li>
              
            </ul>

          </div>
          
        </div>
      </div>
    )
  }
}

