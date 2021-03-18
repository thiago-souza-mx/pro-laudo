import React from 'react';

const View = props =>{
  let view = "../views/"+props.page; 

  let view_id = "view-"+props.page;
 
  return(
    <div id={view_id} className={props.page + " view"}>
      <header> 
        <span className="label-view">Header</span>
      </header>
      <section id="content">
        <span className="label-view">{view}</span>
        <br/>
        {props.children}
      </section>
      <footer> 
        <span className="label-view">Footer</span>
      </footer>
    </div>
  );

}


export default View;
