import React from 'react';
import Header from '../template/Header';
import Footer from '../template/Footer';
import Content from '../controllers/Content';

const View = ({state, handleState, page, children}) =>{
  let view_id = "view";
 
  return(
    <div id={view_id} className={"view-"+page + " view"}>
      <Header state={state} handleState={handleState}/>
      <section id="content">       
        <Content state={state}/>
      </section>
      <Footer state={state} />
    </div>
  );

}

export const ContentView = ({page, state, children})=>{
  let view = "../views/"+page; 

  console.log(children)
  return(
    <div id="contentView">
    <span className="label-view">{view}</span>
        {children}
    </div>
  );

}


export const Views = {
  Home : require("./Home")['default'],
  Reports : require("./Reports")['default'], 
  LastReports: require("./Reports/Last")['default'],
  TrashReports: require("./Reports/Trash")['default'],
  Settings: require("./Settings")['default'],
}

export default View;