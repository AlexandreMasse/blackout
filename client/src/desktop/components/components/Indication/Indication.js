import React,{Component} from 'react'
import {TextAnimation} from '../'

import {TweenMax ,TimelineMax, Power3} from 'gsap'

import './Indication.scss'  


export default class Indication extends Component {
    
    initTimeline = (ref) => {
        const arrows = ref.querySelectorAll('.arrow')
        const description = ref.querySelector('.indication__description')
        this.tl = new TimelineMax()
        this.tl.add(TweenMax.staggerTo(arrows, 0, {visibility:'visible'}, 0.35))
        this.tl.add(TweenMax.to(description, .2, {opacity:1, y:0}))
        this.tl.add(TweenMax.to(ref, .3, {delay: 1, transform: 'translateY(-15rem)'}))
        this.tl.add(TweenMax.to(ref, .3, {delay: 1.5, transform: 'translateY(0)'}))
    }

    render() {
        return (
            <div ref={this.initTimeline} className="indication indication--left">
            <div className="indication__title">
                <div className="indication__title__arrow">
                    <span className="arrow">></span>
                    <span className="arrow">></span>
                    <span className="arrow">></span>
                </div>
                <TextAnimation />
            </div>
            <p className="indication__description">Tournez les roues jusqu’à trouver la combinaison.</p>
            <span className="indication__iconContainer">
                <svg indication__iconContainer__icon viewBox="0 0 16 32">
                    <use xlinkHref="#icon-mobile" />
                </svg>
            </span>
        </div>
        )
    }
}