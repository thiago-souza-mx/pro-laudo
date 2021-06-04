import React, { useEffect } from "react";
import ReactDOM from 'react-dom';
import AppConfigModel from '../model/appConfig.model';
import PanelLogin from '../components/Login';
import _404 from "../components/404";
import Register from "../components/Register";
import Recover from "../components/Recover";
import menuModel from "../model/menu.model";


const packageJson = require('../package.json');
const aplication  = packageJson.aplication;

const state = {
  template:''
}


// LOGIN /////////////////////////////////////////////////////

const Login = props=>{
  state.template = props.children;
  return(
    <app id="__app">
      <LoadConfig data={props} />
    </app>    
  );

}


// LOADCONFIG ////////////////////////////////////////////////

const LoadConfig =() =>{
  useEffect(() => {

    // HEADER
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

    // APP ACCOUNT
    if(sessionStorage.getItem('App-account'))
      loadContent();
    else
      loadLogin();
  })

  return'' ;
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


// LOADLOGIN /////////////////////////////////////////////////

const loadLogin = ()=>{

  const main = document.getElementById("__app");
  let Render = <_404/>;
   // Valida URL

  if(location.pathname == "/register"){
    Render = <Register/>;
  }else if(location.pathname == "/recover"){
    Render = <Recover/>;
  }else if(location.pathname == "/"){
    Render = <PanelLogin/>
  }else{
    menuModel.forEach(rota=>{
      if(location.pathname == "/Home" || location.pathname == "/" + rota.link)
        Render = <PanelLogin/>
    })
  }

  // Renderiza
  
  ReactDOM.render( Render , main );   
}


// LOADCONTENT ///////////////////////////////////////////////

const loadContent = ()=>{
  const main = document.getElementById("__app");
  ReactDOM.render(
    state.template
    , main
  );
 }


 // STARTAPP //////////////////////////////////////////////////

const startApp = $user =>{
  if(typeof $user === "object"){
    sessionStorage.setItem('User-account', JSON.stringify($user));
    sessionStorage.setItem('App-account','logado')
    document.querySelector('.panel-login').classList.add('slide-down');

    setTimeout(()=> loadContent(), 400 );
  }
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
      console.log(res)
      if(res.success){
        if(rota.indexOf('login') > -1)
          startApp(res.success);
      }
      return res
    })
  )
  
 }

 // LOGOUT ////////////////////////////////////////////////////

 export const Logout = ()=>{
    if(document.body.classList.contains('expand')){
      require('../helpers/ToggleScreen').toggleFullScreen();
    }

    document.querySelector('html').removeAttribute('class');

    let appAccount = sessionStorage.getItem('App-account');
    if(appAccount)
      sessionStorage.removeItem('App-account');
      sessionStorage.removeItem('User-account');
      document.getElementById('template').classList.add('hide');
      setTimeout(()=> loadLogin(), 500 );
 }



export default Login;
