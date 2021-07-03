import { Language } from "../components/Language";

export const ToggleMicrophone = (e , state )=>{
  let $this = e.target.closest('[data-microphone=button]');
  if($this.classList.contains('microphone-active')){
    state.stop();
    $this.classList.remove('microphone-active');
    setMessageAction( Language({en:"Click on the microphone on the side to start dictating!", pt:"Clique no microfone ao lado para começar a ditar!"}) );
  }else{
    state.start()
    $this.classList.add('microphone-active');
    setMessageAction( Language({en:"Start talking, I'm listening to you!", pt:"Comece a falar, estou te escutando!"}) );
  }
}

export const setMessageAction = message =>{
  let action = document.querySelector('[data-microphone=message]');
  action.innerText = message;
}

export const Voice = audio=>{
  new Audio(`/voices/${encodeURI(audio)}.mp3`).play();
  setMessageAction(audio);
}