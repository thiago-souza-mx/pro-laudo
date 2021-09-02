import React from "react"
import { Language } from "../components/Language";
import { Ligthbox } from "../components/Ligthbox";
import { Close } from "../helpers/Modal";


export default class WebSearch extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      ...props.state,
      event: '',
      theme: 'dark',
    };

    this.handleDestruct = this.handleDestruct.bind(this);
  }



  handleDestruct(cb) {
    this.setState({event: cb});
    Close();
  }
  
 
  componentDidMount() {
    let config = JSON.parse(localStorage.getItem('App-config'));
    if(config.theme.name == "theme-dark")
      this.setState({theme : 'light'})
    
    setTimeout(()=>{
      this.setState({event:'open'});
    },200)
  }

  render(){ 
    return(
      <div className={"app_modal " + this.state.event}>

        <div className="d-flex col-12 flex-1">
      
          <div onClick={()=> this.handleDestruct('close')} className="close">
            <i className="far fa-times-circle font-22"></i>
          </div>
          <div className="d-flex col-12 flex-1 panel-flip">
            <div className="col-3 col-md-2 text-center aside-modal avatar p-3 d-flex flex-column">
              <div className="flex-1">
                <i className="fad fa-globe-americas font-100"></i>
                <div>
                  {this.props.state.search}
                </div>
               
              </div> 

            </div>
       
            <div className="col-9 col-md-10 d-flex flex-1">
              <Ligthbox {...this.props.state} />       
            </div>
          </div>
        </div>
      </div>
    )
  }
}