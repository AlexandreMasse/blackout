import React, {Component} from 'react'
// import {connect} from 'react-redux'

// assets
import {AssetsManager} from "./../../../../managers"
import {assetsToLoad} from "../../../assets/asset-list"

//css
import './NotificationStep.scss'

export default class NotificationStep extends Component {

  handleRef = (el) => {
    this.props.handleRef(el)
  }

  render() {
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
    //   password1: state.desktop.password1,
    //   password2: state.desktop.password2,
    //   isPlayer1Connected: state.desktop.users.find(user => user.id === "player1").isConnected,
    //   isPlayer2Connected: state.desktop.users.find(user => user.id === "player2").isConnected,
    //   player1PhoneData: state.desktop.users.find(user => user.id === "player1").phoneData,
    //   player2PhoneData: state.desktop.users.find(user => user.id === "player2").phoneData
    }
  }

// const mapDispatchToProps = dispatch => {
//   return {
//     wsEmitPosition: (position) => dispatch(wsEmitPosition({position}))
//   }
// }

// export default connect(mapStateToProps,mapDispatchToProps)(withDeviceOrientation(CursorStep));
