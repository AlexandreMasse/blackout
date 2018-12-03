import React, { Component } from 'react'
// import logo from './logo.svg'
import './index.css'
import io from 'socket.io-client'
// const socket = io.connect()
const socket = io.connect("http://localhost:80")


class Desktop extends Component {
  constructor (props) {
    super(props)

    this.state = {
        code1: null,
        code2: null,
        player1: false,
        player2: false,
    }
  }

  componentWillMount() {
    console.log('prout du desktop')
    this.sendDeviceType()
    this.getCode()
    this.getConnectedUser()
  }

  sendDeviceType = () => {
    console.log('desktop type')  
    socket.emit('deviceType', {
        type:'desktop'
    })
  }

  getCode = () => {
    socket.on('setCode',(data) => {
      this.setState({code1 : data.code1})
      this.setState({code2 : data.code2})
    })
  }
  getConnectedUser = () => {
    socket.on('connectToRoom', (data) => {
      console.log(data)
      let player = data.userId
      if (player === 'player1') this.setState({player1: true})
      if (player === 'player2') this.setState({player2: true})
    })
  }
  render() {
    const { code1, code2, player1, player2 } = this.state
    const succeed = player1 ? 'succed' : ' '
    const succeed2 = player2 ? 'succed' : ' '

    return (
      <div className="App App-Desktop">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <p>
            Desktop
          </p>
          <p className={succeed}>
            code 1 : {code1}
          </p>
          <p className={succeed2}>
            code 2 : {code2}
          </p>
        </header>
      </div>
    )
  }
}

export default Desktop

