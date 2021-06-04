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
      email:      <span className="preload"></span>
    };

    this.handleDestruct = this.handleDestruct.bind(this);
  }

  handleDestruct() {
    this.setState({event:''});
    Close();
  }

 
  componentDidMount() {
    let config = JSON.parse(localStorage.getItem('App-config'));
    if(config.theme.name == "theme-dark")
      this.setState({theme : 'light'})
    
    setTimeout(()=>{
      let user = JSON.parse(sessionStorage.getItem('User-account'));
      this.setState({first_name : user.first_name})
      this.setState({full_name : user.first_name+" "+user.last_name})
      this.setState({email : user.email})
    },1000)

    setTimeout(()=>{
      this.setState({event:'open'});
    },200)
  }

  render(){ 
    return(
      <div className={"app_modal " + this.state.event}>
        <div onClick={this.handleDestruct} className="close">
          <i class="far fa-times-circle font-22"></i>
        </div>
        <div className="d-flex col-12 flex-1">

          <div className="col-3 col-md-2 text-center avatar p-3 d-flex flex-column">
            <div className="flex-1">
              <i class="fad fa-user-circle font-100"></i>
              <div className="first-name">
                {this.state.first_name}
              </div>
            </div>


            <button className={`btn btn-outline-${this.state.theme}`}>
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

            </ul>
          </div>
          
        </div>
      </div>
    )
  }
}