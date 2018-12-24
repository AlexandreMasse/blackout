import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Cursor} from '../../components'

import {CSSTransition} from 'react-transition-group'
import classNames from 'classnames'

import logotype from "../../../../assets/global/video/logotype.mp4"

class Connexion extends Component {
  render() {
    const {password1, password2, isPlayer1Connected, isPlayer2Connected} = this.props
    return (
      <>
      <CSSTransition classNames={"fade"} in={isPlayer1Connected && isPlayer2Connected} timeout={4500} mountOnEnter={true}>
        <Cursor/>
      </CSSTransition>

      <CSSTransition classNames={"fade"} in={!(isPlayer1Connected && isPlayer2Connected)} appear={true}
                      timeout={{enter: 0, exit: 2500}} mountOnEnter={true} unmountOnExit={true}>
        <div className="step-connexion">
          <div className="intro">
            <video width="350" autoPlay loop muted={true}>
              <source src={logotype} type="video/mp4"/>
            </video>
            <p>Prenez votre mobile et connectez vous à l'expérience !</p>
          </div>
          <div className="codes">
            <p className={classNames("player1", {"connected": isPlayer1Connected})}>{password1}</p>
            <p className={classNames("player2", {"connected": isPlayer2Connected})}>{password2}</p>
          </div>
        </div>
      </CSSTransition>
    </>
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

export default connect(mapStateToProps)(Connexion)
