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
    return(
      <a className="action btn btn-sm ln-2 font-24 px-3" > 
        <i className="fal fa-desktop-alt"></i>
      </a>
    );
  }

}

const Header = ()=>{
  return (
    <header className="d-flex"> 
      <span className="label-view">Header</span>
      <div id="header_search" className="col-8">
        <div className="radius border border-1 border-dark">
          <button className="btn btn-primary rounded-circle mic">
            <i class="fas fa-microphone-alt"></i>
          </button>
          <span className="mx-4">Clique no microfone ao lado para começar a ditar!</span>
        </div>
      </div>
      <div id="header_actions" className="col-4 d-flex justify-content-end">
        <Button.ModeDesktop/>
        <Button.Notify/>
        <Button.Account/>
        <Button.Logout/>
      </div>
    </header>
  );
}

export default Header;