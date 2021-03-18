import React from 'react';
import Menu from "../components/Menu"; 
import View  from "../views/View"; 

const Template = props=>{
  let menuSchema = [ 
      {name:'item 1',link:'item1'},
      {name:'item 2',link:'item2'},
      {name:'item 3',link:'item3'}
    ];  
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
