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

    render() {
        return (
            <div className="slider-step">
                <div className="slider-step__wrapper">
                    <input 
                        className="slider-step__input" 
                        min="0"
                        max="100"
                        type="range"
                        value={this.state.value}
                        onChange={(e) => {this.setState({value: e.target.value})}} 
                    />
                </div>
            </div>
        )
    }
}