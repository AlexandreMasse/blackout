import React, {Component} from 'react'
//redux
import {connect} from 'react-redux'
import { Provider } from 'react-redux'
import configureStore from '../redux/store'
import {wsEmitDeviceType} from '../redux/actions/websockets/websocketsAction'
import {setAppLoaded, setCurrentStep, setUserIndicationOpen} from '../redux/actions/desktopAction'
//assets
import load from '../../vendors/assets-loader'
import {assetsToLoad} from '../assets/asset-list'
import {Loading, Indication} from "./components"
//steps
import {StepManager} from "./managers";
import steps from "./steps"
//utils
import {toggleFullscreen} from '../../utils'
// style
import './DesktopApp.scss'


class DesktopApp extends Component {

  constructor(props) {
    super(props)
    this.props.wsEmitDeviceType("desktop")
    this.props.setCurrentStep(steps.CONNEXION.name)

    window.addEventListener('resize', this.handleWindowResize)
    window.addEventListener('keydown', this.handleWindowKeydown)
    this.handleWindowResize()
  }

  handleWindowKeydown = (e) => {
    console.log(e);
    if(e.key === "f" || e.code === "Space") {
      toggleFullscreen()
    }
  }
  
  handleWindowResize = (e) => {
    const ratio = window.innerWidth / 1920
    document.querySelector('html').style.fontSize = 10 * ratio + "px"
  }

  componentWillMount() {
    this.assetLoaded()
    // Indication.initTimeline()
  }

  assetLoaded = () => {
    load.any(assetsToLoad, ev => {
      console.log(ev)
      console.log(`Progress: ${ev.progress}`)
    }).then(assets => {
      window.assets = assets
      console.log(assets)
      // setTimeout(() => {
        this.props.setAppLoaded()
      // }, 500)
    })
  }

  render() {
    const {isLoaded, currentStep} = this.props
    return (
      <div className="App desktop-app">
        {!isLoaded ? (
          <Loading/>
        ) : (
          <>
          <Indication player={"player1"}/>
          <Indication player={"player2"}/>
          <StepManager currentStep={currentStep}/>
          </>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoaded : state.desktop.app.isLoaded,
    currentStep : state.desktop.currentStep
  }
}

const mapDispatchToProps = dispatch => {
  return {
    wsEmitDeviceType: (type) => dispatch(wsEmitDeviceType({type})),
    setAppLoaded: () => dispatch(setAppLoaded()),
    setCurrentStep: (currentStep) => dispatch(setCurrentStep(currentStep)),
  }
}

const DesktopAppConnected = connect(mapStateToProps, mapDispatchToProps)(DesktopApp)

export default () => (
  <Provider store={configureStore()}>
    <DesktopAppConnected/>
  </Provider>
)

