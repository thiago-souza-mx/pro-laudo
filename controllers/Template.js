import Menu from "../components/Menu"; 
import View  from "../views/View"; 
import menuSchema  from "../model/menu.model"; 
import React, { useEffect } from 'react';
import {LoadContent}  from "./Content";

const Template = ({state, view, menu, children})=>{
  useEffect(() => { 

    let AppConfig = JSON.parse(localStorage.getItem('App-config'));
    if(AppConfig.menu.state.open){
      document.querySelector('html').classList.add('comprime-menu');
    }
    document.querySelector('html').classList.add(AppConfig.theme.name);
    document.querySelector('html').classList.remove('lang-pt');
    document.querySelector('html').classList.remove('lang-en');
    document.querySelector('html').classList.add('lang-'+AppConfig.language);

    LoadContent({href:window.location.pathname});

    document.addEventListener("click",function(){
      document.querySelectorAll('.open').forEach(item=>{
        item.classList.remove('open');
      })
    })
    setTimeout(()=>{ document.getElementById('template').classList.remove('hide');},400);
  });
  
  return(

    <div id="template" className="hide">     

      <Menu id={menu} schema={menuSchema} state={state}/>       

      <View page={view} state={state}>
        {children}
      </View>
    </div>

  );  
 
}
export default Template;

