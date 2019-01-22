import React, {Component} from 'react'
// redux
import {connect} from 'react-redux'
// assets
import {AssetsManager} from "./../../../../managers"
import {assetsToLoad} from "../../../assets/asset-list"

import {TimelineMax} from 'gsap'
//css
import './NotificationStep.scss'

class NotificationStep extends Component {


  handleRef = (el) => {
    this.props.handleRef(el)
  }

  componentWillReceiveProps(nextprops) {
    if (!this.props.showDanger && nextprops.showDanger ) {
      console.log('ALLLLEEEERT')
      this.showAlert()
    }
  }

  showAlert = () => {
    const notification = document.querySelector('.notification-step')
    const tl = new TimelineMax()
    tl.to(notification, .1, {opacity:1}, "+=0.5")
  }

  render() {
    const {player1Status, player2Status, player} = this.props
    const isPlayer1 = player === "player1"
    const isPlayer2 = player === "player2"

    return (
      <div className="notification-step">
        <span className="notification-step__title">Danger {player} </span>
          <div className="notification-step__wrapper">
              <img className="notification-step__map" src={AssetsManager.get(assetsToLoad.map.name).src} />
          </div>
          {isPlayer1 && player1Status === 'superior' && <>
        <button className="notification-step__button button">
          <span>{'> Partager l\'alerte <'}</span>
        </button>
        </>}
        {isPlayer2 && player2Status  === 'superior' && <>
        <button className="notification-step__button button">
          <span>{'> Partager l\'alerte <'}</span>
         </button>
        </>}
      </div>    
    )
  }
}

const mapStateToProps = state => {
  return {
    player: state.mobile.userId,
    player1Status: state.mobile.users.find(user => user.id === "player1").status,
    player2Status: state.mobile.users.find(user => user.id === "player2").status,
    showDanger: state.mobile.showDanger
  }
}

export default connect(mapStateToProps)((NotificationStep))