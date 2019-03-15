import React, {Component} from 'react'

import './Deconnection.scss'

import {connect} from "react-redux"

class Deconnection extends Component {
    
    componentDidMount() {

    }

    render() {

        const {isPlayer1Connected, isPlayer2Connected} = this.props

        return (
            <div className="deconnection">
                Deconnection
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      isPlayer1Connected: state.desktop.users.find(user => user.id === "player1").isConnected,
      isPlayer2Connected: state.desktop.users.find(user => user.id === "player2").isConnected
    }
  }
  
  export default connect(mapStateToProps, '')(Deconnection)

