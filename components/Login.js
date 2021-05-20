import LogoSVG from "./LogoSVG"
import {PT,Language, EN} from "./Language"

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

            <input type="email" className="form-control px-3 radius font-20 p-2" id="proUser" />
            
          </div>
          <div className="form-group">

            <input type="password" className="form-control px-3 radius font-20 p-2" id="proPass" />
          </div>
          <div className="d-grid gap-2 pt-3">
            <button type="submit"  onClick={callback} className="btn btn-block btn-primary radius btn-lg"></button>
          </div>
          <a href="/recover" className="text-center py-3 link-primary">
           
          </a>

          <div className="text-center py-3">

            

            <a href="/register" className="text-center px-3 btn btn-primary btn-sm radius">
              
            </a>

          </div>
        </div>

        <div className="d-flex flex-column login-banner">
        </div>

      </div>

      <div id="languages" className="d-flex justify-content-center align-items-center">
        <Language en="Languages" pt="Idiomas"/>

      </div>
    </div>
  );
}