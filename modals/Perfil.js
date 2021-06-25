import React from "react"
import { Language } from "../components/Language";
import { fetchApi } from "../controllers/Auth";
import { Close } from "../helpers/Modal";

export default class Perfil extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      event: '',
      theme: 'dark',
      full_name:  <span className="preload"></span>,
      first_name: <span className="preload"></span>,
      last_name: <span className="preload"></span>,
      email:      <span className="preload"></span>,
      pass:      ''
    };

    this.handleDestruct = this.handleDestruct.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let elem = e.target.getAttribute('data-id');
    this.setState({[elem]: e.target.value});
  }

  handleSubmit() {
    this.setState({full_name : this.state.first_name+" "+this.state.last_name})
    this.setState({event:'open unflip'})
  }

  handleDestruct(cb) {
    this.setState({event: cb});
    Close();
  }
  
  handleEdit() { 
    this.setState({event:'open flip'});
  }

 
  componentDidMount() {
    let config = JSON.parse(localStorage.getItem('App-config'));
    if(config.theme.name == "theme-dark")
      this.setState({theme : 'light'})
    
    setTimeout(()=>{
      let user = JSON.parse(sessionStorage.getItem('User-account'));
      this.setState({first_name : user.first_name})
      this.setState({last_name : user.last_name})
      this.setState({full_name : user.first_name+" "+user.last_name})
      this.setState({email : user.email})
      this.setState({pass : user.email})
    },1000)

    setTimeout(()=>{
      this.setState({event:'open'});
    },200)
  }

  render(){ 
    return(
      <div className={"app_modal " + this.state.event}>

        <div className="front d-flex col-12 flex-1">

          <div onClick={this.handleDestruct} className="close">
            <i className="far fa-times-circle font-22"></i>
          </div>
          <div className="d-flex col-12 flex-1 panel-flip">

            <div className="col-3 col-md-2 text-center avatar aside-modal p-3 d-flex flex-column">
              <div className="flex-1">
                <i className="fad fa-user-circle font-100"></i>
                <div className="first-name">
                  {this.state.first_name}
                </div>
              </div>


              <button className={`btn btn-outline-${this.state.theme}`} onClick={this.handleEdit}>
                <Language en="Edit Perfil" pt="Editar Perfil" />
              </button>
            </div>

            <div className="col-9 col-md-10 perfil-data p-3">
              <ul>
                <li>
                  <label><Language en="Name" pt="Nome" /></label>                
                  {this.state.full_name}
                </li>

                <li>
                  <label><Language en="Email" pt="Email" /></label>
                  {this.state.email}
                </li>

                <li>
                  <label><Language en="Password" pt="Senha" /></label>
                  <input type="password" value={this.state.pass} disabled/>
                </li>

              </ul>
            </div>            
          </div>

        </div>

        <div className="back d-flex col-12 flex-1 edit">
      
          <div onClick={()=> this.handleDestruct('close')} className="close">
            <i className="far fa-times-circle font-22"></i>
          </div>
          <div className="d-flex col-12 flex-1 panel-flip">

            <div className="col-3 col-md-2 text-center avatar aside-modal p-3 d-flex flex-column">
              <div className="flex-1">
                <i className="fad fa-edit font-100"></i>
              </div>

              <button className={`btn btn-outline-${this.state.theme != 'dark' ? 'info' : 'primary' }`} onClick={this.handleSubmit}>
                <Language en="Save" pt="Salvar" />
              </button>
            </div>

            <div className="col-9 col-md-10 perfil-data p-3">
              <ul>
                <li className="d-flex">
                  <div>
                    <label><Language en="First Name" pt="Nome" /></label>
                    <input type="text" data-id="first_name" value={this.state.first_name} onChange={this.handleChange} />
                  </div>
                  <div className="mx-2">
                    <label><Language en="Last Name" pt="Sobrenome" /></label>
                    <input type="text" data-id="last_name" value={this.state.last_name} onChange={this.handleChange} />
                  </div>                 
                </li>

                <li>
                  <label><Language en="Email" pt="Email" /></label>
                  <input type="email" data-id="email" value={this.state.email} onChange={this.handleChange} />
                </li>

                <li>
                  <label><Language en="Password" pt="Senha" /></label>
                  <input type="password" data-id="pass" value={this.state.pass} onChange={this.handleChange} />
                </li>

              </ul>
            </div>            
          </div>

        </div>
      </div>
    )
  }
}