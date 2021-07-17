import React from 'react';
import Header from '../template/Header';
import Footer from '../template/Footer';

const View = ({state, handleState, page, children}) =>{

  let view_id = "view";
 
  return(
    <div id={view_id} className={"view-"+page + " view"}>
      <Header state={state} handleState={handleState}/>
      <section id="content">
        <ContentView page={page} state={state} handleState={handleState}>
          {children}
        </ContentView>
      </section>
      <Footer state={state} handleState={handleState}/>
    </div>
  );

}

export const ContentView = ({page, children})=>{
  let view = "../views/"+page; 
  return(
    <div id="contentView">
    <span className="label-view">{view}</span>
        {children}
    </div>
  );

}

export default View;