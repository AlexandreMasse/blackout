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

    const sendNotifAsset = AssetsManager.get('sendNotif')
    this.sendNotif = new Howl({
      src: sendNotifAsset.src,
      volume: 1,
      html5: true,
      preload: true,
      autoplay: false,
      loop: false,
      format: ['mp3']
    })
  }

  showAlert = () => {
    console.log("Show alert")
    const tl = new TimelineMax()
    tl.to(this.ref, 1, {opacity:1}, "+=0.2")
    this.notification.play()
  }

  emitShowDanger = (e) => {
    const btn = e.target
    btn.classList.add('isSend')
    this.sendNotif.play()
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
          <span className="notification-step__subtitle">Incendie</span>
          <span className="notification-step__icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 121.06 162"><defs></defs><g id="Calque_2" data-name="Calque 2"><g id="Calque_1-2" data-name="Calque 1"><path className="cls-1" d="M113.58,81s2.1,25.11-17.18,38.07c0,0,37.75-74.84-42.93-119.07,0,0,11.34,19.28-15.22,42.44-22.2,19.28-75,83,2.59,119.56,0,0-31.43-41.15,7.61-63.83,0,0-14.9,24,11.83,44.23,15.87-16.53,11.66-25,11.66-25s23,18.47,6,44.55C77.94,162,142.57,146.45,113.58,81Z"/></g></g></svg>
          </span>
          {playerStatus === 'superior' && 
            <button className="notification-step__button button" onClick={(e) => this.emitShowDanger(e)}>
              <span>{'> Partager l\'alerte <'}</span>
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