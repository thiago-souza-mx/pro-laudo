import React from 'react';
import Header from '../template/Header';
import Footer from '../template/Footer';

const View = props =>{

  let view_id = "view";
 
  return(
    <div id={view_id} className={"view-"+props.page + " view"}>
      <Header/>
      <section id="content">
        <ContentView page={props.page}>
          {props.children}
        </ContentView>
      </section>
      <Footer/>
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