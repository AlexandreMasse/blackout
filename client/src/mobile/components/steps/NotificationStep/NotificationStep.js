import React, {Component} from 'react'
// redux
import {connect} from 'react-redux'
// assets
import {AssetsManager} from "./../../../../managers"
import {assetsToLoad} from "../../../assets/asset-list"
import { Howl } from 'howler'

import {TimelineMax} from 'gsap'
//css
import './NotificationStep.scss'
import {
  wsEmitShowDanger,
} from "../../../redux/actions/websockets/websocketsAction";
import {setCurrentStep, setPassword} from "../../../redux/actions/mobileAction";

class NotificationStep extends Component {

  constructor(props) {
    super(props)
    
    this.initSoundNotification()
  }

  handleRef = (el) => {
    this.props.handleRef(el)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevProps.showDanger && this.props.showDanger ) {
      this.showAlert()
    }
  }

  initSoundNotification = () => {
    const notificationAsset = AssetsManager.get('notification')
    this.notification = new Howl({
      src: notificationAsset.src,
      volume: 1,
      html5: true,
      preload: true,
      autoplay: false,
      loop: false,
      format: ['mp3']
    })
  }

  showAlert = () => {
    console.log("Show alert");
    const tl = new TimelineMax()
    tl.to(this.ref, 1, {opacity:1}, "+=0.2")
    this.notification.play()
  }

  emitShowDanger = () => {
    this.notification.play()
    const {player} = this.props
    const otherPlayer = player === "player1" ? "player2" : "player1"
    this.props.wsEmitShowDanger(otherPlayer, true)
  }

  render() {
    const {playerStatus, showDanger, player} = this.props

    const isPlayer1 = player === "player1"
    const isPlayer2 = player === "player2"

    return (
      <div className="notification-step" ref={ref => this.ref = ref}>
        {showDanger && <>
          <span className="notification-step__title">Danger</span>
          <div className="notification-step__wrapper">
            <img className="notification-step__map" src={AssetsManager.get(assetsToLoad.map.name).src}/>
            </div>
          {playerStatus === 'superior' &&
            <button className="notification-step__button button" onClick={this.emitShowDanger}>
              <span>{'> Partager l\'alerte <'}</span>
            </button>
          }
          {playerStatus === 'inferior' &&
            <button className="notification-step__button button">
              <span>{"> Fuir le danger <"}</span>
            </button>
          }
        </>}
      </div>    
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    player: state.mobile.userId,
    playerStatus: state.mobile.users.find(user => user.id === state.mobile.userId).status,
    showDanger: state.mobile.showDanger
  }
}

const mapDispatchToProps = dispatch => {
  return {
    wsEmitShowDanger: (userId, showDanger) => dispatch(wsEmitShowDanger({userId, showDanger})),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationStep)