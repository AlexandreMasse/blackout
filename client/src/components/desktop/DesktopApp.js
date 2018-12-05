import React, { Component } from 'react'
import {connect} from 'react-redux'
// import logo from './logo.svg'
import {socket, wsEmitDeviceType} from '../../redux/actions/websockets/websocketsAction'

import {desktopAction} from '../../redux/actions/desktop/desktopAction'

import './DesktopApp.scss'

class DesktopApp extends Component {
  constructor (props) {
    super(props)
    this.state = {
        password1: null,
        password2: null,
        player1: false,
        player2: false,
    }
  }

  componentWillMount() {
    console.log('prout du desktop')
    this.sendDeviceType()
    this.getCode()
    this.getConnectedUser()
    this.getDisconnectedUser()
  }

  sendDeviceType = () => {
    console.log('desktop type')  
    // socket.emit('deviceType', {
    //     type:'desktop'
    // })
    this.props.wsEmitDeviceType("desktop")
  }

  getCode = () => {
    socket.on('createRoom',(data) => {
      this.setState({password1 : data.password1})
      this.setState({password2 : data.password2})
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

  getDisconnectedUser = () => {
    socket.on('disconnectToRoom', (data) => {
      console.log(data)
      let player = data.userId
      if (player === 'player1') this.setState({player1: false})
      if (player === 'player2') this.setState({player2: false})
    })
  }

  inputChange = (e) => {
    console.log(e.target.value)
      this.props.myFunction(e.target.value)
  }

  render() {
    const { password1, password2, player1, player2 } = this.state
    const succeed = player1 ? 'succed' : ' '
    const succeed2 = player2 ? 'succed' : ' '

    return (
      <div className="App desktop-app">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <p>
            Desktop
          </p>
          <p className={succeed}>
            code 1 : {password1}
          </p>
          <p className={succeed2}>
            code 2 : {password2}
          </p>

            <input type="text" onChange={this.inputChange}/>
          <p>{this.props.text}</p>
        </header>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    text: state.desktop.textDesktop
  }
}

const mapDispatchToProps = dispatch => {
  return {
    wsEmitDeviceType: (type) => dispatch(wsEmitDeviceType({type})),
    myFunction: (text) => dispatch(desktopAction({text}))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DesktopApp);

