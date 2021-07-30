import 'regenerator-runtime/runtime';
import React from 'react';
import './../assets/sass/global.scss'
import menuSchema  from "../model/menu.model"; 
import Auth  from "../controllers/Auth";
import Global from "../controllers/Config";

export default class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      reload : 'false',
      auth : {},
      config : {}, 
      schema: menuSchema     
    }
  }
    
  render(){
    return( 
      <div state={this.state.reload} style={{display:"contents"}}>
        <Auth state={this.state} />  
      </div>      
    )
  }
}

