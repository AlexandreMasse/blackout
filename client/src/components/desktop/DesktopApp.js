import React, {Component} from 'react'
import {connect} from 'react-redux'
import {wsEmitDeviceType} from '../../redux/actions/websockets/desktop/websocketsAction'

import {setAppLoaded} from '../../redux/actions/desktop/desktopAction'

import {Loading, Connexion} from "./components"
import load from '../../vendors/assets-loader'
import {assetsToLoad} from '../../assets/desktop/asset-list'
// style
import './DesktopApp.scss'

class DesktopApp extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.wsEmitDeviceType("desktop")
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
      <Loading />
    ) : (
      <Connexion />
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

export default connect(mapStateToProps, mapDispatchToProps)(DesktopApp)

