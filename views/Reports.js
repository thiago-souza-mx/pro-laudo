import React from "react"
import { Language } from "../components/Language";
import { Close } from "../helpers/Modal";

export default class Reports extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      event: '',
      theme: 'dark',
      directorys:null
    };

    this.handleDestruct = this.handleDestruct.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSaveOptions = this.handleSaveOptions.bind(this);
    this.handleSavePC = this.handleSavePC.bind(this);
  }

  handleChange(e) {
    let elem = e.target.getAttribute('data-id');
    this.setState({[elem]: e.target.value});
  }

  handleSubmit() {

  }

  handleSavePC(){   
    const element = document.createElement("a");
    const file = new Blob([document.querySelector('.ck-editor__editable').ckeditorInstance.getData()], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    Close();

  }

  handleSaveOptions(){
    if(this.state.new_group){
      let state = {...this.state}
      state.options.push(
        { value: this.state.new_group , label: this.state.new_group },
      );

      state.new_group = '';
      this.setState(state);
    }
  }

  handleDestruct(cb) {
    this.setState({event: cb});
    Close();
  }

  handleOpenFile = (file)=>{
    console.log(file)
    file.open=true;
    sessionStorage.setItem('Current-laudo', JSON.stringify(file))
    document.querySelector('#Home a').click();
  }
  
 
  componentDidMount() {
    let config = JSON.parse(localStorage.getItem('App-config'));
    let files = JSON.parse(localStorage.getItem('Save-files'));
    if(config.theme.name == "theme-dark")
      this.setState({theme : 'light'})

    let dir = '';
    Object.keys(files).forEach(k => {
      let item = files[k]

      let file = document.createElement('div')
      file.id = item.id
      file.innerHTML = '<i class="fal fa-file font-20"></i>'+ item.name
      file.onclick = ()=> this.handleOpenFile(item)
      document.getElementById('directorys').appendChild(file)
    })

    
    //ReactDOM.render( file , document.getElementById( notif.id ) );
    
    setTimeout(()=>{
      this.setState({event:'open'});
    },200)
  }

  render(){ 
    return(
      <div id="__report">
        <h4>
          <Language en="Save Reports" pt="Laudos Salvos" />
        </h4>
        
        <div id="directorys">

   

        </div>
      </div>
    )
  }
}


