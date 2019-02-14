import React, {Component} from 'react';
//redux
import {connect} from 'react-redux';
import {wsEmitIntroProgression} from "../../../redux/actions/websockets/websocketsAction";
import {setCurrentStep} from "../../../redux/actions/mobileAction";
//components
//step
//lib
import GyroNorm from  'gyronorm';
import {TweenMax} from 'gsap'
import {Howl} from 'howler'
import {AssetsManager} from "./../../../../managers"
//css
import './LunchStep.scss'

class LunchStep extends Component {

  constructor(props) {
    super(props)

    this.state = {
      finish: false
    }

    this.lastBeta = null
    this.currentDirection = null

    this.listenDeviceOrientation()

    this.initSound()

  }


  listenDeviceOrientation() {

    this.gn = new GyroNorm();

    const args = {
      frequency: 50,
      gravityNormalized: true,
      orientationBase: GyroNorm.GAME,
      decimalCount: 2,
      logger: null,
      screenAdjusted: false
    };

    this.gn.init(args).then(() => {
      this.gn.start((data) => {
        const minBeta = 0
        const maxBeta = 90
        const progression = (data.do.beta - minBeta) / (maxBeta - minBeta)
        const progressionClamped = Math.min(Math.max(progression, 0), 1);
        const progressionRounded = Number(progressionClamped.toPrecision(4))
 
        // this.soundMobileUp.volume(progressionRounded)

        // if(this.lastBeta) {
        //   if(this.lastBeta < data.do.beta) {
        //     if(this.currentDirection === "down" || this.currentDirection === null) {
        //       console.log("up");
        //       this.soundMobileUp.play()
        //       this.soundMobileUp.fade(this.soundMobileUp.volume(), 1, 200)
        //       //this.soundMobileDown.fade(this.soundMobileDown.volume(), 0, 200)
        //
        //       this.currentDirection = "up"
        //     }
        //   } else {
        //     if (this.currentDirection === "up" || this.currentDirection === null) {
        //       console.log("down");
        //       // this.soundMobileDown.play()
        //       // this.soundMobileDown.fade(this.soundMobileDown.volume(), 1, 200)
        //       this.soundMobileUp.fade(this.soundMobileUp.volume(), 0, 200)
        //       //
        //       this.currentDirection = "down"
        //     }
        //   }
        // }
        // this.lastBeta = data.do.beta

        if(!this.state.finish) {
          this.updateProgression(progressionRounded)
          this.props.wsEmitIntroProgression(progressionRounded)
        } else {
          this.updateProgression(1)
          this.props.wsEmitIntroProgression(1)
          this.gn.stop()
        }
      });
    }).catch((e) => {
      console.error(e);
    });
  }

  updateProgression = (progression) => {
    if(this.progression){
      TweenMax.to(this.progression, 0.1, {scaleY: progression})
      if(progression >= 1 && !this.state.finish) {
        this.setState({finish: true})
      }
    }
  }


  initSound = () => {
    const soundMobileUp = AssetsManager.get('mobileUp')
    this.soundMobileUp = new Howl({
      src: soundMobileUp.src,
      volume: 0,
      html5: true,
      preload: true,
      autoplay: false,
      loop: true,
      format: ['mp3']
    })

    // this.soundMobileUp.play()

    const soundMobileDown = AssetsManager.get('mobileDown')
    this.soundMobileDown = new Howl({
      src: soundMobileDown.src,
      volume: 0,
      html5: true,
      preload: true,
      autoplay: false,
      loop: false,
      format: ['mp3']
    })

  }

  componentWillUnmount() {
    this.gn.end()
    this.soundMobileUp.stop()
  }

  componentDidMount() {
    this.progression = this.ref.querySelector(".lunch-step__box__progression")
  }




  render() {
    const {isConnected} = this.props
    const {password} = this.state

    return (
      <div className="lunch-step" ref={(ref) => {this.ref = ref}}>
        <p className={"lunch-step__text"}>Ce smartphone sera votre manette lors de l’expérience.<br/>Ne le verrouillez pas et ne quittez pas la page.</p>
        <div className={"lunch-step__box"}>
          <div className="lunch-step__box__progression"/>
          <p>Pour commencer, maintenez-le à la verticale.</p>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    isConnected: state.mobile.isConnected,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    wsEmitIntroProgression: (progression) => dispatch(wsEmitIntroProgression({progression})),
    setCurrentStep: (currentStep) => dispatch(setCurrentStep(currentStep)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LunchStep);
