import React, {Component} from "react"
import Select from 'react-select'
import { Language } from "../components/Language";
import { fetchApi } from "../controllers/Auth";
import { Close } from "../helpers/Modal";

export default class Reports extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      event: '',
      theme: 'dark',
      directorys:[
        {name: "teste"}
      ]
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

  }

  handleSavePC(){   
    const element = document.createElement("a");
    const file = new Blob([document.querySelector('.ck-editor__editable').ckeditorInstance.getData()], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    Close();

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

    let dir = '';
    this.state.directorys.forEach(item => {
      dir += `
      <div>
        <i class="fal fa-folder font-20"></i>
        ${item.name}
      </div>`      
    })

    document.getElementById('directorys').innerHTML= dir;
    
    setTimeout(()=>{
      this.setState({event:'open'});
    },200)
  }

  render(){ 
    return(
      <div id="__report">
        <h4>
          <Language en="Save Reports" pt="Laudos Salvos" />
        </h4>
        
        <div id="directorys">

   

        </div>
      </div>
    )
  }
}


