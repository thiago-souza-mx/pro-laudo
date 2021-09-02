import React from "react"
import { Language } from "../../components/Language";
import { state } from "../../controllers/Speech";
import { Close, ModalPage } from "../../helpers/Modal";

export default class ModalProfile extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      ...props.state,
      event: '',
      theme: 'dark',
      full_name: <span className="preload"></span>,
      first_name: <span className="preload"></span>,
      last_name: <span className="preload"></span>,
      email: <span className="preload"></span>,
      pass: '',
      render: '',
    };

    this.handleDestruct = this.handleDestruct.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFlip = this.handleFlip.bind(this);
  }

  handleChange(e) {
    let elem = e.target.getAttribute('data-id');
    this.setState({[elem]: e.target.value});
  }

  handleSubmit({first_name, last_name}) {
    this.setState({full_name : first_name+" "+last_name})
    this.handleFlip();
    //let user = JSON.parse(sessionStorage.getItem('User-account'));
    let user = this.state.auth.user;
    sessionStorage.setItem( 'User-account', JSON.stringify({ ...user, first_name , last_name }) )
  }

  handleFlip(flip){
    this.setState({event:'open '+( flip ? 'flip' : 'unflip' )})
  }
  handleDestruct(cb) {
    this.setState({event: cb});
    console.log(this.state);
    Close();
    if(this.state.update)
      location.reload();
  }
  
  handleEdit(render) { 
    console.log(render)
    this.setState({render:render});
    this.handleFlip(true);

  }
 
  componentDidMount() {
    let { theme } = JSON.parse(localStorage.getItem('App-config'));
    if(theme.name == "theme-dark")
      this.setState({theme : 'light'})
    
    setTimeout(()=>{
      let { first_name, last_name, email } = this.state.auth.user;
      this.setState({first_name :first_name})
      this.setState({last_name : last_name})
      this.setState({full_name : first_name+" "+last_name})
      this.setState({email : email})
      this.setState({pass : email})
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
              <div>
                <i className="fad fa-user-circle font-100"></i>
                {/*<div className="first-name">
                  {this.state.first_name}
                </div>*/}
              </div>

              <div id="profile_menu" className="modal-menu">

                <button className={`btn btn-outline-${this.state.config.theme.name == 'theme-dark' ? 'light' : 'dark' }`} onClick={()=>this.handleEdit('Profile')}>
                  <Language en="Edit Profile" pt="Editar Perfil" />
                </button>

                <button className={`btn btn-outline-${this.state.config.theme.name == 'theme-dark' ? 'light' : 'dark' }`} onClick={()=>this.handleEdit('Preferences')}>
                  <Language en="Preferences" pt="Preferências" />
                </button>

              </div>

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

          <ModalPage render={this.state.render} state={this.state} handles={{
            handleEdit: this.handleEdit,
            handleChange: this.handleChange,
            handleSubmit: this.handleSubmit,
            handleFlip: this.handleFlip
          }}/>

        </div>
      </div>
    )
  }
}