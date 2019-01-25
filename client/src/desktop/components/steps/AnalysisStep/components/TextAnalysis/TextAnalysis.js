import React, { Component } from 'react'
import {TimelineMax} from 'gsap'
import classNames from 'classnames'

// components
import {BlockAppear} from '../index'

// styles
import './TextAnalysis.scss'

export default class TextAnalysis extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.init()
    }

    init = () => {
        this.blockAppear = new BlockAppear()
        if(this.props.handleBlockAppear) {
            this.props.handleBlockAppear(this.blockAppear)
        }
    }

    render() {
        return (
            <div className={classNames("text-analysis",  `text-analysis--${this.props.position}`)}>
                <div className="block-appear">
                    <p className="block-appear__item uppercase">Initialition ANALYSE B.L.A.C.K.O.U.T</p>
                    <p className="block-appear__item uppercase">Checking sockets connections</p>
                    <p className="block-appear__item uppercase">sockets returns OK !-- here we go --! </p>
                    <p className="block-appear__item ">get.phone.data.[] = new joueur ({this.props.userId}) </p>
                    <p className="block-appear__item">[-----------------------------------------|</p> 
                    <div className="block">
                        <p className="block-appear__item">var phone.os → </p>
                        <span className="block-appear__value">{this.props.os}</span>
                    </div>
                    <div className="block">
                        <p className="block-appear__item">var phone.year →</p><span className="block-appear__value">{this.props.year}</span>
                    </div>
                    <div className="block">
                        <p className="block-appear__item">var phone.resolution = </p>
                        <span className="block-appear__value">{this.props.resolution}</span>
                    </div>
                </div>
                <div className="block-appear">
                    <p className="block-appear__item">PROBABILITY  [ | | | | | | | | | | | | | | | | |--80 ] </p>
                </div>
                <div className="block-appear">
                    <div className="block">
                        <p className="block-appear__item">user.state → </p>
                        <span className="block-appear__value">{this.props.state}</span>
                    </div>
                    <div className="block">
                        <p className="block-appear__item">user.country →</p>
                        <span className="block-appear__value">{this.props.country}</span>
                    </div>
                    <p className="block-appear__item">|-----------------------------------------]</p>
                    <p className="block-appear__item uppercase">Systems alert /BLackout</p>
                    <p className="block-appear__item uppercase">Iep stimulation{} > stimulated ok</p>
                    <p className="block-appear__item">/////////// ///////////</p>
                    <p className="block-appear__item uppercase">impact = notation</p>
                    <p className="block-appear__item">user({this.props.userId}).getscore = {this.props.userId === 'Player1' ? this.props.scoreUser1 : this.props.scoreUser2}</p>
                    <p className="block-appear__item">---------------------------------------------</p>
                    <div className="block block--player">
                        <div className="block--player__wrapper">
                            <span>|</span>
                                <p className="block-appear__item">
                                    <span>PLAYER1</span>
                                </p>
                            <span className="ndisplay">|</span> 
                        </div>
                        
                        <div className="block--player__wrapper">
                            <span>|</span>
                                <p className="block-appear__item">
                                    <span>PLAYER2</span>
                                </p>
                            <span>|</span> 
                        </div>
                    </div>
                    <div className="block block--player">
                        <div className="block--player__wrapper">
                            <span>|</span>
                            <span className="block-appear__value">{this.props.scoreUser1} </span>
                            <span className="ndisplay">|</span> 
                        </div>
                        <div className="block--player__wrapper">
                            <span>|</span>
                            <span className="block-appear__value">{this.props.scoreUser2} </span>
                            <span>|</span>
                        </div>
                    </div>
                    <p className="block-appear__item">---------------------------------------------</p>
                </div>
            </div>
        )
    }
}
