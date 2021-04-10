import React, { useEffect } from "react";
import ReactDOM from 'react-dom';

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
    document.head.insertAdjacentHTML('beforeend',`
      <title>Pro Laudo</title>
      <link rel="shortcut icon" href="/assets/img/logo-pro-laudo-small.png" />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
      <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>

    `);
  })

  return'' ;
}

const loadLogin = ()=>{
  const main = document.getElementById("__app");
  ReactDOM.render(
    <div id="__app_login" className="d-flex flex-row col-12 justify-content-center align-items-center">
      <div  className="panel-login slide-down d-flex">
       
        <div className="d-flex flex-column">
          <h3 className="text-center text-primary font-logo font-48"><b className="font-border">P<b className="font-40">ro</b></b> <b className="font-40 text-dark">Laudo</b></h3>
           
          <div  className="alert alert-danger msg" style={{display:"none"}} role="alert">
          </div>
          <div className="form-group">
            <label >User Name</label>
            <input type="text" className="form-control px-3" id="proUser" placeholder="User Name"/>
            
          </div>
          <div className="form-group">
            <label >Password</label>
            <input type="password" className="form-control px-3" id="proPass" placeholder="Password"/>
          </div>
          <div className="d-grid gap-2 py-2">
            <button type="submit"  onClick={startApp} className="btn btn-block btn-primary radius text-white">Entrar</button>
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
