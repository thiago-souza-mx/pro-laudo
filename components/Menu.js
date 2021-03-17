import React from 'react';

const Menu = props =>{

 let menu_id = "menu-"+props.id;
  return(
    <menu id={menu_id}>
      Meu menu TSX
      {props.children}
    </menu>
  );

}

export default Menu;
