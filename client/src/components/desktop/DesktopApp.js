import React, { Component } from 'react'
import { connect } from 'react-redux';
import { desktopAction } from '../../redux/actions/desktop/desktopAction'
import {TestComponent} from "./components";
import logo from '../../logo.svg';
import io from 'socket.io-client'

//styles
import './DesktopApp.scss'

const socket = io.connect()

class DesktopApp extends Component {

  componentWillMount() {
    console.log('prout du desktop')
    this.sendDeviceType()
  }

  sendDeviceType = () => {
    console.log('desktop type')  
    socket.emit('deviceType', {
        type:'desktop'
    })
  }

  testAction = () => {
    this.props.testAction()
  }

  onInputChange = (e) => {
    this.props.testAction(e.target.value)
  }

  render() {
    return (
      <div className="App desktop-app">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <input type="text" onChange={this.onInputChange}/>
          <div className="input-result">
            <p onClick={this.testAction}>{this.props.text}</p>
          </div>
          <TestComponent/>
        </header>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    text: state.desktop.text,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    testAction: (text) => dispatch(desktopAction({text}))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(DesktopApp)

