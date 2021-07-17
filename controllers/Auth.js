import React, { useEffect, useState } from "react";
import ReactDOM, { render } from 'react-dom';
import AppConfigModel from '../model/appConfig.model';
import PanelLogin from '../views/Login';
import _404 from "../views/404";
import Register from "../views/Register";
import Recover from "../views/Recover";
import menuModel from "../model/menu.model";
import Template from "./Template";
import StartEvents from "../helpers/ToggleScreen";


const packageJson = require('../package.json');
const aplication  = packageJson.aplication;


// AUTH /////////////////////////////////////////////////////

export default class Auth extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      ...props.state,
      auth: this.handleLogin,
      config: this.handleConfig
    }

    this.handleRender = this.handleRender.bind(this);
    this.handleSetLogin = this.handleSetLogin.bind(this);
    this.handleSetLogout = this.handleSetLogout.bind(this);
  }

  handleLogin ={
    _logado : false,
    _user: {},
    _handleSetLogin:()=> this.handleSetLogin(this),
    _handleSetLogout:()=> this.handleSetLogout(this),
    get logado(){
      return this._logado;
    },
    set logado(v){
      if(v)
        this._handleSetLogin();
      else
        this._handleSetLogout();
      this._logado = v;
    },
    get user(){
      return this._user;
    },
    set user(v){
      this._user = v;
    }
  } 

  handleConfig = {
    _language:'pt',
    _handleRefactor: ()=>{
      const main = document.getElementById("__app");
        ReactDOM.render( this.handleRender() , main );
    },
    get language(){
      return this._language;
    },
    set language(v){
      this._handleRefactor()
      this._language = v;
    }
  }

  handleSetLogin({state}){

   console.log(state);
    if(typeof state.auth.user === "object"){
      sessionStorage.setItem('User-account', JSON.stringify(state.auth.user));
      sessionStorage.setItem('App-account','logado')
      document.querySelector('.panel-login').classList.add('slide-down');
  
      setTimeout(()=>{  
        const main = document.getElementById("__app");
        ReactDOM.render( this.handleRender() , main );
      }, 400 );
    }
  }

  
  handleSetLogout(){
    if(document.body.classList.contains('expand')){
      require('../helpers/ToggleScreen').toggleFullScreen();
    }

    document.querySelector('html').removeAttribute('class');

    let appAccount = sessionStorage.getItem('App-account');
    if(appAccount)
      sessionStorage.removeItem('App-account');
      sessionStorage.removeItem('User-account');
      document.getElementById('template').classList.add('hide');
      setTimeout(()=>{
        const main = document.getElementById("__app");
        ReactDOM.render( this.handleRender() , main );
      }, 500 );
  }

  handleRender(){

    let Render = <_404/>;

    if(sessionStorage.getItem('App-account')){ 
      Render = 
      <Template menu="home" state={this.state} view="home">
        <StartEvents/>
      </Template> 
    }else if(location.pathname == "/register"){
      Render = <Register state={this.state} />;
    }else if(location.pathname == "/recover"){
      Render = <Recover state={this.state} />;
    }else if(location.pathname == "/"){
      Render = <PanelLogin state={this.state} />
    }else{
      menuModel.forEach(rota=>{
        if(location.pathname == "/Home" || location.pathname == "/" + rota.link)
          Render = <PanelLogin state={this.state} />
      })
    }
  
    return Render
  }

  componentDidMount(){
    document.head.insertAdjacentHTML('beforeend',`<title>${aplication.name}</title>`);
    document.head.insertAdjacentHTML('beforeend',loadStyles(aplication.header.link));
    
    let AppConfig;
    if(!localStorage.getItem("App-config")){ 
      localStorage.setItem("App-config",JSON.stringify(AppConfigModel));
    }else{
      AppConfig = JSON.parse(localStorage.getItem('App-config'));
      if(!AppConfig.version || AppConfig.version != AppConfigModel.version){
        localStorage.setItem("App-config",JSON.stringify(AppConfigModel));
      } 
    }

    const main = document.getElementById("__app");
    ReactDOM.render( this.handleRender() , main );
  }

  render(){
    return(
      <div id="__app"></div>    
    )
  }
}



// LOADSTYLES ////////////////////////////////////////////////

const loadStyles = arr =>{
  let styles ="";

  arr.forEach(item => {    
    Object.keys(item).forEach(attr => {
      let atributes = "";
      Object.keys(item[attr]).forEach(val => {
        atributes += `${val}="${item[attr][val]}"`;
      })
      styles+= `<link id="${attr}" ${atributes} />`;
    });
    
  });

  return styles;
}


 // FETCH API //////////////////////////////////////////////////

 export const fetchApi = async (rota, data) =>{
  data.lang = JSON.parse(localStorage.getItem('App-config')).language;
  return fetch(Base.api + rota,{
    method: "POST",
    body:JSON.stringify(data)
  })
  .then(res => res.json()
    .then(res=>{      
      return res;
    })
  )  
 }




