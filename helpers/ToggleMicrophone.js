import { Language } from "../components/Language";

export const ToggleMicrophone = (e , {Speech, Microphone} )=>{

  let $this = e.target.closest('[data-microphone=button]');
  if($this.classList.contains('microphone-active')){
    Speech.stop();
    $this.classList.remove('microphone-active');
    Microphone.phrase = <Language en="Click on the microphone on the side to start dictating!"  pt="Clique no microfone ao lado para começar a ditar!"/>;
  }else{
    Speech.start()
    $this.classList.add('microphone-active');
    Microphone.phrase = <Language en="Start talking, I'm listening to you!" pt="Comece a falar, estou te escutando!" />;
  }
}