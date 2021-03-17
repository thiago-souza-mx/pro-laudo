import React, { Component } from 'react';

export default class View extends Component{
  view = "../views/"+this.props.page; 

  view_id = "view-"+this.props.page;
 
  render() {
    return(
      <div id={this.view_id} className={this.props.page}>
        <section id="content">
          {this.view}
          {this.props.children}
        </section>
      </div>
    );
  }
}
