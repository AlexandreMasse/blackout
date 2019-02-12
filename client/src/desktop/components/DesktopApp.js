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
  setUserCurrentScene,
  setPlayer1SplitScreenPercentage
} from '../redux/actions/desktopAction'
//assets
import load from '../../vendors/assets-loader'
import {assetsToLoad} from '../assets/asset-list'
import {Loading, Indication} from "./components"
//steps
import {StepManager} from "./managers";
import steps from "./steps"
//utils
import {requestTimeout, toggleFullscreen} from '../../utils'
import classNames from "classnames"
// style
import './DesktopApp.scss'
//scenes
import scenes from "./scenes";
import {TimelineMax} from "gsap";


class DesktopApp extends Component {

  constructor(props) {
    super(props)

    this.props.wsEmitDeviceType("desktop")
    this.props.setCurrentStep(steps.CONNEXION.name)

    window.addEventListener('resize', this.handleWindowResize)
    window.addEventListener('keydown', this.handleWindowKeydown)
    this.handleWindowResize()

    this.state = {
      showDevButton: true,
      splitScreenPercentage: 50,
      durationOverlay: 1,
    }
  }

  handleWindowKeydown = (e) => {
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

  overlay = () => {

    const root = window.document.querySelector("#root")
    const app = window.document.querySelector(".desktop-app")

    root.classList.add("overlay")
    app.classList.add("overlay")

    requestTimeout(() => {
      root.classList.remove("overlay")
      app.classList.remove("overlay")
    }, (this.state.durationOverlay / 2) * 1000)

    requestTimeout(this.overlay, (this.state.durationOverlay) * 1000)

  }

  render() {
    const {isLoaded, currentStep} = this.props
    return (
      <div className="app desktop-app">
        {!isLoaded ? (
          <Loading/>
        ) : (
          <>
            <p className={"dev-toggle"} onClick={() => {
              this.setState({showDevButton: !this.state.showDevButton})
            }}>TOGGLE DEV</p>
            <div className={classNames("dev-button", {"show": this.state.showDevButton})}>
              <p onClick={() => this.props.setCurrentStep(steps.CONCLUSION.name)}>Step : Conclusion</p>
              <p onClick={() => this.props.setCurrentStep(steps.ANALYSIS.name)}>Step : analysis</p>
              <p onClick={() => this.props.setCurrentStep(steps.SCENE.name)}>Step : scene</p>
              <hr/>
              <p onClick={() => this.props.setCurrentScene(scenes.SCENEFLASHLIGHT.name)}>Scene : flashlight</p>
              <p onClick={() => this.props.setCurrentScene(scenes.SCENEKINEMATIC2.name)}>Scene : kinematic 2</p>
              <hr/>
              <p onClick={() => {
                this.props.setSplitScreen(true)
              }}>SplitScreen : true</p>
              <p onClick={() => this.props.setUserCurrentScene("player1", scenes.SCENESTAIRS.name)}>Player 1 Scene : stair</p>
              <p onClick={() => this.props.setUserCurrentScene("player2", scenes.SCENESTAIRS.name)}>Player 2 Scene : stair</p>
              <p onClick={() => this.props.setUserCurrentScene("player1", scenes.SCENEDOOR.name)}>Player 1 Scene : Door</p>
              <p onClick={() => this.props.setUserCurrentScene("player2", scenes.SCENEDOOR.name)}>Player 2 Scene : Door</p>
              <hr/>
              <p onClick={() => this.props.setUserIndicationActive("player1", true)}>Indication : player 1 active</p>
              <p onClick={() => this.props.setUserIndicationOpen("player1", false)}>Indication : player 1 not open</p>
              <p onClick={() => this.props.setUserIndicationOpen("player1", true)}>Indication : player 1 open</p>
              <p onClick={() => this.props.setUserIndicationActive("player1", false)}>Indication : player 1 not active</p>
              <hr/>
              <p onClick={() => this.overlay()}>Overlay</p>
              <hr/>
              <input onChange={(e) =>
                { this.props.setPlayer1SplitScreenPercentage(Number(e.target.value) / 100)
                  this.setState({splitScreenPercentage:e.target.value})}}
                  className="range"
                  type="range"
                  value={this.state.splitScreenPercentage}
                  // step="0.01"
                  max="100"
                  min="0"
              />

              <input onChange={(e) => {
                this.setState({durationOverlay: Number(e.target.value)})
              }}
                 className="range"
                 type="range"
                 value={this.state.durationOverlay}
                 step="0.01"
                 max="2"
                 min="0"
              />
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
    setPlayer1SplitScreenPercentage: (splitScreenPercentage) => dispatch(setPlayer1SplitScreenPercentage({splitScreenPercentage}))
  }
}

const DesktopAppConnected = connect(mapStateToProps, mapDispatchToProps)(DesktopApp)

export default () => (
  <Provider store={configureStore()}>
    <DesktopAppConnected/>
  </Provider>
)

