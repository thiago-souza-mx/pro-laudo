import { createElement } from 'react';
import ReactDOM from 'react-dom';



const Modals = {
  Save : require("../modals/Save")['default'],
  Perfil : require("../modals/Perfil")['default'],
}

function Modal(props) {
// Correto! O tipo JSX pode ser uma variável começando com letra maiúscula.
const StoryModals = Modals[props.render];
return <StoryModals />;
}

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
    <Modal render={name}/>
    , modals
  );
}

export const Close = () =>{
  document.getElementById("__app").classList.remove('modal-open');
  setTimeout(()=> document.getElementById("modals").remove(),300)
}