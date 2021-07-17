import { AreaEditor } from "../components/Editor";
import { Language } from "../components/Language";
const Modal  = require('../helpers/Modal');

const Home = (props)=>{ 

  const state = {
    ...props.state    
  }

  function ToggleSave(e){
    e.stopPropagation();
    let save = e.target.closest('.action');

    if(save.classList.contains('open'))
      save.classList.remove('open');
    else
      save.classList.add('open');
  }

  function SaveCloud(){
    Modal.Open({name:'Save',state})
  }

  const DownloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([document.querySelector('.ck-editor__editable').ckeditorInstance.getData()], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  const CopyTxt = ()=>{
    navigator.clipboard.writeText(_CKEditor.getData());
  }

  return (
    <div id="__home">
      
      <div id="editor" className="d-flex flex-row h-100">
          <div className="col-9 d-flex flex-column h-100 editor">            
            <AreaEditor/>
          <div className="editor-actions">
            <div className="action save">
              <button className="btn btn-primary radius" onClick={(e)=>ToggleSave(e)}>
                <i className="fas fa-save"></i>
              </button>
              <ul>
                <li onClick={SaveCloud}>
                  <i className="fas fa-cloud"></i>
                  <Language en="Save" pt="Salvar"/>
                </li>
                <li onClick={DownloadTxtFile}>
                  <i className="fas fa-save"></i>
                  <Language en="Save in PC" pt="Salvar no PC"/>
                </li>

                <li onClick={CopyTxt}>
                  <i className="fas fa-copy"></i>                  
                  <Language en="Copy" pt="Copiar"/>
                </li>
              </ul>
            </div>

          </div>
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