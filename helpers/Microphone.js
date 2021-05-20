export const ToggleMicrophone = (e)=>{
  let $this = e.target.closest('[data-microphone=button]');
  let button = $this.querySelector('button');
  let message = $this.querySelector('[data-microphone=message]');

  if($this.classList.contains('microphone-active')){
    $this.classList.remove('microphone-active');
    message.innerText = 'Clique no microfone ao lado para começar a ditar!';
  }else{
    $this.classList.add('microphone-active');
    message.innerText = 'Começe a falar, estou te escutando!';
  }
}