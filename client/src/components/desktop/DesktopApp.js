import React, { Component } from 'react'
import {connect} from 'react-redux'
import {wsEmitDeviceType} from '../../redux/actions/websockets/websocketsAction'
import classNames from 'classnames'
// assets
import logo from './logo.svg'
// style
import './DesktopApp.scss'
import Cursor from "./components/TestComponent/Cursor";

class DesktopApp extends Component {

  componentWillMount() {
    this.props.wsEmitDeviceType("desktop")
  }


  render() {
    const { password1, password2, isPlayer1Connected, isPlayer2Connected } = this.props
    return (
      <div className="App desktop-app">
        {(isPlayer1Connected || isPlayer2Connected) && <Cursor/>}
        <header className="App-header">
           {/*<img src={logo} className="App-logo" alt="logo"/>*/}
          <p>
            Desktop
          </p>
          <p className={classNames({"connected":isPlayer1Connected})}>
            code 1 : {password1}
          </p>
          <p className={classNames({"connected":isPlayer2Connected})}>
            code 2 : {password2}
          </p>
        </header>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    password1: state.desktop.password1,
    password2: state.desktop.password2,
    isPlayer1Connected: state.desktop.users.find(user => user.id === "player1").isConnected,
    isPlayer2Connected: state.desktop.users.find(user => user.id === "player2").isConnected
  }
}

const mapDispatchToProps = dispatch => {
  return {
    wsEmitDeviceType: (type) => dispatch(wsEmitDeviceType({type})),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DesktopApp);

