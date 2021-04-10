import React, {Component} from 'react';
import Header from '../components/Header';

const View = props =>{

  let view_id = "view-"+props.page;
 
  return(
    <div id={view_id} className={props.page + " view"}>
      <Header/>
      <section id="content">
        <ContentView page={props.page}>
          {props.children}
        </ContentView>
      </section>
      <footer> 
        <span className="label-view">Footer</span>
        Footer
        <div id="loadPages"></div>
      </footer>
    </div>
  );

}

export const ContentView = props=>{
  let view = "../views/"+props.page; 
  return(
    <div id="contentView">
    <span className="label-view">{view}</span>
        {props.children}
    </div>
  );

}

export default View;