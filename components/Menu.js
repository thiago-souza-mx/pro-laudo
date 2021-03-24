import {Navigate, Content} from '../controllers/Content'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/'
const Icons = require('@fortawesome/free-solid-svg-icons/');


const RecolheMenu = ()=>{
  let AppConfig = JSON.parse(localStorage.getItem("App-config"));
  let html =  document.querySelector('html');
  let classMenu = 'comprime-menu';
  if(!html.classList.contains(classMenu)){
    document.querySelector('html').classList.add(classMenu);
    AppConfig.menu.state.open = true;    
  }else{
    document.querySelector('html').classList.remove(classMenu);
    AppConfig.menu.state.open = false;
  }

  localStorage.setItem("App-config",JSON.stringify(AppConfig))
}

const handleClick = (e)=> {
  e.preventDefault();
  let href = e.target.closest('a').getAttribute('data-href'); 
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
      <li id={item.link} className="menu-item" key={index}>
        <a className={"menu-link "+item.class} data-href={item.link} onClick={handleClick}>
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
