import React from "react";
import {render} from 'react-dom';

import {ContentView}  from "../views/View";

const Content = props =>{
  console.log(props)
  let box = props.href;
  let content = document.getElementById('content');

  content.classList.add('called');
  setTimeout(()=>{
    
    render(
      <ContentView page={box}>
        <h1>Carregou:</h1>
        <br/>{box}
      </ContentView>
      , document.getElementById('content')
    );

    content.classList.remove('called')
  }, 1000)

}

export const Navigate = props =>{
  let el = props.elem;
  let active = el.target.closest('.menu-sidebar').querySelector('.active');
  if(active){
    active.classList.remove('active');
  }
  el.target.closest('a').classList.add('active');
  window.history.pushState("non-navigate", props.href, `/${props.href}`);

  Content(props);
}

export default Content;

