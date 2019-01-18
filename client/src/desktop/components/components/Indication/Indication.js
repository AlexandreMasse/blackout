import React,{Component} from 'react'
import {TextAnimation} from '../'

import {TweenMax ,TimelineMax, Power2} from 'gsap'
import classNames from "classnames"
import PropTypes from "prop-types"

import './Indication.scss'

import {setUserIndicationOpen} from "../../../redux/actions/desktopAction"

import {connect} from "react-redux";
import {setCurrentStep} from "../../../../mobile/redux/actions/mobileAction";


class Indication extends Component {
    
    componentDidMount() {

        this.arrows = this.ref.querySelectorAll('.arrow')
        this.description = this.ref.querySelector('.indication__description')
        this.title = this.ref.querySelector('.textAnimation')


        if(this.props.playerIndication.isActive){
            this.onActive()
        }

    }
    
    initTimeline = (ref) => {
        this.ref = ref
    }

    onActive = () => {
        console.log("active !");
        this.title.innerHTML = ""
        this.tlOnActive = new TimelineMax()

        this.tlOnActive.set(this.ref, {transform:'translateY(0)'}, "+=0")
        this.tlOnActive.staggerFromTo(this.arrows, 0.01, {visibility: 'hidden'}, {visibility: 'visible'}, 0.25, "+=0")
        this.tlOnActive.addCallback(() => {
            console.log("word start");
            this.word.start()
        }, "+=0")
        this.tlOnActive.fromTo(this.description, .6, {opacity: 0, y: 5}, {
            ease: Power2.easeInOut,
            opacity: 1,
            y: 0
        }, "+=0.5")
        this.tlOnActive.addCallback(() => {
            this.props.setUserIndicationOpen(this.props.player, true)
        }, "+=0.5")
    }

    onNotActive = () => {
        console.log("not active");
        TweenMax.to(this.ref, .3,{
            transform: 'translateY(7rem)',
        })
    }

    onNotOpen = () => {
        TweenMax.to(this.ref, .6, {
            ease: Power2.easeInOut,
            transform: 'translateY(0)'
        })
    }

    onOpen = () => {
        TweenMax.fromTo(this.ref, .6, {transform: "translateY(0)"}, {
            ease: Power2.easeInOut,
            transform: 'translateY(-12rem)',
        })
    }


    componentWillReceiveProps(nextProps, nextContext) {

        if(!this.props.playerIndication.isActive && nextProps.playerIndication.isActive) {
            this.onActive()
        }
        if(this.props.playerIndication.isActive && !nextProps.playerIndication.isActive) {
            this.onNotActive()
        }

        if(!this.props.playerIndication.isOpen && nextProps.playerIndication.isOpen) {
            this.onOpen()
        }

        if(this.props.playerIndication.isOpen && !nextProps.playerIndication.isOpen) {
            this.onNotOpen()
        }
    }

    render() {
        const {player, playerIndication} = this.props

        const isPlayer1 = player === "player1"
        const isPlayer2 = player === "player2"

        return (
            <div ref={this.initTimeline} className={classNames("indication",
              {"indication--left" : isPlayer1},
              {"indication--right" : isPlayer2},
              )}>
            <div className="indication__title">
                <div className="indication__title__arrow">
                    {isPlayer1 && <>
                        <span className="arrow">></span>
                        <span className="arrow">></span>
                        <span className="arrow">></span>
                    </>}
                    {isPlayer2 && <>
                        <span className="arrow">{"<"}</span>
                        <span className="arrow">{"<"}</span>
                        <span className="arrow">{"<"}</span>
                    </>}
                </div>
                {playerIndication.title && <TextAnimation letterDuration={300} text={playerIndication.title} handleWord={word => this.word = word}/>}
            </div>
            <p className="indication__description">{playerIndication.description}</p>
            <span className="indication__iconContainer">
                <svg className="indication__iconContainer__icon" viewBox="0 0 16 32">
                    <use xlinkHref="#icon-mobile" />
                </svg>
            </span>
        </div>
        )
    }
}

Indication.propTypes = {
    player: PropTypes.oneOf(["player1","player2"]).isRequired
}

const mapStateToProps = (state, props) => {
    return {
        playerIndication: state.desktop.users.find(user => user.id === props.player).indication,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUserIndicationOpen: (userId, isOpen) => dispatch(setUserIndicationOpen({userId,isOpen}))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Indication)