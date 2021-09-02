import React from "react"

export class Ligthbox extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      url: `${Base.api}/search?q=${props.search ? props.search : 'nemmo'}`
    }
  }

  
  render(){
    console.log(this.props)
    return(
      <div className="w-100 px-5 py-2">
        <iframe src={this.state.url} width="100%" height="100%"/>
      </div>
    )
  }
}