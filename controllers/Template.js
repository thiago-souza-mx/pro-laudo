import React from 'react';
import Menu from "../components/Menu"; 
import View  from "../views/View"; 

const Template = props=>{
  let view = "../views/"+props.menu;
 
    return(
      <div id="template">
        <header></header>
        <Menu id={props.menu}>       
        </Menu>

        <View page={props.view}>
          {props.children}
        </View>
      </div>
    );
  
}
export default Template;
