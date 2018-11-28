import React, { Component } from 'react'
// import logo from './logo.svg'
import './index.css'
import io from 'socket.io-client'
const socket = io.connect()

class Desktop extends Component {

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

  render() {
    return (
      <div className="App App-Desktop">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <p>
            Desktop
          </p>
        </header>
      </div>
    )
  }
}

export default Desktop

