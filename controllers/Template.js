import Menu from "../components/Menu"; 
import View  from "../views/View"; 
import menuSchema  from "../model/menu.model"; 
import React, { useEffect } from 'react';

import Content  from "./Content";

const Template = props=>{
  useEffect(() => {    
    if(window.location.pathname != "/")
    Content({href:window.location.pathname});
  });

  return(
    <div id="template">
      <Menu id={props.menu} schema={menuSchema}>       
      </Menu>

      <View page={props.view}>
        {props.children}
      </View>
    </div>
  );
  
}
export default Template;
