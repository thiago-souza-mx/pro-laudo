import React from "react";
import {ContentView}  from "../views/View";

export default class Content extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      ...props.state,      
    }
    
  }
  componentDidMount(){
    let page = location.pathname.replace("/","");
    let st = this.state
    st.app.page = page ? page : 'Home';
    this.setState(st);  
  }
  
  render(){
    return(
      <ContentView page={this.state.href}>
        {this.state.app.view}
      </ContentView>
    )
  }
}

/*export const LoadContent = props=>{

  let active = document.querySelector('.menu-sidebar .active');
  if(active){
    active.classList.remove('active');
  }
  
  props.href = props.href.replace('/','');

  if(props.href == '')
  props.href = 'Home'; 

  document.getElementById("view").classList.forEach(cls =>{
    if(cls.indexOf("view-")> -1){
      document.getElementById("view").classList.remove(cls)
    }
  })
  document.getElementById("view").classList.add("view-"+props.href.toLowerCase())
 
  document.getElementById(props.href).querySelector('.menu-link').classList.add('active');

}*/




