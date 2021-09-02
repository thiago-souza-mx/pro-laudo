import React from "react"
import Select from 'react-select'
import { Language } from "../components/Language";
import { Close } from "../helpers/Modal";
import User from "../controllers/User";

export default class Save extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      ...props.state,
      event: '',
      theme: 'dark',
      file_name: NemmoEditor.file_name,
      new_group: '',
      options: [ ],
      lang: 'pt'
    };

    this.handleDestruct = this.handleDestruct.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSaveOptions = this.handleSaveOptions.bind(this);
    this.handleSavePC = this.handleSavePC.bind(this);
  }

  handleChange(e) {
    let elem = e.target.getAttribute('data-id');
    this.setState({[elem]: e.target.value});
  }

  handleSubmit() {
    let files={}
    if(localStorage.getItem('Save-files')){
      files = JSON.parse(localStorage.getItem('Save-files'))
    }
    const file = {
      name  : this.state.file_name,
      id    : NemmoEditor.id,
      body  : NemmoEditor.getData(),
      open  : true
    }

    files[NemmoEditor.id] = file;
    User.saveFile( file );
    NemmoEditor.file_name = file.name;
    let aba = document.getElementById(file.id);
    aba.title = file.name
    aba.querySelector('span').innerText = file.name
    this.handleDestruct('close')
  }

  handleSavePC(){   
    const element = document.createElement("a");
    const file = new Blob([document.querySelector('.ck-editor__editable').ckeditorInstance.getData()], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    this.handleDestruct('close')

  }

  handleSaveOptions(){
    if(this.state.new_group){
      let state = {...this.state}
      state.options.push(
        { value: this.state.new_group , label: this.state.new_group },
      );

      state.new_group = '';
      this.setState(state);
    }
  }

  handleDestruct(cb) {
    this.setState({event: cb});
    Close();
  }
  
 
  componentDidMount() {
    let config = JSON.parse(localStorage.getItem('App-config'));
    if(config.theme.name == "theme-dark")
      this.setState({theme : 'light'})
    
    setTimeout(()=>{
      this.setState({event:'open'});
    },200)
  }

  render(){ 
    return(
      <div className={"app_modal " + this.state.event}>

        <div className="d-flex col-12 flex-1 edit">
      
          <div onClick={()=> this.handleDestruct('close')} className="close">
            <i className="far fa-times-circle font-22"></i>
          </div>
          <div className="d-flex col-12 flex-1 panel-flip">

            <div className="col-3 col-md-2 text-center aside-modal avatar p-3 d-flex flex-column">
              <div className="flex-1">
                <i className="fad fa-file-medical-alt font-100"></i>
              </div> 

              <button className={`btn btn-outline-${this.state.theme != 'dark' ? 'info' : 'primary' } font-16 px-3 py-2 radius`} onClick={this.handleSavePC}>
                <i className="fas fa-save"></i>
                <Language en=" Save in PC" pt=" Salvar no PC" />
              </button>
            </div>
       
            <div className="col-9 col-md-10 perfil-data p-3">
              <ul>
                <li className="d-flex">
                  <div className="flex-1 py-3">
                    <label><Language en="File Name" pt="Nome do Arquivo" /></label>
                    <input className="w-75 py-3" placeholder={Language({en:"File Name", pt:"Nome do Arquivo"})} type="text" data-id="file_name" value={this.state.file_name} onChange={this.handleChange} />
                  </div>              
                </li>

                <li className="d-flex">
                  <div className="flex-1 py-3">
                    <label><Language en="Group By" pt="Agrupar" /></label>
                    <Select placeholder={Language({en:"Select", pt:"Selecione"})} options={this.state.options} className="select w-75" classNamePrefix="react-select" />
                  </div>              
                </li>

                <li className="d-flex">
                  <div className="py-3 d-flex w-75 outer-input">
                    <label><Language en="New Group" pt="Novo Grupo" /></label>
                    <input className="flex-1 py-3" placeholder={Language({ en:"Create Group", pt:"Criar Grupo"})} type="text" data-id="new_group" value={this.state.new_group} onChange={this.handleChange} />
                    
                    <button className="btn btn-primary radius p-2 px-4 font-18 inner-input" onClick={this.handleSaveOptions}>
                      <Language en="Create" pt="Criar" />
                    </button> 
                  </div> 
            
                </li>

              </ul>

              <div className="d-flex justify-content-end w-75">
                <button className={`btn btn-outline-${this.state.theme != 'dark' ? 'info' : 'primary' } font-22 px-5 radius`} onClick={this.handleSubmit}>
                  <i className="fas fa-cloud"></i>
                  <Language en=" Save" pt=" Salvar" />
                </button>
              </div>

            </div>            
          </div>

        </div>
      </div>
    )
  }
}