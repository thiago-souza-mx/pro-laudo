import React from 'react'

export default class NotificationEditor extends React.Component{
  constructor(props){
    super(props)

    this.state={
      ...props.notification,
    }

    this.handleStageOff = this.handleStageOff.bind(this)
  }
  
  handleStageOff = ()=>{
    this.setState({stage:'off'})
  }

  componentDidMount(){
    setTimeout(()=> this.setState({stage:'on'}), 50  )
    setTimeout(()=> this.handleStageOff() , 10000  )
  }

  render(){
    return(
    <div className={`notification-editor ${this.state.role} ${this.state.stage}`}>
      <div className="message">
        {this.state.message}
      </div>
      <div>
        <i className="far fa-times" onClick={this.handleStageOff}></i>
      </div>
    </div>
  )}
  
}