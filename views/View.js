import React from 'react';

const View = props =>{
  let view = "../views/"+props.page; 

  let view_id = "view-"+props.page;
 
  return(
    <div id={view_id} className={props.page}>
      <section id="content">
        {view}
        {props.children}
      </section>
    </div>
  );

}


export default View;
