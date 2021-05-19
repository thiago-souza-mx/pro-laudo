import {toggleFullScreen , startEvents } from "../helpers/ToggleScreen";
const Action = {
  Logout: require('../controllers/Auth')['Logout']
}
const Button = { 
  Logout : ()=>{
    return(
      <a className="action btn btn-sm ln-1 font-28 px-3" onClick={Action.Logout}>
        <i className="fal fa-sign-out-alt"></i>     
      </a>
    );
  },

  Account: ()=>{
    return(
      <a className="action btn btn-sm ln-2 font-24 px-3" >
        <i className="fal fa-user"></i>    
      </a>
    );
  },

  Notify: ()=>{
    return(
      <a className="action btn btn-sm ln-2 font-24 px-3" >
        <i className="fal fa-bell"></i>
      </a>
    );
  },

  ModeDesktop: ()=>{
    let setEvents = 0;
    const Expand = ()=>{
      if(setEvents == 0){
        startEvents();
        setEvents = 1;
      }
      toggleFullScreen("html");
    }
    return(
      <a className="action desktop btn btn-sm ln-2 font-24 px-3" onClick={Expand} > 
        <i className="fal fa-desktop-alt"></i>
      </a>
    );
  },

  PaletteTheme: ()=>{
    const TogglePalette = (e)=>{
      e.stopPropagation();
      let el = e.target;
      let target;
      if(el.nodeName == "a")
        target = e.target;
      else
        target = e.target.closest('a');
      
      if(target.classList.contains('open'))
        target.classList.remove('open');
      else
        target.classList.add('open');
    }

    const SelectTheme = e=>{
      e.stopPropagation();
      let data = e.target.getAttribute('data-theme');
      let themeName = false;
      let destaqName = false;

      let AppConfig = JSON.parse(localStorage.getItem('App-config'));

      if(data.indexOf('theme-')> -1){
        themeName = data;
        AppConfig.theme.name = themeName;
      }
      if(data.indexOf('destaq-')> -1){
        destaqName = data;
        AppConfig.theme.destaq = destaqName;
      }
      
      localStorage.setItem("App-config",JSON.stringify(AppConfig))

      let currentTheme = document.querySelector('html').classList;
      currentTheme.forEach(item=>{
        if( themeName){
          document.querySelector('html').classList.add(themeName);

          if(item.indexOf('theme-') > -1 )
            document.querySelector('html').classList.remove(item);           
        }

        if( destaqName){
          document.querySelector('html').classList.add(destaqName);

          if(item.indexOf('destaq-') > -1 )
            document.querySelector('html').classList.remove(item);            
        }
      })     
      
      e.target.closest('a').classList.remove('open');
    }

    return(
      <a className="action palette btn btn-sm ln-2 font-24 px-3"  onClick={TogglePalette}> 
        <i class="fal fa-palette"></i>
        <div className="palette-themes">
          <ul onClick={SelectTheme}>
            <li data-theme="destaq-light-blue"></li>
            <li data-theme="destaq-blue"></li>
            <li data-theme="destaq-dark-blue"></li>
            <li data-theme="destaq-light-purple"></li>
            <li data-theme="destaq-purple"></li>
            <li data-theme="destaq-dark-purple"></li>
            <hr></hr>
            <p>Temas</p>
            <li data-theme="theme-light"></li>
            <li data-theme="theme-dark"></li>
          </ul>
        </div>
      </a>
    );
  }

}

const Header = ()=>{

  return (
    <header className="d-flex"> 
      <span className="label-view">Header</span>
      <div id="header_search">
        <div className="radius border border-1 border-dark">
          <button className="btn btn-primary rounded-circle mic">
            <i class="fas fa-microphone-alt"></i>
          </button>
          <span className="mx-4">Clique no microfone ao lado para começar a ditar!</span>
        </div>
      </div>
      <div id="header_actions" className="d-flex justify-content-end">
        <Button.PaletteTheme/>
        <Button.ModeDesktop/>
        <Button.Notify/>
        <Button.Account/>
        <Button.Logout/>
      </div>
    </header>
  );
}

export default Header;