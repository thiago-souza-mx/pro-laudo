export const ToggleMicrophone = (e , state )=>{
  let $this = e.target.closest('[data-microphone=button]');
  let button = $this.querySelector('button');
  let message = $this.querySelector('[data-microphone=message]');

  if($this.classList.contains('microphone-active')){
    state.stop();
    $this.classList.remove('microphone-active');
    message.innerText = 'Clique no microfone ao lado para começar a ditar!';
  }else{
    state.start()
    $this.classList.add('microphone-active');
    message.innerText = 'Comece a falar, estou te escutando!';
  }
}