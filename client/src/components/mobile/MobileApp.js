import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCookie } from '../../utils/getCookie'
import './MobileApp.scss'
// import io from 'socket.io-client'
import {wsEmitPassword, wsEmitDeviceType} from '../../redux/actions/websockets/websocketsAction'
// const socket = io.connect(process.env.REACT_APP_SERVER_URL)
import {socket} from '../../redux/actions/websockets/websocketsAction'

class MobileApp extends Component {
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
    this.sendCookie()
  }

  sendDeviceType = () => {
    console.log('mobile type')
    // socket.emit('deviceType',{
    //     type:'mobile'
    // })
    this.props.wsEmitDeviceType('mobile')
  }

  sendCookie = () => {
    let cookieRoomID = getCookie('room')
    let cookieUserId = getCookie('userId')
    if (cookieRoomID && cookieUserId) {
      socket.emit('sendCookie' , {
        userId: cookieUserId,
        roomId: cookieUserId
      })
    }
  }

  getCurrentRoom = () => {
    socket.on('connectToRoom',(data) => {
        this.setState({room : data.roomId})
        this.setState({userId : data.userId})
        let now = new Date()
        let time = now.getTime()
        time += 3600 * 1000
        now.setTime(time)
        document.cookie = 
        'room=' + data.roomId + 
        '; expires=' + now.toUTCString() + 
        '; path=/'
      
        document.cookie = 
        'userId=' + data.userId + 
        '; expires=' + now.toUTCString() + 
        '; path=/'
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
      this.props.wsEmitPassword(code)
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
      <div className="App mobile-app">
        <header className="App-header">
          <p>
            Mobile - hello {userId} welcome in {room}
          </p>
          <form className="commentForm" onSubmit={this.handleSubmit}>
            <input type="text" onChange={this.handleChange}  value={this.state.code} />
              <input type="submit" value={"Submit"}/>
          </form>
        </header>
      </div>
    )
  }
}



const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
      wsEmitPassword: (code) => dispatch(wsEmitPassword({code})),
      wsEmitDeviceType: (type) => dispatch(wsEmitDeviceType({type}))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MobileApp);
