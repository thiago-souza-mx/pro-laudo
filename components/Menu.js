import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog,faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons/'

const RecolheMenu = ()=>{
  let html =  document.querySelector('html');
  if(!html.classList.contains('show-menu'))
  document.querySelector('html').classList.add('show-menu');
  else
  document.querySelector('html').classList.remove('show-menu');
}
const Menu = props =>{

  let menu_id = "menu-"+props.id;
  let schema = props.schema;

  let rows = []
  
  let ul = React.createElement("UL");
  schema.forEach(item => {
    rows.push(
      <li className="menu-item">
        <a className="menu-link" href={item.link}>
          <FontAwesomeIcon icon={faCog} />
          {item.name}
        </a>
      </li>
    );
  });
  return(
    <menu id={menu_id}>
      <span className="label-view">Menu</span>
      <div className="recolhe-menu" onClick={()=>RecolheMenu()}> <FontAwesomeIcon icon={faArrowAltCircleLeft} /></div>
      <ul className="menu-sidebar">
        {rows}
      </ul>
      {props.children}
    </menu>
  );

}

export default Menu;
