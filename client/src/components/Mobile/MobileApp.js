import React, { Component } from 'react'
import './index.css'
import io from 'socket.io-client'
const socket = io.connect()

class Mobile extends Component {
  constructor (props) {
    super(props)

    this.state = {
        room: 'hello'
    }
  }

  componentWillMount() {
    this.sendDeviceType()
    this.getCurrentRoom()
  }

  sendDeviceType = () => {
    console.log('mobile type')  
    socket.emit('deviceType',{
        type:'mobile'
    })
  }

  getCurrentRoom = () => {
    socket.on('connectToRoom',(data) => {
        console.log(data)
        this.setState({room : data})
     });
  }

  render() {
    const { room } = this.state

    return (
      <div className="App App-Mobile">
        <header className="App-header">
          <p>
            Mobile - {room}
          </p>
          
        </header>
      </div>
    )
  }
}

export default Mobile

