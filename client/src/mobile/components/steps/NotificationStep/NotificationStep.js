import React, {Component} from 'react'
// import {connect} from 'react-redux'
// redux
import {connect} from 'react-redux'
// assets
import {AssetsManager} from "./../../../../managers"
import {assetsToLoad} from "../../../assets/asset-list"

//css
import './NotificationStep.scss'

class NotificationStep extends Component {

  handleRef = (el) => {
    this.props.handleRef(el)
  }

  render() {
    // const {player1Status, player2Status} = this.props
    return (
        <div className="notification-step">
            <span className="notification-step__title">Danger</span>
            <div className="notification-step__wrapper">
                <img className="notification-step__map" src={AssetsManager.get(assetsToLoad.map.name).src} />
            </div>
            
            <button className="notification-step__button button">
                <span>{'> Partager l\'alerte <'}</span>
            </button>
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    player1Status: state.mobile.users.find(user => user.id === "player1").player1Status,
    player2Status: state.mobile.users.find(user => user.id === "player2").player2Status,
  }
}

export default connect(mapStateToProps)((NotificationStep))

