import React, {Component} from 'react'
//redux
import {connect} from 'react-redux'
import { Provider } from 'react-redux'
import configureStore from '../redux/store'
import {wsEmitDeviceType} from '../redux/actions/websockets/websocketsAction'
import {
  setAppLoaded,
  setCurrentScene,
  setCurrentStep,
  setUserIndicationActive,
  setUserIndicationOpen,
  setSplitScreen,
  setUserCurrentScene
} from '../redux/actions/desktopAction'
//assets
import load from '../../vendors/assets-loader'
import {assetsToLoad} from '../assets/asset-list'
import {Loading, Indication} from "./components"
//steps
import {StepManager} from "./managers";
import steps from "./steps"
//utils
import {toggleFullscreen} from '../../utils'
import classNames from "classnames"
// style
import './DesktopApp.scss'
//scenes
import scenes from "./scenes";


class DesktopApp extends Component {

  constructor(props) {
    super(props)

    this.props.wsEmitDeviceType("desktop")
    this.props.setCurrentStep(steps.CONNEXION.name)

    window.addEventListener('resize', this.handleWindowResize)
    window.addEventListener('keydown', this.handleWindowKeydown)
    this.handleWindowResize()

    this.state = {
      showDevButton: true
    }
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
    }).then(assets => {
      window.assets = assets
      console.log(assets)
        this.props.setAppLoaded()
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
            <p className={"dev-toggle"} onClick={() => {
              this.setState({showDevButton: !this.state.showDevButton})
            }}>TOGGLE DEV</p>
            <div className={classNames("dev-button", {"show": this.state.showDevButton})}>

              <p onClick={() => this.props.setCurrentStep(steps.ANALYSIS.name)}>Step : analysis</p>
              <p onClick={() => this.props.setCurrentStep(steps.SCENE.name)}>Step : scene</p>
              <p onClick={() => {
                this.props.setSplitScreen(true)
                this.props.setUserCurrentScene("player1", scenes.SCENESTAIRS.name)
                this.props.setUserCurrentScene("player2", scenes.SCENESTAIRS.name)
              }}>SplitScreen : true</p>
              <p onClick={() => this.props.setCurrentScene(scenes.SCENEFLASHLIGHT.name)}>Scene : flashlight</p>
              <p onClick={() => this.props.setCurrentScene(scenes.SCENEKINEMATIC2.name)}>Scene : kinematic 2</p>
              <p onClick={() => this.props.setUserCurrentScene("player1", scenes.SCENESTAIRS.name)}>Player 1 Scene : stair</p>
              <p onClick={() => this.props.setUserCurrentScene("player2", scenes.SCENESTAIRS.name)}>Player 2 Scene : stair</p>
              <p onClick={() => this.props.setUserIndicationActive("player1", true)}>Indication : player 1 active</p>
              <p onClick={() => this.props.setUserIndicationOpen("player1", false)}>Indication : player 1 not open</p>
              <p onClick={() => this.props.setUserIndicationOpen("player1", true)}>Indication : player 1 open</p>
              <p onClick={() => this.props.setUserIndicationActive("player1", false)}>Indication : player 1 not active</p>

            </div>
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
    setCurrentScene: (currentScene) => dispatch(setCurrentScene(currentScene)),
    setUserIndicationActive: (userId, isActive) => dispatch(setUserIndicationActive({userId, isActive})),
    setUserIndicationOpen: (userId, isOpen) => dispatch(setUserIndicationOpen({userId, isOpen})),
    setUserCurrentScene: (userId, currentScene) => dispatch(setUserCurrentScene({userId, currentScene})),
    setSplitScreen: (isSplitScreen) => dispatch(setSplitScreen({isSplitScreen})),
  }
}

const DesktopAppConnected = connect(mapStateToProps, mapDispatchToProps)(DesktopApp)

export default () => (
  <Provider store={configureStore()}>
    <DesktopAppConnected/>
  </Provider>
)

