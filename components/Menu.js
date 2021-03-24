import {Navigate, Content} from '../controllers/Content'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/'
const Icons = require('@fortawesome/free-solid-svg-icons/');

const RecolheMenu = ()=>{
  let html =  document.querySelector('html');
  if(!html.classList.contains('show-menu'))
  document.querySelector('html').classList.add('show-menu');
  else
  document.querySelector('html').classList.remove('show-menu');
}

const handleClick = (e)=> {
  e.preventDefault();
  let href = e.target.closest('a').getAttribute('href'); 
  Navigate({
    href: href,
    elem: e
  });
}

const Menu = props =>{

  let menu_id = "menu-"+props.id;
  let schema = props.schema;

  let rows = []
  schema.forEach((item, index) => {
    rows.push(
      <li className="menu-item" key={index}>
        <a className="menu-link" href={item.link} onClick={handleClick}>
          <FontAwesomeIcon icon={Icons[item.icon]} />
          <span className="menu-item-name">{item.name}</span>
        </a>
      </li>
    );
  });

  return(
    <menu id={menu_id}>
      <span className="label-view">Menu</span>
      <div className="recolhe-menu" onClick={RecolheMenu}> <FontAwesomeIcon icon={Icons.faArrowAltCircleLeft} /></div>
      <ul className="menu-sidebar">
        {rows}
      </ul>
      {props.children}
    </menu>
  );

}

export default Menu;
