const View = props =>{
  let view = "../views/"+props.page; 

  let view_id = "view-"+props.page;
 
  return(
    <div id={view_id} className={props.page + " view"}>
      <header> 
        <span className="label-view">Header</span>
        Header
      </header>
      <section id="content">
        <span className="label-view">{view}</span>
        {props.children}
      </section>
      <footer> 
        <span className="label-view">Footer</span>
        Footer
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
