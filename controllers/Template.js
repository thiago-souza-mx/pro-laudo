import Menu from "../components/Menu"; 
import View  from "../views/View"; 
import menuSchema  from "../model/menu.model"; 
import React, { useEffect } from 'react';
import AppConfigModel from '../model/appConfig.model'
import {LoadContent}  from "./Content";

const Template = props=>{
  useEffect(() => { 
    
    if(!localStorage.getItem("App-config")) 
      localStorage.setItem("App-config",JSON.stringify(AppConfigModel));
    else{
      let AppConfig = JSON.parse(localStorage.getItem('App-config'));
      if(AppConfig.menu.state.open){
        document.querySelector('html').classList.add('comprime-menu');
      }
    }
    
    if(window.location.pathname != "/")
      LoadContent({href:window.location.pathname});

    document.getElementById('template').classList.remove('hide');
  });

  return(
    <div id="template" className="hide">
      <Menu id={props.menu} schema={menuSchema}>       
      </Menu>

      <View page={props.view}>
        {props.children}
      </View>
    </div>
  );
  
}
export default Template;
