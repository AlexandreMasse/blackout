import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {wsEmitDeviceType} from '../../redux/actions/websockets/websocketsAction'
import classNames from 'classnames'
import Cursor from "./components/Cursor/Cursor";
import {CSSTransition} from 'react-transition-group';

// style
import './DesktopApp.scss'

class DesktopApp extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.wsEmitDeviceType("desktop")
  }


  render() {
    const {password1, password2, isPlayer1Connected, isPlayer2Connected} = this.props
    return (
      <div className="App desktop-app">

         <CSSTransition classNames={"fade"} in={isPlayer1Connected && isPlayer2Connected} timeout={4500} mountOnEnter={true}>
           <Cursor/>
         </CSSTransition>

        <CSSTransition classNames={"fade"} in={!(isPlayer1Connected && isPlayer2Connected)} appear={true} timeout={{enter:0, exit: 2500 }} mountOnEnter={true} unmountOnExit={true}>
          <div className="step-connexion">
            <div className="intro">
              <p>Bienvenue sur Blackout</p>
              <p>Prenez votre mobile et connectez vous à l'expérience !</p>
            </div>
            <div className="codes">
              <p className={classNames("player1", {"connected": isPlayer1Connected})}>{password1}</p>
              <p className={classNames("player2", {"connected": isPlayer2Connected})}>{password2}</p>
            </div>
          </div>
          </CSSTransition>

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

export default connect(mapStateToProps, mapDispatchToProps)(DesktopApp);

