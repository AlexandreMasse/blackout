import React, {Component} from 'react'
// assets
// import {AssetsManager} from "./../../../../managers"
// import {assetsToLoad} from "../../../assets/asset-list"
// redux
import {connect} from 'react-redux'
import {wsEmitSliderValue} from '../../../redux/actions/websockets/websocketsAction'

//css
import './SliderStep.scss'

 class SliderStep extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: 0
          }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.value !== prevState.value) {
            this.props.wsEmitSliderValue(this.state.value)
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

const mapStateToProps = state => {
    return {}
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      wsEmitSliderValue: (sliderValue) => dispatch(wsEmitSliderValue({sliderValue}))
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(SliderStep)
