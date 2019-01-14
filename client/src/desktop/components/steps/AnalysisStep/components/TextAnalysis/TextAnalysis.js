import React, { Component } from 'react'
import {TimelineMax} from 'gsap'

// components
import {BlockAppear} from '../index'

// styles
import './TextAnalysis.scss'

export default class TextAnalysis extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.initTimeline()
    }

    initTimeline () {
        this.blockAppear = new BlockAppear()

        this.tl = new TimelineMax()
        this.tl.add(() => {this.blockAppear.start(0)}, .6)
        this.tl.add(() => {this.blockAppear.activeValue(0)}, 1)
        this.tl.add(() => {this.blockAppear.start(1)}, 2)
        this.tl.add(() => {this.blockAppear.start(2)}, 3)
        this.tl.add(() => {this.blockAppear.activeValue(2)}, 3.4)
    }

    render() {
        return (
            <div class="text-analysis">
                <div class="block-appear">
                    <p class="block-appear__item uppercase">Initialition ANALYSE B.L.A.C.K.O.U.T</p>
                    <p class="block-appear__item uppercase">Checking sockets connections</p>
                    <p class="block-appear__item uppercase">sockets returns OK !-- here we go-- </p>
                    <p class="block-appear__item ">get.phone.data.[] = new joueur (Player1) </p>
                    <p class="block-appear__item">[------------------------------------------|</p> 
                    <div class="block">
                        <p class="block-appear__item">var phone.os -> </p>
                        <span class="block-appear__value">iOS 11</span>
                    </div>
                    <div class="block">
                        <p class="block-appear__item">var phone.year -></p><span class="block-appear__value">2018</span>
                    </div>
                    <div class="block">
                        <p class="block-appear__item">var phone.resolution = </p>
                        <span class="block-appear__value">2018</span>
                    </div>
                </div>
                <div class="block-appear">
                    <p class="block-appear__item">PROBALITY [||||||||||||--80]</p>
                </div>
                <div class="block-appear">
                    <div class="block">
                        <p class="block-appear__item">user.state -> </p>
                        <span class="block-appear__value">Ile-de-France</span>
                    </div>
                    <div class="block">
                        <p class="block-appear__item">user.country -></p>
                        <span class="block-appear__value"> FR </span>
                    </div>
                    <p class="block-appear__item">[------------------------------------------|</p>
                    <p class="block-appear__item uppercase">Systems alert /BLackout</p>
                    <p class="block-appear__item uppercase">Iep stimulation{} > stimulated ok</p>
                    <p class="block-appear__item">//////// ///////</p>
                    <p class="block-appear__item uppercase">impact = notation</p>
                    <p class="block-appear__item">user(Player1).getscore =</p>
                    <p class="block-appear__item">--------------------------</p>
                </div>
            </div>
        )
    }
}
