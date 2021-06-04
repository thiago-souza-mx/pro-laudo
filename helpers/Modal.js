import { createElement } from 'react';
import ReactDOM from 'react-dom';
import Perfil from "../modals/Perfil";

export const Open = name =>{
  const main = document.getElementById("__app");

  main.classList.add('modal-open')

  if(!main.querySelector('#modals')){
    let modals =  document.createElement('DIV');
    modals.id = "modals";
    modals.setAttribute('class', name)
    main.appendChild(modals);
  }

  modals.addEventListener("click", (e)=> e.stopPropagation())

  ReactDOM.render(
    <Perfil/>
    , modals
  );
}

export const Close = () =>{
  document.getElementById("__app").classList.remove('modal-open');
  setTimeout(()=> document.getElementById("modals").remove(),300)
}