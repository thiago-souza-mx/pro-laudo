const Action = {
  Logout            : require('../controllers/Auth')['Logout'],
  TogglePalette     : require('../helpers/Theme')['TogglePalette'],
  SelectTheme       : require('../helpers/Theme')['SelectTheme'],
  Expand            : require('../helpers/ToggleScreen')['toggleFullScreen'],
  ToggleMicrophone  : require('../helpers/Microphone')['ToggleMicrophone'],
  GetQRcode         : require('../helpers/QRcode')['GetQRcode']
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
    return(
      <a className="action desktop btn btn-sm ln-2 font-24 px-3" onClick={Action.Expand} > 
        <i className="fal fa-desktop-alt"></i>
      </a>
    );
  },

  PaletteTheme: ()=>{
    return(
      <a className="action palette btn btn-sm ln-2 font-24 px-3"  onClick={Action.TogglePalette}> 
        <i class="fal fa-palette"></i>
        <div className="palette-themes">
          <ul onClick={Action.SelectTheme}>
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
  },

  Microphone: ()=>{
    return(
      <div data-microphone="button" className="radius border border-1 border-dark">
        <button className="btn btn-primary rounded-circle mic" onClick={Action.ToggleMicrophone}>
          <i class="fas fa-microphone-alt"></i>
        </button>
        <span className="mx-4" data-microphone="message">Clique no microfone ao lado para começar a ditar!</span>
      </div>
    );
  },
  QRcode: ()=>{
    return(
      <div data-microphone="button" className="radius border border-1 border-dark">
        <button className="btn btn-primary rounded-circle mic" onClick={Action.GetQRcode}>
          <i class="fas fa-qrcode"></i>
        </button>
        <div id="qrcode">
          <div className="code"></div>
        </div>
      </div>
    );
  }

}

const Header = ()=>{

  return (
    <header className="d-flex"> 
      <span className="label-view">Header</span>
      <div id="header_search">

        <Button.Microphone/>

      </div>
      <div id="header_actions" className="d-flex justify-content-end">
        <Button.PaletteTheme/>
        <Button.ModeDesktop/>
        <Button.Notify/>
        <Button.Account/>
        <Button.QRcode/>
        <Button.Logout/>
      </div>
    </header>
  );
}

export default Header;