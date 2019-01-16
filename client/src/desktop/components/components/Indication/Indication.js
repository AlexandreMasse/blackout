import React,{Component} from 'react'
import {TextAnimation} from '../'

import {TweenMax ,TimelineMax, Power3} from 'gsap'
import classNames from "classnames"
import PropTypes from "prop-types"

import './Indication.scss'

import {connect} from "react-redux";


class Indication extends Component {
    
    componentDidMount() {
        const arrows = this.ref.querySelectorAll('.arrow')
        const description = this.ref.querySelector('.indication__description')
        this.tl = new TimelineMax()

        this.tl.add(TweenMax.staggerTo(arrows, 0, {visibility:'visible'}, 0.35))
        this.tl.add(() => {this.word.start()}, 1)
        this.tl.add(TweenMax.to(description, .2, {opacity:1, y:0}))
        this.tl.add(TweenMax.to(this.ref, .3, {delay: 1, transform: 'translateY(-15rem)'}))
        this.tl.add(TweenMax.to(this.ref, .3, {delay: 1.5, transform: 'translateY(0)'}))
    }
    
    initTimeline = (ref) => {
        this.ref = ref
    }

    render() {
        const {player, player1Indication, player2Indication} = this.props
        let indication = null

        if(this.props.player === "player1") {
            indication = player1Indication
        }
        if(this.props.player === "player2") {
            indication = player2Indication
        }

        return (
            <div ref={this.initTimeline} className={classNames("indication",
              {"indication--left" : player === "player1"},
              {"indication--right" : player === "player2"},
              )}>
            <div className="indication__title">
                <div className="indication__title__arrow">
                    <span className="arrow">></span>
                    <span className="arrow">></span>
                    <span className="arrow">></span>
                </div>
                {indication.title && <TextAnimation text={indication.title} handleWord={word => this.word = word}/>}
            </div>
            <p className="indication__description">{indication.description}</p>
            <span className="indication__iconContainer">
                <svg indication__iconContainer__icon viewBox="0 0 16 32">
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

const mapStateToProps = state => {
    return {
        player1Indication: state.desktop.users.find(user => user.id === "player1").indication,
        player2Indication: state.desktop.users.find(user => user.id === "player1").indication
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Indication)