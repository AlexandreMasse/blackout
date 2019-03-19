import 'gyronorm/dist/gyronorm.complete.min.js'
import { disableBodyScroll } from 'body-scroll-lock'
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
import { getCookie, getPhoneData, requestTimeout } from '../../utils'
//Style
import './MobileApp.scss'
//Assets loading
import load from '../../vendors/assets-loader'
import {assetsToLoad} from '../assets/asset-list'
import classNames from "classnames";

class MobileApp extends Component {

  constructor (props) {
    super(props)

    this.state = {
      showDevButton: false
    }

    this.props.wsEmitDeviceType('mobile')
    // this.reconnect()

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
        this.props.setAppLoaded()
    })
  }

  componentDidMount() {
    const app = document.querySelector(".mobile-app")

    disableBodyScroll(app)
  }

  reconnect = () => {
    let cookieRoomID = getCookie('room')
    let cookieUserId = getCookie('userId')
    if (cookieRoomID && cookieUserId) {
      this.props.wsEmitReconnection(cookieUserId, cookieRoomID)
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
  
  disconnectedToRomm = () => {
    this.props.setCurrentStep(steps.DISCONNECT.name)        
    requestTimeout(() => {
      this.props.setCurrentStep(steps.INTRO.name)
    }, 7000)
  }

  componentWillReceiveProps(nextProps, nextContext) {
    // setCookie when user isConnected
    if(nextProps.isConnected && this.props.isConnected !== nextProps.isConnected) {
      this.setCookie(nextProps.userId, nextProps.roomId)
    }

    if(this.props.roomId !== nextProps.roomId) {
      if(nextProps.roomId === null) {
        this.disconnectedToRomm()
      }
    }
  }

  render() {
    const {currentStep, isLoaded, roomId} = this.props;
    return (
      <div className="app mobile-app">
        {isLoaded ? (
          <>
            <BackgroundGrid/>
            <StepManager currentStep={currentStep}/>
            <p className={"dev-toggle"} onClick={() => {
              this.setState({showDevButton: !this.state.showDevButton})
            }}>TOGGLE DEV</p>
            <div className={classNames("dev-button", {"show": this.state.showDevButton})}>
              <p onClick={() => this.props.setCurrentStep(steps.CURSOR.name)}>Step : cursor</p>
              <p onClick={() => this.props.setCurrentStep(steps.STAIRS.name)}>Step : stair</p>
              <p onClick={() => this.props.setCurrentStep(steps.FINGERPRINT.name)}>Step : fingerprint</p>
              <p onClick={() => this.props.setCurrentStep(steps.CODE.name)}>Step : code</p>
              <p onClick={() => this.props.setCurrentStep(steps.HANDLE.name)}>Step : handle</p>
              <p onClick={() => this.props.setCurrentStep(steps.SLIDER.name)}>Step : slider</p>
              <p onClick={() => this.props.setCurrentStep(steps.NOTIFICATION.name)}>Step : notif</p>
              <p onClick={() => this.props.setCurrentStep(steps.CONCLUSION.name)}>Step : conclusion</p>
            </div>
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

