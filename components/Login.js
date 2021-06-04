import LogoSVG from "./LogoSVG"
import {PT,Language, EN} from "./Language"
import React from "react"
import { fetchApi } from "../controllers/Auth";

export default class PanelLogin extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      email:'',
      pass:'',
      event:'',
      alert:{
        msg:'',
        role:'danger',
        display:'none'
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
  }

  handleChange(e) {
    let elem = e.target.getAttribute('data-id');
    this.setState({[elem]: e.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({event:'load'});
    let data = {...this.state}
    delete data.alert;
    delete data.event;
    fetchApi("/login",data)
    .then(res =>{
      this.setState({event:''});
      if(res.error)
        this.handleMessage(res.error,"danger")
    });    
  }

  handleMessage(message, role) {
    let state = {...this.state}
    state.alert.msg = message;
    state.alert.role = role;
    state.alert.display = 'block';

    this.setState(state);
  }

  componentDidMount() {
    setTimeout(()=>{
      document.querySelector('.panel-login').classList.remove('slide-down');
    },200);
  }

  render(){
 
    return(
      <div id="__app_login" className="d-flex flex-column col-12 justify-content-center align-items-center">

        <div  className={`alert alert-${this.state.alert.role} msg py-1`} style={{display:this.state.alert.display}} role="alert">
          {this.state.alert.msg}
        </div>

        <div  className="panel-login slide-down d-flex g-primary">        
          <div className="d-flex flex-column px-5">

            <div className="logo-login logo-white">  
              <LogoSVG/>
            </div>
            <div className="form-group py-3">
              <input type="email" data-id="email" value={this.state.email}  onChange={this.handleChange} className="form-control px-3 radius font-20 p-2" placeholder={Language({en:"Email", pt:"Email"})}/>
            </div>

            <div className="form-group">
              <input type="password" data-id="pass" value={this.state.pass} onChange={this.handleChange} className="form-control px-3 radius font-20 p-2" placeholder={Language({en:"Password", pt:"Senha"})}/>
            </div>

            <div className="d-grid gap-2 pt-3">
              <button type="submit"  onClick={this.handleSubmit} data-event={this.state.event} className="btn btn-block btn-primary radius btn-lg">{Language({en:"Sign In", pt:"Entrar"})}</button>
            </div>

            <a href="/recover" className="text-center py-3 link-primary">
              <Language en="Forgot your password?" pt="Esqueceu sua senha?"/>
            </a>

            <div className="text-center py-3">
              <Language en="Don’t have an account? " pt="Não tem uma conta? "/>
              <a href="/register" className="text-center px-3 btn btn-outline-primary btn-sm radius">
                <Language en="Sign Up" pt="Criar Conta"/>
              </a>
            </div>

          </div>

          {/*<div className="d-flex flex-column login-banner">
          </div>*/}

        </div>

        <div id="languages" className="d-flex justify-content-center align-items-center text-white">
          <Language en="Languages" pt="Idiomas"/>
          <div className="lang-btn">
            <PT/>
          </div>

          <div className="lang-btn">
            <EN/>
          </div>
        </div>

      </div>
    )
  }
}