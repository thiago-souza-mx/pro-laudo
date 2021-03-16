import React, { Component } from 'react';

export default class Menu extends Component{

  menu_id = "menu-"+this.props.id;
  render() {
    return(
      <menu id={this.menu_id}>
        {this.props.children}
      </menu>
    );
  }
}
