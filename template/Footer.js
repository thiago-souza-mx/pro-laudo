import React from "react"
import Select from 'react-select'
import { Language } from "../components/Language";


export default class Footer extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      options:[
        { value: 'en' , label: Language({en:"English", pt:"Iglês"}) },
        { value: 'pt' , label: Language({en:"Portuguese", pt:"Português"})}
      ]
    }
    
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e)=>{
    let AppConfig;
    if(localStorage.getItem('App-config')){
      AppConfig = JSON.parse(localStorage.getItem('App-config'));    
    }else{
      AppConfig = AppConfigModel;
    }
  
    AppConfig.language = e.value;
    localStorage.setItem('App-config', JSON.stringify(AppConfig))
  
    location.reload();
  }

  render(){
    return (
      <footer>
        <span className="label-view">Footer</span>
        <div className="language">
          <Select menuPlacement="top" placeholder={Language({en:"Language", pt:"Idioma"})} options={this.state.options} className="select" classNamePrefix="react-select" onChange={this.handleChange} />  
        </div>   .
        <div id="loadPages"></div>
      </footer>
    );
  }
}