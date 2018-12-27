import React,{ Component} from 'react'
//Redux
import { connect } from 'react-redux'
import {wsEmitPassword, wsEmitDeviceType, wsEmitReconnection} from '../../redux/actions/websockets/websocketsAction'
import {setCurrentStep} from '../../redux/actions/mobile/mobileAction'
import {socket} from '../../redux/actions/websockets/websocketsAction'
//Step
import {IntroStep, CursorStep, stepTypes} from './steps'
//Lib
import { getCookie } from '../../utils'
//Style
import './MobileApp.scss'


class MobileApp extends Component {
  constructor (props) {
    super(props)

    this.props.wsEmitDeviceType('mobile')
    this.props.setCurrentStep(stepTypes.INTRO)
  }

  componentDidMount() {
    this.disconnected()
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
  
  disconnected = () => {
    socket.on('userDisconnected', (data) => {
      console.log(data)
    })
  }

  componentWillReceiveProps(nextProps, nextContext) {
    // setCookie when user isConnected
    if(nextProps.isConnected && this.props.isConnected !== nextProps.isConnected) {
      this.setCookie(nextProps.userId, nextProps.roomId)
    }
  }

  renderSteps = () => {
    switch (this.props.currentStep) {
      case stepTypes.INTRO:
        return <IntroStep/>
      case stepTypes.CURSOR:
        return <CursorStep/>
      default:
        return null
    }
  }


  render() {
    return (
      <div className="app mobile-app">
        {this.renderSteps()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.mobile.userId,
    roomId: state.mobile.roomId,
    isConnected: state.mobile.isConnected,
    currentStep: state.mobile.currentStep
  }
}

const mapDispatchToProps = dispatch => {
  return {
      wsEmitPassword: (code) => dispatch(wsEmitPassword({code})),
      wsEmitDeviceType: (type) => dispatch(wsEmitDeviceType({type})),
      setCurrentStep: (currentStep) => dispatch(setCurrentStep(currentStep)),
      wsEmitReconnection: (userId, roomId) => dispatch(wsEmitReconnection({userId, roomId})),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MobileApp)

