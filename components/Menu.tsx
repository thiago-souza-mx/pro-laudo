import React from 'react';

const Menu = props =>{

 let menu_id = "menu-"+props.id;
  return(
    <menu id={menu_id}>
      <div>Meu menu</div>
      {props.children}
    </menu>
  );

}

export default Menu;
