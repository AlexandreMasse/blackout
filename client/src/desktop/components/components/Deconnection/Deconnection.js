import React, {Component} from 'react'
import PropTypes from "prop-types"
// libs
import TweenMax from 'gsap'
// styles
import './Deconnection.scss'

import {connect} from "react-redux"

class Deconnection extends Component {
    // RESET WHEN TIME PAST

    // componentDidMount() {
    //     this.timeleft = 50
    //     this.downloadTimer = setInterval(() => {
    //     this.timeleft--;
    //         if(this.timeleft <= 0) {
    //             clearInterval(this.downloadTimer);
    //             // console.log('EXECUTE')
    //             // console.log(this.props.setCurrentStep('CONNEXION'))
    //         }
    //     },1000);
    // }

    // componentWillUnmount() {
    //     this.timeleft = 0
    //     clearInterval(this.downloadTimer);
    // }

    render() {
        const {isPlayer1Connected, isPlayer2Connected, password1, password2} = this.props

        return (
            <div className="deconnection">
                <div className="deconnection__player deconnection__player--1">
                {isPlayer1Connected ? (
                    <>
                    <p className="deconnection__player__name">Joueur 1</p>
                    <p className="deconnection__player__status">connecté</p>
                    </>
                    ) : (
                    <>
                    <p className="deconnection__player__title">Connexion perdue</p>
                    <p className="deconnection__player__name"> Joueur 1</p>
                    <p className="deconnection__player__code">{password1}</p>
                    </>
                )}
                </div>
                <div className="deconnection__player deconnection__player--2">
                {isPlayer2Connected ? (
                    <>
                    <p className="deconnection__player__name">Joueur 2</p>
                    <p className="deconnection__player__status">connecté</p>
                    </>
                ) : (
                    <>
                    <p className="deconnection__player__title">Connexion perdue</p>
                    <p className="deconnection__player__name"> Joueur 2</p>
                    <p className="deconnection__player__code">{password2}</p>
                    </>
                )}
                </div>
            </div>
        )
    }
}

export const onExit = html => {
    TweenMax.to(html, 0.4, {
        opacity: 0,
    })
}

export const onEnter = html => {
    TweenMax.to(html, 0.4, {
        opacity: 1,
    })
}

// Deconnection.propTypes = {
//     player: PropTypes.oneOf(["player 1", "player 2"]).isRequired,
// }

export default Deconnection

