import React, {Component} from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'
import {CSSTransition} from 'react-transition-group'
import {Cursor} from '../../components'
import logotype from "../../../../assets/global/video/logotype.mp4"
// style
import './ConnexionStep.scss'

class ConnexionStep extends Component {
  render() {
    const {password1, password2, isPlayer1Connected, isPlayer2Connected, player1PhoneData, player2PhoneData} = this.props
    return (
      <>
              <Cursor/>
      {/* <CSSTransition classNames={"fade"} in={isPlayer1Connected && isPlayer2Connected} timeout={4500} mountOnEnter={true}>
      </CSSTransition> */}

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
            <div className={classNames("player1", {"connected": isPlayer1Connected})}>
              <p className={"password"}>{password1}</p>
              <p className={"score"}>{player1PhoneData ? player1PhoneData.score : ''}</p>
            </div>
            <div className={classNames("player2", {"connected": isPlayer2Connected})}>
              <p className={"password"}>{password2}</p>
              <p className={"score"}>{player2PhoneData ? player2PhoneData.score : ''}</p>
            </div>
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
    isPlayer2Connected: state.desktop.users.find(user => user.id === "player2").isConnected,
    player1PhoneData: state.desktop.users.find(user => user.id === "player1").phoneData,
    player2PhoneData: state.desktop.users.find(user => user.id === "player2").phoneData
  }
}

export default connect(mapStateToProps)(ConnexionStep)
