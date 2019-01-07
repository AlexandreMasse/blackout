import React,{ Component} from 'react'
//Redux
import { connect } from 'react-redux'
import {wsEmitPassword, wsEmitDeviceType, wsEmitPhoneData,wsEmitReconnection} from '../../redux/actions/websockets/mobile/websocketsAction'
import {setCurrentStep, setPhoneData} from '../../redux/actions/mobile/mobileAction'
import {socket} from '../../redux/actions/websockets/mobile/websocketsAction'
//Step
import {IntroStep, CursorStep, stepTypes} from './steps'
//Lib
import { getCookie, getPhoneData } from '../../utils'
//Style
import './MobileApp.scss'

class MobileApp extends Component {

  constructor (props) {
    super(props)

    this.props.wsEmitDeviceType('mobile')

    const phoneData = getPhoneData()
    console.log("phoneData", phoneData);
    this.props.setPhoneData(phoneData)
    this.props.wsEmitPhoneData(phoneData)

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
    currentStep: state.mobile.currentStep,
    phoneData: state.mobile.phoneData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
      setCurrentStep: (currentStep) => dispatch(setCurrentStep(currentStep)),
      setPhoneData: (phoneData) => dispatch(setPhoneData(phoneData)),
      wsEmitDeviceType: (type) => dispatch(wsEmitDeviceType({type})),
      wsEmitPhoneData: (data) => dispatch(wsEmitPhoneData({data})),
      wsEmitPassword: (code) => dispatch(wsEmitPassword({code})),
      wsEmitReconnection: (userId, roomId) => dispatch(wsEmitReconnection({userId, roomId})),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MobileApp)

