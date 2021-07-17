import 'regenerator-runtime/runtime';
import React,{useState} from 'react';
import './../assets/sass/global.scss'
import Auth  from "../controllers/Auth";
import Global from "../controllers/Config";

const App =()=>{
  const [state, handleState] = useState([]);

  state.auth = {};
  state.config = {};
  return( 
    <Auth state={state} />   
  );
}

export default App;