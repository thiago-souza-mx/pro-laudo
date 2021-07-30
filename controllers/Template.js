import Menu from "../components/Menu"; 
import View  from "../views/View"; 
import { Views } from '../views/View';
import React from 'react';
import ReactDOM from 'react-dom';
import Load from '../components/Load'

export default class Template extends React.Component{
  constructor(props){
    super(props)
    const {state, menu, children} = props;
    this.state = {
      ...state,
      menu,
      children,
      app : {
        _handleSetView : this.handleSetView.bind(this),
        _page:'',
        get page(){
          return this._page;
        },
        set page(v){
          this._handleSetView(v)
          this._page = v;
        },
        view:''
      }
    }    
  }

  handleSetView( _view ){

    let content = document.getElementById('content');
    let load = document.getElementById('loadPages');
    
    ReactDOM.render(<Load/>, load )
    content.classList.add('called');

    const View = Views[_view];
    let st = this.state
    st.app.view = <View state={this.state} />
    this.setState(st);
    
    setTimeout(()=>{
      content.classList.remove('called');
      ReactDOM.unmountComponentAtNode(load);
    },1000);
  }
 
  componentDidMount(){ 
    let AppConfig = JSON.parse(localStorage.getItem('App-config'));
    if(AppConfig.menu.state.open){
      document.querySelector('html').classList.add('comprime-menu');
    }
    document.querySelector('html').classList.add(AppConfig.theme.name);
    document.querySelector('html').classList.remove('lang-pt');
    document.querySelector('html').classList.remove('lang-en');
    document.querySelector('html').classList.add('lang-'+AppConfig.language);

    document.addEventListener("click",function(){
      document.querySelectorAll('.open').forEach(item=>{
        item.classList.remove('open');
      })
    })
    setTimeout(()=>{ document.getElementById('template').classList.remove('hide');},400);
  }
  
  render(){
    return(
      <div id="template" className="hide"> 
        <Menu id={this.state.menu} state={this.state}/>
        <View page={this.state.app.page} state={this.state}/>
      </div>
    )
  } 
}


