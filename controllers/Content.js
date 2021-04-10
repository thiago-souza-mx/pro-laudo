import React from "react";
import ReactDOM from 'react-dom';
import Load from '../components/Load'

import View  from "../views/View"; 
import {ContentView}  from "../views/View";

const components = {
    Home : require("../components/Home")['default'],
    Reports : require("../components/Reports")['default'],
    Settings: require("../components/Settings")['default']
}

function Story(props) {
  // Correto! O tipo JSX pode ser uma variável começando com letra maiúscula.
  const SpecificStory = components[props.render];
  return <SpecificStory />;
}

const Content = props =>{

  let box = props.href;
  let content = document.getElementById('content');
  let load = document.getElementById('loadPages');

  ReactDOM.render(<Load/>, load )
  content.classList.add('called');

  setTimeout(()=>{
    ReactDOM.render(
      <ContentView page={box}>
        <Story render ={props.href}></Story>
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
  
  props.href = props.href.replace('/','');

  if(props.href == '')
  props.href = 'Home'; 
  document.getElementById(props.href).querySelector('.menu-link').classList.add('active');

  Content(props);

}

export const Navigate = props =>{
  let el = props.elem;
  let active = el.target.closest('.menu-sidebar').querySelector('.active');
  if(active){
    active.classList.remove('active');
  }
  
  if(props.href == '')
  props.href = 'Home';

  el.target.closest('a').classList.add('active');
  window.history.pushState("non-navigate", props.href, `/${props.href}`);

  Content(props);
}

export default Content;

