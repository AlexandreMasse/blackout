import React, { Component } from 'react'
import './index.css'
import io from 'socket.io-client'
// const socket = io.connect()
const socket = io.connect("http://localhost:80")

class Mobile extends Component {
  constructor (props) {
    super(props)

    this.state = {
        room: 'hello',
        userId: null,
        code: 'null'
    }
  }

  componentWillMount() {
    this.sendDeviceType()
    this.getCurrentRoom()
    this.checkUserConnection()
    this.disconnected()
  }

  sendDeviceType = () => {
    console.log('mobile type')  
    socket.emit('deviceType',{
        type:'mobile'
    })
  }

  getCurrentRoom = () => {
    socket.on('connectToRoom',(data) => {
        this.setState({room : data.room})
        this.setState({userId : data.userId})
     })
  }

  handleChange = (e) => {
    const value = e.target.value 
    this.setState({
      code: value
    })
  }
  
  disconnected = () => {
    socket.on('userDisconnected' , (data) => {
      console.log(data)
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let code = this.state.code
    if(code !== null && code !== '') {
      console.log(code)
      socket.emit('sendCode', {
        key: code
      })
    } else {
      console.log('le code est vide')
    }
  }

  checkUserConnection = () => {
    socket.on('access',(data) => {
      console.log(data)
    })
  }

  render() {
    const { room, userId } = this.state

    return (
      <div className="App App-Mobile">
        <header className="App-header">
          <p>
            Mobile - hello {userId} welcome in {room}
          </p>
          <form className="commentForm" onSubmit={this.handleSubmit}>
            <input type="text" onChange={this.handleChange}  value={this.state.code} />
          </form>
        </header>
      </div>
    )
  }
}

export default Mobile

