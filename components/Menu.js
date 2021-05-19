import {Navigate, Content} from '../controllers/Content'

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
      <li id={item.link || item.name} className="menu-item" key={index}>
        <a className={"menu-link "+item.class} data-href={item.link} onClick={handleClick}>
        <i className={"menu-icon fas fa-"+item.icon}></i>
          <span className="menu-item-name">{item.name}</span>
        </a>
      </li>
    );
  });

  return(
    <menu id={menu_id}>
      <span className="label-view">Menu</span>
      <div id="applogo">      
        <svg  className="logo-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1390.44 308.27"><path d="M264.66,382.84V657.16h88.17V464.55s4.46-.09,35.2.46c51,.92,68.91,37.6,68.91,102.27,0,60.08,0,89.88,0,89.88h87.74s-.7-13.58-.7-110.77S506.46,382.84,418.38,382.84Z" transform="translate(-264.66 -365.86)"></path><path d="M841.87,520c-5.22-77.75-65.17-141.09-143.09-141.09a141.09,141.09,0,1,0,98.13,242.46l-54.19-46s-15.9,16.68-48.87,16.68c-15.54,0-32.58-8.4-42.9-18a57.47,57.47,0,0,1-14.63-21.61h205.8C843.44,540.42,842.65,531.55,841.87,520ZM634.19,500.34a68.07,68.07,0,0,1,63.74-44.19c28.92,0,53.63,19.05,63.48,44.5Z" transform="translate(-264.66 -365.86)"></path><polygon className="cls-2" points="592.46 0 592.46 308.27 665.83 259.6 665.83 49.1 592.46 0"></polygon><polygon className="cls-3" points="674.61 0 674.61 308.27 747.99 259.6 747.99 49.1 674.61 0"></polygon><polygon className="cls-4" points="753.76 0 753.76 308.27 827.14 259.6 827.14 49.1 753.76 0"></polygon><polygon className="cls-5" points="1092.85 0 1092.85 308.27 1019.48 259.6 1019.48 49.1 1092.85 0"></polygon><polygon className="cls-6" points="1010.7 0 1010.7 308.27 937.33 259.6 937.33 49.1 1010.7 0"></polygon><polygon className="cls-7" points="931.55 0 931.55 308.27 858.17 259.6 858.17 49.1 931.55 0"></polygon><path d="M1512.21,377.12A142.88,142.88,0,1,0,1655.09,520,142.88,142.88,0,0,0,1512.21,377.12Zm0,203.25A60.37,60.37,0,1,1,1572.58,520,60.37,60.37,0,0,1,1512.21,580.37Z" transform="translate(-264.66 -365.86)"></path></svg>
      </div>
      <ul className="menu-sidebar">
        {rows}
      </ul>
      {props.children}
      <div className="recolhe-menu" onClick={RecolheMenu}> <i className="far fa-arrow-circle-left"></i></div>
    </menu>
  );

}

export default Menu;
