import React from "react"
import { Language } from "../../components/Language";
import User from "../../controllers/User";

export default class LastReports extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      ...props.state,
      event: '',
      theme: 'dark',
      directorys:null,
      files: null
    };

     this.handleDeleteFile = this.handleDeleteFile.bind(this);
     this.handleOpenFile = this.handleOpenFile.bind(this);
     this.handleList = this.handleList.bind(this);
  }

  handleOpenFile = (file)=>{
    file.open = true;
    User.setOpenFile(file.id)    
    document.querySelector('#Home a').click();
  }

  handleDeleteFile = (e, id) =>{
    e.stopPropagation();
    console.log(id)
    User.DeleteFile(id)
    this.handleList();
  }

  handleList = () =>{
    let files = User.getFiles( false )
    let st_files = document.createElement('div');
    if(files){

      

      Object.keys(files).reverse().forEach(k => {
        let item = files[k]
        let file = document.createElement('div')
        var date = new Date(item.created_at); // converte para data
        file.id = item.id
        file.setAttribute('class','file')
        file.innerHTML = `<i class="fal fa-file font-20"></i>
          <div class="file-name">
            ${item.name}
          </div>
          <div class="editing">
            ${item.open ? `<i>${Language({pt:"Editando", en:"Editing"})}</i>`: ''}
          </div>
          <div class="date">
            ${date.toLocaleString("pt-BR")}
          </div>`;
        file.onclick = ()=> this.handleOpenFile(item)

        let delet = document.createElement('div')
        delet.setAttribute('class','delete-file')
        delet.innerHTML = '<i class="far fa-trash-alt"></i>'
        delet.onclick = (e)=> this.handleDeleteFile(e, item.id)
        file.appendChild(delet);
        
        st_files.appendChild(file);
      })
    }


    document.getElementById('directorys').innerHTML = '';
    document.getElementById('directorys').appendChild(st_files)
  }
  
 
  componentDidMount() {
    
    this.handleList();
    
    setTimeout(()=>{
      this.setState({event:'open'});
    },200)
  }

  render(){ 
    return(
      <div id="__report">
        <h4 className="title">
          <Language en="Last Reports" pt="Últimos Laudos" />
        </h4>        
        <div id="directorys">
        </div>
      </div>
    )
  }
}


