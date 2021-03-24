import React from "react";
import ReactDOM from 'react-dom';
import Load from '../components/Load'


import {ContentView}  from "../views/View";

const Content = props =>{
  let box = props.href;
  let content = document.getElementById('content');
  let load = document.getElementById('loadPages');
  ReactDOM.render(<Load/>, load )
  content.classList.add('called');
  
  setTimeout(()=>{
    ReactDOM.render(
      <ContentView page={box}>
        <h1>Carregou:</h1>
        <br/>{box}
      </ContentView>
      , content
    );

    content.classList.remove('called');
    ReactDOM.unmountComponentAtNode(load);
  }, 1000)

}

export const LoadContent = props=>{

  let active = document.querySelector('.menu-sidebar .active');
  if(active){
    active.classList.remove('active');
  }
  let href = props.href;
  href = href.replace('/','');
  document.getElementById(href).querySelector('.menu-link').classList.add('active');

  Content(props);

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

