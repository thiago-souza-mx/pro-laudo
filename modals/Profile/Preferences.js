import React from "react"
import { EN, Language, PT } from "../../components/Language";
import { SelectTheme, SetTheme } from "../../helpers/Theme";


export default class Preferences extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      ...props.state,
      lang : 'pt',
      themeName:''
    }

    this.handleFlip = props.handles.handleFlip;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClickLanguage = this.handleClickLanguage.bind(this);
    this.handleSetTheme = this.handleSetTheme.bind(this);
  }

  handleChange(e) {
    let elem = e.target.getAttribute('data-id');
    this.setState({[elem]: e.target.value});    
  }

  handleClickLanguage(_language){
    document.querySelectorAll('.settings .languages .active').forEach(res=> res.classList.remove('active') );
    document.querySelectorAll('.settings .languages .'+_language).forEach(res=> res.classList.add('active') );
    this.setState({lang: _language});

    console.log(this.state)
  }

  handleSetTheme(themeName){
    document.querySelectorAll('.settings .theme button').forEach(item=>{
      item.classList.remove('active')
    })
    document.querySelector('.settings .theme button.'+themeName).classList.add('active')
    this.setState({themeName:themeName})
  }

  handleSubmit(){
    const config = JSON.parse(localStorage.getItem('App-config'));
    localStorage.setItem( 'App-config', JSON.stringify({ ...config, language: this.state.lang  }) )
    
    if(document.querySelector('html').classList.contains('lang-pt'))
      document.querySelector('html').classList.remove('lang-pt')
    else
      document.querySelector('html').classList.remove('lang-en')

    document.querySelector('html').classList.add('lang-'+this.state.lang)
    this.handleFlip(true)
    let st = this.state;
    st.config.language = this.state.lang
    st.config.theme.name = this.state.themeName;
    SetTheme( this.state.themeName );
    this.setState(st);
  }

  componentDidMount(){

    if(document.querySelector('html').classList.contains('lang-pt'))
      document.querySelectorAll('.settings .pt').forEach(res=> res.classList.add('active') );
    else
      document.querySelectorAll('.settings .en').forEach(res=> res.classList.add('active') );
      this.setState({themeName: this.state.config.theme.name});
  }

  render(){ 
    return(
      <div style={{display:"contents"}}>

        <div className="d-flex col-12 flex-1 panel-flip">

          <div className="col-3 col-md-2 text-center avatar aside-modal p-3 d-flex flex-column">
            <div className="flex-1">
              <i className="fad fa-user-cog font-100"></i>
            </div>

            <div>              
              <button className={`me-2 btn btn-${this.state.config.theme.name == 'theme-dark' ? 'light' : 'dark' }`} onClick={()=> this.handleFlip()}>
                <i className="fas fa-arrow-left"></i>
              </button>
              <button className={`btn btn-${this.state.config.theme.name == 'theme-dark' ? 'info' : 'primary' }`} onClick={()=> this.handleSubmit(this.state)}>
                <Language en="Save" pt="Salvar" />
              </button>
            </div>

          </div>

          <div className="col-9 col-md-10 settings p-3">
            <ul>
              <h4 className="title-separator"><Language en="Language" pt="Idioma" /></h4>
              <div className="p-4 languages">
  
                <li className="d-flex lang">
                  <Language en="Interface" pt="Interface" />:
                  <button className="btn d-flex mx-2 pt" onClick={()=> this.handleClickLanguage('pt')}><PT/></button>
                  <button className="btn d-flex en" onClick={()=> this.handleClickLanguage('en')}><EN/></button>

                  <i className="ms-3"> {this.state.lang.toUpperCase()}</i>
                </li>

                <li className="d-flex lang">
                  <Language en="Voice recognition" pt="Reconhecimento de voz" />:
                  <button className="btn d-flex mx-2 pt" onClick={()=> this.handleClickLanguage('pt')}><PT/></button>
                  <button className="btn d-flex en" onClick={()=> this.handleClickLanguage('en')} ><EN/></button>

                  <i className="ms-3"> {this.state.lang.toUpperCase()}</i>
                </li>

              </div>

              <h4 className="title-separator"><Language en="Theme" pt="Tema" /></h4>
              <div className="theme p-4">
                <button className={`theme-light mx-2 px-5 btn btn-outline-${this.state.config.theme.name == 'theme-dark' ? 'light' : 'dark' } ${this.state.config.theme.name != 'theme-dark' ? 'active' :'' }`} onClick={()=> this.handleSetTheme("theme-light")}> Light </button>
                <button className={`theme-dark mx-2 px-5 btn btn-outline-${this.state.config.theme.name == 'theme-dark' ? 'light' : 'dark' } ${this.state.config.theme.name == 'theme-dark' ? 'active' :'' }`} onClick={()=> this.handleSetTheme("theme-dark")}> Dark </button>     
              </div>

            </ul>
          </div>            
        </div>

      </div>
    )
  }
}