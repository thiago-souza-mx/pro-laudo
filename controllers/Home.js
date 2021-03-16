import React, { Component } from 'react';

export default class Home extends Component{
 
  render() {
    return <div id={this.props.id}>{this.props.children}</div>
  }
}
