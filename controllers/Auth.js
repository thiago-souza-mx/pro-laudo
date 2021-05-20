import React, { useEffect } from "react";
import ReactDOM from 'react-dom';
const panelLogin = require('../components/Login');
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
  ReactDOM.render( panelLogin.Login(startApp) , main ); 
  
  setTimeout(()=>{
    document.querySelector('.panel-login').classList.remove('slide-down');
  },200)
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

 const startApp = ()=>{
  sessionStorage.setItem('App-account','logado')
  document.querySelector('.panel-login').classList.add('slide-down');

  setTimeout(()=> loadContent(), 400 );
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
      document.getElementById('template').classList.add('hide');
      setTimeout(()=> loadLogin(), 500 );
 }



export default Login;
