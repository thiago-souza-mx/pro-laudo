import Editor from "./Editor";

const Home =()=>{
  return (
    <div id="__home">
      <div id="editor" className="d-flex flex-row h-100">
        <div className="col-9 d-flex flex-column h-100">
          <Editor/>
        </div>

        <div id="__list_actions" className="col-3">
          <ul className="scrolling">
            <li>
              <i className="fas fa-pen-alt"></i> 
              <div className="text">
                <span className="nameaction">AÇÃO 1</span>              
                <small>texto descritivo</small>
              </div>
            </li>

            <li>
              <i className="fas fa-text"></i> 
              <div className="text">
                <span className="nameaction">AÇÃO 2</span>              
                <small>texto descritivo</small>
              </div>
            </li>

            <li>
              <i className="fas fa-file-search"></i> 
              <div className="text">
                <span className="nameaction">AÇÃO 3</span>              
                <small>texto descritivo</small>
              </div>
            </li>

            <li>
              <i className="fas fa-save"></i> 
              <div className="text">
                <span className="nameaction">AÇÃO 4</span>              
                <small>texto descritivo</small>
              </div>
            </li>

            <li>
              <i className="fas fa-notes-medical"></i> 
              <div className="text">
                <span className="nameaction">AÇÃO 5</span>              
                <small>texto descritivo</small>
              </div>
            </li>

            <li>
              <i className="fas fa-cog"></i> 
              <div className="text">
                <span className="nameaction">AÇÃO 6</span>              
                <small>texto descritivo</small>
              </div>
            </li>

            <li>
              <i className="fas fa-sliders-h-square"></i> 
              <div className="text">
                <span className="nameaction">AÇÃO 7</span>              
                <small>texto descritivo</small>
              </div>
            </li>
        
          </ul>

        </div>
        
      </div>
    </div>
  );
}

export default Home;