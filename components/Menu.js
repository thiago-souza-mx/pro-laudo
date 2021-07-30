import {Navigate} from '../controllers/Content'
import LogoSVG from './LogoSVG'
import { Language } from './Language';
import React from 'react';



export default class Menu extends React.Component{
  constructor(props){
    super(props)
    const {id, children} = props;

    this.state = {
      ...props.state,
      id, children,
      rows : [],
      page:''
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleRecolherMenu = this.handleRecolherMenu.bind(this);
    this.handleNavigate = this.handleNavigate.bind(this);
    this.handleLinks = this.handleLinks.bind(this);
  }

  handleRecolherMenu = ()=>{
    let AppConfig = JSON.parse(localStorage.getItem("App-config"));
    let html =  document.querySelector('html');
    let classMenu = 'comprime-menu';
    if(!html.classList.contains(classMenu)){
      document.querySelector('html').classList.add(classMenu);
      AppConfig.menu.state.open = true;    
    }else{
      document.querySelector('html').classList.remove(classMenu);
      AppConfig.menu.state.open = false;
    }
  
    localStorage.setItem("App-config",JSON.stringify(AppConfig))
  }
  
  handleNavigate = props =>{
    let el = props.elem;
    let active = el.target.closest('.menu-sidebar').querySelector('.active');
    if(active){
      active.classList.remove('active');
    }
    
    if(props.href == '')
      props.href = 'Home';
  
    document.getElementById("view").classList.forEach(cls =>{
      if(cls.indexOf("view-")> -1){
        document.getElementById("view").classList.remove(cls)
      }
    })
  
    document.getElementById("view").classList.add("view-"+props.href)
    el.target.closest('a').classList.add('active');
    window.history.pushState("non-navigate", props.href, `/${props.href}`);
  
  }

  handleClick = (e)=> {
    e.preventDefault();
    let href = e.target.closest('li').getAttribute('id'); 
    let st = this.state
    st.app.page = href
    this.setState(st);   

    this.handleNavigate({
      href: href,
      elem: e
    });
  }

  handleLinks = ()=>{
    let active = location.pathname.replace("/",'')
    active = active ? active : 'Home';

    
    let rows = []
    this.state.schema.forEach((item, index) => {
      item.class = '';
      if(active == item.link)
        item.class = 'active';
      rows.push(
        <li id={item.link} className="menu-item" key={index}>
          <a className={"menu-link "+item.class} data-href={item.link} onClick={this.handleClick}>
          <i className={"menu-icon fas fa-"+item.icon}></i>
            <span className="menu-item-name"> {item.name} </span>
          </a>
        </li>
      );
    });

    this.setState({rows: rows});
  }

  componentDidMount(){
    this.handleLinks()
  }


  render(){
    return(
      <menu id={"menu-"+this.state.id}>
        <span className="label-view">Menu</span>
        <div id="applogo">      
          <LogoSVG/>
        </div>
        <ul className="menu-sidebar">
          {this.state.rows}
        </ul>
        {this.state.children}
        <div className="recolhe-menu" onClick={this.handleRecolherMenu}> <i className="far fa-arrow-circle-left"></i></div>
      </menu>
    )
  }

}


