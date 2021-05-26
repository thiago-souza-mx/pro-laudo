import './../assets/sass/global.scss'
import Template  from "../controllers/Template";
import Auth  from "../controllers/Auth";
import StartEvents  from "../helpers/ToggleScreen";

const App =()=>{
  return( 
    <Auth>
      <StartEvents/>
      <Template menu="home" view="home">
        
      </Template>      
    </Auth>
  );
}

export default App;