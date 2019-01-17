import React, {Component} from 'react'
// assets
// import {AssetsManager} from "./../../../../managers"
// import {assetsToLoad} from "../../../assets/asset-list"

//css
import './SliderStep.scss'

export default class SliderStep extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: 0
          }
    }
    
    componentDidMount() {
        this.test()
    }

    init = () => {
        this.inputRange = document.querySelector('.slider-step__input')
        console.log(this.inputRange)
        this.maxValue = 100
        this.speed = 3
        this.inputRange.min = 0
        this.inputRange.max = this.maxValue
        this.rafID = null

        this.inputRange.addEventListener('mousedown', this.unlockStartHandler(), false)
        this.inputRange.addEventListener('mousestart', this.unlockStartHandler(), false)
        this.inputRange.addEventListener('mouseup', this.unlockEndHandler(), false)
        this.inputRange.addEventListener('touchend', this.unlockEndHandler(), false)
    }

    unlockStartHandler = () => {
        window.cancelAnimationFrame(this.rafID)
        this.currValue = +this.value
        console.log(this.currValue)
    }

    unlockEndHandler = () => {
        // store current value
        this.currValue = +this.value
        if (this.currValue >= this.maxValue) {
            this.successHandler()
        }
        else {
            this.rafID = window.requestAnimationFrame(this.animateHandler)
        }
    }

    animateHandler = () => {
        
        this.inputRange.value = this.currValue
        // determine if we need to continue
        if(this.currValue > -1) {
            window.requestAnimationFrame(this.animateHandler)
        }
        
        // decrement value
        this.currValue = this.currValue - this.speed
    }

    successHandler = () => {
        alert('unlocked')
        // reset input range
        this.inputRange.value = 0
    }

    handleRef = (el) => {
        if (el) {
            console.log(el)
            // this.init(el)
        }
    } 

    handleChange (event) {
        this.setState({value: event.target.value})
    }
   
    render() {
        return (
            <div className="slider-step">
                <div className="slider-step__wrapper">
                    <input className="slider-step__input" type="range" value={this.state.value} onChange={this.handleChange}/>
                    {/* <input className="slider-step__input" type="range" value="0"/> */}
                </div>
            </div>
        )
      }
}