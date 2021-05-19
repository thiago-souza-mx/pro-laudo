const state = {
  change: 0
}
export function toggleFullScreen() {

  var div = document.querySelector('html');

  if ((document.fullScreenElement && document.fullScreenElement !== null) ||
    (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (div.requestFullScreen) {
      div.requestFullScreen();
    } else if (div.mozRequestFullScreen) {
      div.mozRequestFullScreen();
    } else if (div.webkitRequestFullScreen) {
      div.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
}

const StartEvents = ()=>{

  if(state.change)
    return "";
  else
    state.change = 1;

  function  changeFullscreen(){
    if(document.querySelector("body.expand")){
      document.body.classList.remove('expand');
    }else{
      document.body.classList.add('expand');
    }
  }

  document.addEventListener("fullscreenchange", function() {
    changeFullscreen();
  });
  document.addEventListener("mozfullscreenchange", function() {
    changeFullscreen();
  });
  document.addEventListener("webkitfullscreenchange", function() {
    changeFullscreen();
  });
  document.addEventListener("msfullscreenchange", function() {
    changeFullscreen();
  });

  return "";
}

export default StartEvents;