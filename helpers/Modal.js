import ReactDOM from 'react-dom';

const Modals = {
  Save : require("../modals/Save")['default'],
  Profile : require("../modals/Profile")['default'],
  WebSearch : require("../modals/WebSearch")['default'],
}


function Modal({render, state}) {
  const StoryModals = Modals[render];
  return <StoryModals state={state} />;
}

export const Open = ({name, state}) =>{
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
    <Modal render={name} state={state}/>
    , modals
  );
}

export const Close = () =>{
  document.getElementById("__app").classList.remove('modal-open');
  setTimeout(()=> document.getElementById("modals").remove(),300)
}


const ModalPages = {
  Profile : require("../modals/Profile/Profile")['default'],
  Preferences : require("../modals/Profile/Preferences")['default'],
}
export const ModalPage = ({render, state, handles}) =>{
  if (render){
  const StoryModals = ModalPages[render];
  return <StoryModals state={state} handles={handles} />;
  }else{
    return '';
  }
}