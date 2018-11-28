import React, { Component } from 'react'
import './index.css'
import io from 'socket.io-client'
const socket = io.connect()

class Mobile extends Component {

  componentWillMount() {
    this.sendDeviceType()
  }

  sendDeviceType = () => {
    console.log('mobile type')  
    socket.emit('deviceType',{
        type:'mobile'
    })
  }

  render() {
    return (
      <div className="App App-Mobile">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <p>
            Mobile
          </p>
        </header>
      </div>
    )
  }
}

export default Mobile

