const Action = {
  Logout: require('../controllers/Auth')['Logout']
}
const Button = { 
  Logout : ()=>{
    return(
      <a className="action btn btn-sm ln-1 font-28" onClick={Action.Logout}>
        <i className="fal fa-sign-out-alt"></i>     
      </a>
    );
  },

  Account: ()=>{
    return(
      <a className="action btn btn-sm ln-2 font-24" >
        <i className="fal fa-user"></i>    
      </a>
    );
  }

}

const Header = ()=>{
  return (
    <header className="d-flex"> 
      <span className="label-view">Header</span>
      <div id="header_search" className="col-8">oo</div>
      <div id="header_actions" className="col-4 d-flex justify-content-end">
        <Button.Account/>
        <Button.Logout/>
      </div>
    </header>
  );
}

export default Header;