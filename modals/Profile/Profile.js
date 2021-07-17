import React from "react"
import { Language } from "../../components/Language";

export default class Profile extends React.Component{

  constructor(props) {
    super(props);
    this.state = props.state;

    this.handleSubmit = props.handles.handleSubmit;
    this.handleFlip = props.handles.handleFlip;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let elem = e.target.getAttribute('data-id');
    this.setState({[elem]: e.target.value});
  }

  render(){  
    return(      
      <div style={{display:"contents"}}>

        <div className="d-flex col-12 flex-1 panel-flip">

          <div className="col-3 col-md-2 text-center avatar aside-modal p-3 d-flex flex-column">
            <div className="flex-1">
              <i className="fad fa-edit font-100"></i>
            </div>

            <div>              
              <button className={`me-2 btn btn-${this.state.theme != 'dark' ? 'light' : 'dark' }`} onClick={()=> this.handleFlip()}>
                <i className="fas fa-arrow-left"></i>
              </button>
              <button className={`btn btn-${this.state.theme != 'dark' ? 'info' : 'primary' }`} onClick={()=> this.handleSubmit(this.state)}>
                <Language en="Save" pt="Salvar" />
              </button>
            </div>

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
    )
  }
}