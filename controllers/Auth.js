import React, { useEffect } from "react";
import ReactDOM from 'react-dom';
const packageJson = require('../package.json');
const aplication  = packageJson.aplication;

const state = {
  template:''
}

const Login = props=>{
  state.template = props.children;
  return(
    <app id="__app">
      <LoadConfig data={props} />
    </app>    
  );

}

const LoadConfig =() =>{
  useEffect(() => {
    // APP ACCOUNT
    if(sessionStorage.getItem('App-account'))
      loadContent();
    else
      loadLogin();

    // HEADER
    document.head.insertAdjacentHTML('beforeend',`<title>${aplication.name}</title>`);
    document.head.insertAdjacentHTML('beforeend',loadStyles(aplication.header.link));

  })

  return'' ;
}

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

const loadLogin = ()=>{
  const main = document.getElementById("__app");
  ReactDOM.render(
    <div id="__app_login" className="d-flex flex-row col-12 justify-content-center align-items-center">
      <div  className="panel-login slide-down d-flex g-primary">
       
        <div className="d-flex flex-column">
          <h3 className="text-center text-primary font-logo font-48">Login</h3>
           {/*<img src="/assets/img/logo-pro-laudo-linear-escuro.png" style={{maxWidth:"250px"}} className="mx-3"></img>*/}
          <div  className="alert alert-danger msg" style={{display:"none"}} role="alert">
          </div>
          <div className="form-group py-3">

            <input type="text" className="form-control px-3 radius font-20 p-2" id="proUser" placeholder="User Name"/>
            
          </div>
          <div className="form-group">

            <input type="password" className="form-control px-3 radius font-20 p-2" id="proPass" placeholder="Password"/>
          </div>
          <div className="d-grid gap-2 pt-3 mx-3">
            <button type="submit"  onClick={startApp} className="btn btn-block btn-primary radius btn-lg">Entrar</button>
          </div>
        </div>
      </div>
    </div>
 
    , main
  );
  
  setTimeout(()=>{
    document.querySelector('.panel-login').classList.remove('slide-down');
  },200)
}

const loadContent = ()=>{
  const main = document.getElementById("__app");
  ReactDOM.render(
    state.template
    , main
  );
 }

 const startApp = ()=>{
  sessionStorage.setItem('App-account','logado')
  document.querySelector('.panel-login').classList.add('slide-down');

  setTimeout(()=> loadContent(), 400 );
 }

 export const Logout = ()=>{
    let appAccount = sessionStorage.getItem('App-account');
    if(appAccount)
      sessionStorage.removeItem('App-account');
      document.getElementById('template').classList.add('hide');
      setTimeout(()=> loadLogin(), 500 );
 }

export default Login;
