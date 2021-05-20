import LogoSVG from "./LogoSVG"
import Language from "./Language"

export const Login = callback =>{

  return(
    <div id="__app_login" className="d-flex flex-row col-12 justify-content-center align-items-center">

      <div  className="panel-login slide-down d-flex g-primary">
       
        <div className="d-flex flex-column px-5">
          <div className="logo-login">  
            <LogoSVG/>
          </div>
          <div  className="alert alert-danger msg" style={{display:"none"}} role="alert">
          </div>
          <div className="form-group py-3">

            <input type="email" className="form-control px-3 radius font-20 p-2" id="proUser" placeholder={Language({en:"Email", pt:"Email"})}/>
            
          </div>
          <div className="form-group">

            <input type="password" className="form-control px-3 radius font-20 p-2" id="proPass" placeholder={Language({en:"Password", pt:"Senha"})}/>
          </div>
          <div className="d-grid gap-2 pt-3">
            <button type="submit"  onClick={callback} className="btn btn-block btn-primary radius btn-lg">{Language({en:"Signin", pt:"Entrar"})}</button>
          </div>
          <a href="/recover" className="text-center py-3 link-primary">
            <Language en="Recover Password" pt="Recuperar Senha"/>
          </a>

          <div className="text-center py-3">

            <Language en="No registration " pt="Não possui cadastro "/>

            <a href="/register" className="text-center px-3 btn btn-primary btn-sm radius">
              <Language en="Register" pt="Cadastrar"/>
            </a>

          </div>
        </div>

        <div className="d-flex flex-column login-banner">
        </div>

      </div>
    </div>
  );
}