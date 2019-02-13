import React, {Component} from 'react'
// redux
import {connect} from 'react-redux'
import {wsEmitFingerprint} from "../../../redux/actions/websockets/websocketsAction";
//import {setCurrentStep} from "../../../redux/actions/mobileAction";
import { Howl } from 'howler'
// assets
import {AssetsManager} from "./../../../../managers"
//css
import './FingerprintStep.scss'
//lib
import {TweenMax} from 'gsap'
import {assetsToLoad} from "../../../assets/asset-list";

class FingerprintStep extends Component {


  constructor(props) {
    super(props);

    this.pressHoldDone = false;
    this.pressHoldDuration = 1.5;
    this.counter = 0
    this.fingerPrintSound()
  }

  handleRef = (el) => {
    this.props.handleRef(el)
  }

  fingerPrintSound = () => {
    const fingerAdvantageAsset = AssetsManager.get('fingerprintAdvandtage')
    const fingerDisadvantageAsset = AssetsManager.get('fingerprintDisadvandtage')

    this.fingerAdvantage = new Howl({
      src: fingerAdvantageAsset.src,
      volume: 1,
      html5: true,
      preload: true,
      autoplay: false,
      loop: false,
      format: ['mp3']
    })

    this.fingerDisadvantage = new Howl({
      src: fingerDisadvantageAsset.src,
      volume: 1,
      html5: true,
      preload: true,
      autoplay: false,
      loop: false,
      format: ['mp3']
    })
  }

  componentDidMount() {
    this.button = this.ref.querySelector(".fingerprint-step__button")
    this.buttonProgression = this.ref.querySelector(".fingerprint-step__button__progression")
    this.button.addEventListener("touchstart", this.pressingDown, false);
    this.button.addEventListener("touchend", this.notPressingDown, false);
  }

  progressionAnimation = (duration) => {
    TweenMax.to(this.buttonProgression, duration, {
      y: 100 - ((this.counter / 60) / this.pressHoldDuration) * 100 + "%"
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
    if(!this.pressHoldDone)  {
      this.progressionAnimation(0.5)
    }
  }

  timer = () => {
    const {playerStatus} = this.props

    console.log("Timer!");
    if (this.counter < this.pressHoldDuration * 60) {
      this.timerID = requestAnimationFrame(this.timer);
      this.counter++;
      this.progressionAnimation(0.05)
    } else {
      this.pressHoldDone = true
      if (playerStatus === 'superior') {
        this.fingerAdvantage.play()
      } else {
        this.fingerDisadvantage.play()
      }
      this.props.wsEmitFingerprint()
    }
  }

  render() {
    return (
      <div className="fingerprint-step" ref={ref => this.ref = ref}>
        <div className="fingerprint-step__button">
          <div className="fingerprint-step__button__progression"
               style={{backgroundImage: `url(${AssetsManager.get(assetsToLoad.trame.name).src})`}}/>
          <svg>
            <use xlinkHref="#fingerprint"/>
          </svg>
        </div>
      </div>    
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    //playerStatus: state.mobile.users.find(user => user.id === state.mobile.userId).status,
    player: state.mobile.userId,
    playerStatus: state.mobile.users.find(user => user.id === state.mobile.userId).status,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    wsEmitFingerprint: () => dispatch(wsEmitFingerprint()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FingerprintStep)