import LogoSVG from "./LogoSVG"
import {PT,Language, EN} from "./Language"
import React from "react"
import { fetchApi } from "../controllers/Auth";

export default class Register extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      first_name:'',
      last_name:'',
      email:'',
      pass:'',
      pass_security:'',
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
    fetchApi("/register",data)
    .then(res =>{
      this.setState({event:''});
      if(res.error)
        this.handleMessage(res.error,"danger");
      if(res.success){
        this.handleMessage(res.success,"success");
        location.href = "/";
      }
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
        <div className="logo-login" style={{width:180,padding:10, paddingBottom:20, paddingTop:0}}>  
          <LogoSVG/>
        </div>

        <div  className={`alert alert-${this.state.alert.role} msg py-1`} style={{display:this.state.alert.display}} role="alert">
          {this.state.alert.msg}
        </div>

        <div  className="panel-login slide-down d-flex g-primary px-5">        
          <div className="d-flex flex-column">

            <div className="form-group d-flex flex-row py-3">
              <input type="text" data-id="first_name" value={this.state.first_name}  onChange={this.handleChange} className="form-control px-3 radius font-20 p-2" placeholder={Language({en:"First Name", pt:"Nome"})}/>
              <div className="px-2"></div>
              <input type="text" data-id="last_name" value={this.state.last_name}  onChange={this.handleChange} className="form-control px-3 radius font-20 p-2" placeholder={Language({en:"Last Name", pt:"Sobrenome"})}/>
            </div>
            
            <div className="form-group">
              <input type="email" data-id="email" value={this.state.email}  onChange={this.handleChange} className="form-control px-3 radius font-20 p-2" placeholder={Language({en:"Email", pt:"Email"})}/>
            </div>

            <div className="form-group d-flex flex-row py-3">
              <input type="password" data-id="pass" value={this.state.pass} onChange={this.handleChange} className="form-control px-3 radius font-20 p-2" placeholder={Language({en:"Password", pt:"Senha"})}/>
              <div className="px-2"></div>
              <input type="password" data-id="pass_security" value={this.state.pass_security} onChange={this.handleChange} className="form-control px-3 radius font-20 p-2" placeholder={Language({en:"Repeat password", pt:"Repetir senha"})}/>
            </div>

            <div className="form-group d-flex flex-row py-3 col-12 justify-content-center align-items-center">
              <div className="col-8">
                <Language en="Already have registration " pt="Já possui cadastro "/>
                <a href="/" className="text-center px-4 btn btn-primary btn-sm radius">
                  <Language en="Login" pt="Login"/>
                </a>
              </div>

              <div className="col-4 d-flex justify-content-end">
                <button type="submit"  onClick={this.handleSubmit} data-event={this.state.event} className="btn btn-block btn-primary radius btn-lg px-5">
                  {Language({en:"Register", pt:"Cadastrar"})}
                </button>
              </div>
            </div>

          </div>
        </div>

        <div id="languages" className="d-flex justify-content-center align-items-center">
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