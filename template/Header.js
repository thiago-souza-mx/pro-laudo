import { Speech, state } from "../controllers/Speech";
import { Language } from "../components/Language";
import StartEvents from "../helpers/ToggleScreen";

const StateSpeech = state;

const Action = {
  Logout            : require('../controllers/Auth')['Logout'],
  TogglePalette     : require('../helpers/Theme')['TogglePalette'],
  SelectTheme       : require('../helpers/Theme')['SelectTheme'],
  Expand            : require('../helpers/ToggleScreen')['toggleFullScreen'],
  ToggleMicrophone  : require('../helpers/ToggleMicrophone')['ToggleMicrophone'],
  GetQRcode         : require('../helpers/QRcode')['GetQRcode'],
  Modal             : require('../helpers/Modal')['Open']
}
const Button = { 
  Logout : ({state})=>{
    
    return(
      <a className="action btn btn-sm ln-1 font-28 px-3" onClick={()=> state.auth.logado = false}>
        <i className="fal fa-sign-out-alt"></i>     
      </a>
    );
  },

  Account: ({state})=>{
    return(
      <a className="action btn btn-sm ln-2 font-24 px-3" onClick={()=>Action.Modal({name:'Profile',state:state})}>
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
    StartEvents()
    return(
      <a className="action desktop btn btn-sm ln-2 font-24 px-3" onClick={Action.Expand} > 
        <i className="fal fa-desktop-alt"></i>
      </a>
    );
  },

  PaletteTheme: ()=>{
    return(
      <a className="action palette btn btn-sm ln-2 font-24 px-3"  onClick={Action.TogglePalette}> 
        <i className="fal fa-palette"></i>
        <div className="palette-themes">
          <ul onClick={Action.SelectTheme}>
            <li data-theme="destaq-light-blue"></li>
            <li data-theme="destaq-blue"></li>
            <li data-theme="destaq-dark-blue"></li>
            <li data-theme="destaq-light-purple"></li>
            <li data-theme="destaq-purple"></li>
            <li data-theme="destaq-dark-purple"></li>
            <hr></hr>
            <p>
              <Language en="Themes" pt="Temas"/>
            </p>
            <li data-theme="theme-light"></li>
            <li data-theme="theme-dark"></li>
          </ul>
        </div>
      </a>
    );
  },

  Microphone: ({state})=>{
    
    
    state.Speech = StateSpeech;
    Speech({Microphone:state.Microphone});
    return(
      <div data-microphone="button" className={`radius border border-1 border-dark ${state.Microphone.status}`}>
        <button className={`btn btn-primary rounded-circle mic `} onClick={(e)=>{
          Action.ToggleMicrophone(e, state);
        }}>
          {state.Microphone.icon}
        </button>
        <span className="mx-4" data-microphone="message">          
          {state.Microphone.phrase}
        </span>
      </div>
    );
  },
  QRcode: ()=>{
    return(
      <div data-microphone="button" className="radius">
        <button className="btn btn-primary rounded-circle mic" onClick={Action.GetQRcode}>
          <i className="fas fa-qrcode"></i>
        </button>
        <div id="qrcode">
          <div className="code"></div>
        </div>
      </div>
    );
  }

}

const Header = ({state})=>{

 
  return (
    <header className="d-flex"> 
      <span className="label-view">Header</span>
      <div id="header_search">

        <Button.Microphone state={state}/>

      </div>
      <div id="header_actions" className="d-flex justify-content-end">
        {/*<Button.PaletteTheme/>*/}
        <Button.ModeDesktop/>
        <Button.Notify/>
        <Button.Account state={state} />
        <Button.QRcode/>
        <Button.Logout state={state} />
      </div>
    </header>
  );
}

export default Header;