import React, {Component} from 'react'
import PropTypes from "prop-types"

import './Deconnection.scss'

import {connect} from "react-redux"

class Deconnection extends Component {
    
    componentDidMount() {

    }

    render() {

        const {player} = this.props

        return (
            <div className="deconnection">
                <p>Deconnection du {player}</p>
            </div>
        )
    }
}

Deconnection.propTypes = {
    player: PropTypes.oneOf(["player 1", "player 2"]).isRequired,
}

export default Deconnection

