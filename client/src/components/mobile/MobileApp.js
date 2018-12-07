import React,{ Component, Fragment} from 'react'
import { connect } from 'react-redux'
import { getCookie } from '../../utils'
import {wsEmitPassword, wsEmitDeviceType, wsEmitReconnection} from '../../redux/actions/websockets/websocketsAction'
import {socket} from '../../redux/actions/websockets/websocketsAction'
import {AssetsManager} from '../../managers'
import {assetsToLoad}  from '../../assets/asset-list.js'
import AssetsLoader from 'assets-loader'

import './MobileApp.scss'
import MobileComponent from "./components/MobileComponent/MobileComponent";

class MobileApp extends Component {
  constructor (props) {
    super(props)

    this.state = {
        password: ''
    }
  }

  componentWillMount() {
    this.props.wsEmitDeviceType('mobile')
    this.disconnected()
    // this.initAssetLoader()
  }

  sendDeviceType = () => {
    console.log('mobile type')  
    socket.emit('deviceType',{
        type:'mobile'
    })
  }

  initAssetLoader = () => {
    if (assetsToLoad.length > 0) {
      new AssetsLoader({
        assets:assetsToLoad
      }).on('error', function (error) {
        console.error(error)
      }).on('progress', function (p) {
        console.log('Progress : ', p)
      }).on('complete',this.onComplete)
      .start()
    }
  }

  onComplete = (assets) => {
    // console.log('cool', assets)
    if(assets.length > 0) {
      new AssetsManager(assets)
    }
  }

  reconnect = () => {
    let cookieRoomID = getCookie('room')
    let cookieUserId = getCookie('userId')
    if (cookieRoomID && cookieUserId) {
      socket.emit('reconnect', {
        userId: cookieUserId,
        roomId: cookieUserId
      })
    }
  }

  setCookie = (userId, roomId) => {
      let now = new Date()
      let time = now.getTime()
      time += 3600 * 1000
      now.setTime(time)
      document.cookie =
          'room=' + roomId +
          '; expires=' + now.toUTCString() +
          '; path=/'

      document.cookie =
          'userId=' + userId +
          '; expires=' + now.toUTCString() +
          '; path=/'
  }

  handleChange = (e) => {
    const value = e.target.value 
    this.setState({
      password: value
    })
  }
  
  disconnected = () => {
    socket.on('userDisconnected' , (data) => {
      console.log(data)
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let password = this.state.password
    if(password !== null && password !== '') {
      this.props.wsEmitPassword(password)
    } else {
      console.log('le password est vide')
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    // setCookie when user isConnected
    if(nextProps.isConnected && this.props.isConnected !== nextProps.isConnected) {
      this.setCookie(nextProps.userId, nextProps.roomId)
    }
  }

  render() {
    const { roomId, userId, isConnected } = this.props
    return (
      <div className="app mobile-app">
        <header className="app-header">
            {isConnected ? (
                <>
                  <p>Hello <span>{userId}</span></p>
                  <p>Welcome in <span>{roomId}</span></p>
                  <MobileComponent/>
                </>
            ) : (
              <>
                <p>Connect to the experience !</p>
                <form className="commentForm" onSubmit={this.handleSubmit}>
                  <input type="number" onChange={this.handleChange} value={this.state.password}/>
                  <input type="submit" value={"Submit"}/>
                </form>
              </>
            )}
        </header>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.mobile.userId,
    roomId: state.mobile.roomId,
    isConnected: state.mobile.isConnected
  }
}

const mapDispatchToProps = dispatch => {
  return {
      wsEmitPassword: (code) => dispatch(wsEmitPassword({code})),
      wsEmitDeviceType: (type) => dispatch(wsEmitDeviceType({type})),
      wsEmitReconnection: (userId, roomId) => dispatch(wsEmitReconnection({userId, roomId})),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MobileApp);

