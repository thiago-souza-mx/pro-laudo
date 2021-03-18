import './../assets/sass/global.scss';

import Template  from "../controllers/Template"; 

const App =()=>{
  return( 
    <Template menu="home" view="home">
      Aquivai todo o meu conteúdo
    </Template>
  );
}

export default App;