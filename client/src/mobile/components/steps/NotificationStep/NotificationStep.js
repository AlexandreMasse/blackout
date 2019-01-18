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
    const alert = document.querySelector('.alert') 
    const notification = document.querySelector('.notification-step')
    const tl = new TimelineMax()
    tl.to(alert, 0, {opacity:1}, "+=0.2")
    tl.to(alert, 0, {opacity:0}, "+=0.2")
    tl.to(alert, 0, {opacity:1}, "+=0.2")
    tl.to(alert, 0, {opacity:0}, "+=0.2")
    tl.to(alert, 0, {opacity:1}, "+=0.2")
    tl.to(alert, 0, {opacity:0}, "+=0.2")
    tl.to(alert, 0, {opacity:1}, "+=0.2")
    tl.to(alert, 0, {opacity:0}, "+=0.2")
    tl.to(notification, .1, {opacity:1}, "+=0.5")
  }

  render() {
    return (
        <>
        <div className="notification-step">
            <span className="notification-step__title">Danger</span>
            <div className="notification-step__wrapper">
                <img className="notification-step__map" src={AssetsManager.get(assetsToLoad.map.name).src} />
            </div>
            
            {/* <button className="notification-step__button button">
                <span>{'> Partager l\'alerte <'}</span>
            </button> */}
        </div>
        <div className="alert"/>
        </>
    )
  }
}

const mapStateToProps = state => {
  return {
    player1Status: state.mobile.users.find(user => user.id === "player1").player1Status,
    player2Status: state.mobile.users.find(user => user.id === "player2").player2Status,
    showDanger: state.mobile.showDanger
  }
}

export default connect(mapStateToProps)((NotificationStep))