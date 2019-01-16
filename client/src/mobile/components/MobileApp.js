import 'gyronorm/dist/gyronorm.complete.min.js';
import React,{ Component} from 'react'
//Redux
import { Provider } from 'react-redux'
import configureStore from '../redux/store'
import { connect } from 'react-redux'
import {wsEmitDeviceType, wsEmitPhoneData,wsEmitReconnection} from '../redux/actions/websockets/websocketsAction'
import {setCurrentStep, setPhoneData, setAppLoaded} from '../redux/actions/mobileAction'
import {socket} from '../redux/actions/websockets/websocketsAction'
// Component
import {BackgroundGrid, Loading} from './components'
import {StepManager} from "./managers";
//Step
import steps from './steps'
//Lib
import { getCookie, getPhoneData } from '../../utils'
//Style
import './MobileApp.scss'
//Assets loading
import load from '../../vendors/assets-loader'
import {assetsToLoad} from '../assets/asset-list'

class MobileApp extends Component {

  constructor (props) {
    super(props)

    this.props.wsEmitDeviceType('mobile')

    getPhoneData().then(data => {
      this.props.setPhoneData(data)
      this.props.wsEmitPhoneData(data)
    })

    this.props.setCurrentStep(steps.INTRO.name)
    this.loadAssets()

    window.addEventListener('resize',this.handleResize)
    this.handleResize()
  }

  handleResize = (e) => {
    const ratio = window.innerWidth / 375
    document.querySelector('html').style.fontSize = 10 * ratio + "px"
  }

  loadAssets = () => {
    load.any(assetsToLoad, ev => {
      console.log(`Progress: ${ev.progress}`)
    }).then(assets => {
      window.assets = assets
      setTimeout(() => {
        this.props.setAppLoaded()
        // this.reconnect()
      }, 1000)
    })
  }

  componentDidMount() {
    this.disconnected()
  }

  reconnect = () => {
    let cookieRoomID = getCookie('room')
    let cookieUserId = getCookie('userId')
    if (cookieRoomID && cookieUserId) {
      socket.emit('reco', {
        userId: cookieUserId,
        roomId: cookieRoomID
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

  render() {
    const {currentStep, isLoaded} = this.props;
    return (
      <div className="app mobile-app">
        {isLoaded ? (
          <>
            <BackgroundGrid/>
            <StepManager currentStep={currentStep}/>
          </>
        ) : (
          <Loading/>
        )}
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
    isLoaded : state.mobile.isLoaded
  }
}

const mapDispatchToProps = dispatch => {
  return {
      setAppLoaded: () => dispatch(setAppLoaded()),
      setCurrentStep: (currentStep) => dispatch(setCurrentStep(currentStep)),
      setPhoneData: (phoneData) => dispatch(setPhoneData(phoneData)),
      wsEmitDeviceType: (type) => dispatch(wsEmitDeviceType({type})),
      wsEmitPhoneData: (data) => dispatch(wsEmitPhoneData({data})),
      wsEmitReconnection: (userId, roomId) => dispatch(wsEmitReconnection({userId, roomId})),
  }
}

const MobileAppConnected = connect(mapStateToProps,mapDispatchToProps)(MobileApp)

export default () => (
  <Provider store={configureStore()}>
    <MobileAppConnected/>
  </Provider>
)

