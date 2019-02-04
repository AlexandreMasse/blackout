import React, {Component} from 'react'
// redux
import {connect} from 'react-redux'
import {wsEmitFingerprint} from "../../../redux/actions/websockets/websocketsAction";
//import {setCurrentStep} from "../../../redux/actions/mobileAction";
//css
import './FingerprintStep.scss'
//lib
import {TweenMax} from 'gsap'

class FingerprintStep extends Component {


  constructor(props) {
    super(props);

    this.pressHoldDuration = 2.5;
    this.counter = 0
  }

  handleRef = (el) => {
    this.props.handleRef(el)
  }

  componentDidMount() {
    this.button = this.ref.querySelector(".fingerprint-step__button")
    this.buttonProgression = this.ref.querySelector(".fingerprint-step__button__progression")
    this.button.addEventListener("touchstart", this.pressingDown, false);
    this.button.addEventListener("touchend", this.notPressingDown, false);
  }

  progressionAnimation = (duration) => {
    TweenMax.to(this.buttonProgression, duration, {
      scaleY: (this.counter / 60) / this.pressHoldDuration
    })
  }

  pressingDown = (e) => {
    console.log("Pressing!");
    // Start the timer
    requestAnimationFrame(this.timer);
    e.preventDefault();
  }

  notPressingDown = (e) => {
    console.log("Not pressing!");
    // Stop the timer
    cancelAnimationFrame(this.timerID);
    this.counter = 0;
    this.progressionAnimation(0.5)
  }

  timer = () => {
    console.log("Timer!");
    if (this.counter < this.pressHoldDuration * 60) {
      this.timerID = requestAnimationFrame(this.timer);
      this.counter++;
      console.log(this.counter);

      this.progressionAnimation(0.05)
    } else {
      console.log("Press threshold reached!");
      this.props.wsEmitFingerprint()
    }
  }

  render() {
    return (
      <div className="fingerprint-step" ref={ref => this.ref = ref}>
        <div className="fingerprint-step__button">
          <div className="fingerprint-step__button__progression"/>
        </div>
      </div>    
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    //playerStatus: state.mobile.users.find(user => user.id === state.mobile.userId).status,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    wsEmitFingerprint: () => dispatch(wsEmitFingerprint()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FingerprintStep)