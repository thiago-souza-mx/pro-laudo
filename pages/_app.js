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
      update :{ 
        _app: false,
        set app(v){
          this._app = v;
        },
        get app(){
          return this._app;
        }
      },
      auth : {},
      config : {}, 
      Nemmo : {},
      schema: menuSchema     
    }
  }
  
  render(){
    return( 
      <div id="__app__" state={this.state.reload} style={{display:"contents"}}>
        <Auth state={this.state} />  
      </div>      
    )
  }
}

