import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Provider } from 'react-redux'
import configureStore from '../redux/store'
import {wsEmitDeviceType} from '../redux/actions/websockets/websocketsAction'
import {setAppLoaded} from '../redux/actions/desktopAction'
import load from '../../vendors/assets-loader'
import {assetsToLoad} from '../assets/asset-list'
import {Loading} from "./components"
//steps
import {ConnexionStep} from "./steps"
// style
import './DesktopApp.scss'

class DesktopApp extends Component {

  constructor(props) {
    super(props)
    this.props.wsEmitDeviceType("desktop")
  }

  componentWillMount() {
    this.assetLoaded()
  }

  assetLoaded = () => {
    load.any(assetsToLoad, ev => {
      console.log(`Progress: ${ev.progress}`)
    }).then(assets => {
      window.assets = assets
      console.log(assets)
      setTimeout(() => {
        this.props.setAppLoaded()
      }, 500)
    })
  }

  render() {
    const {isLoaded} = this.props
    return (
      <div className="App desktop-app desktop-app--loading">
        {!isLoaded ? (
          <Loading/>
        ) : (
          <ConnexionStep/>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoaded : state.desktop.app.isLoaded
  }
}

const mapDispatchToProps = dispatch => {
  return {
    wsEmitDeviceType: (type) => dispatch(wsEmitDeviceType({type})),
    setAppLoaded: () => dispatch(setAppLoaded()),
  }
}

const DesktopAppConnected = connect(mapStateToProps, mapDispatchToProps)(DesktopApp)

export default () => (
  <Provider store={configureStore()}>
    <DesktopAppConnected/>
  </Provider>
)

