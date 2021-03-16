import React, { Component } from 'react';
import Menu from "../components/Menu"; 
import View  from "../views/View"; 

export default class Template extends Component{
  view = "../views/"+this.props.menu; 
 
  render() {
    return(
      <div id="template">
        <header></header>
        <Menu id={this.props.menu}>       
        </Menu>

        <View page={this.props.view}>
          {this.props.children}
        </View>
      </div>
    );
  }
}
