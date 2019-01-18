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
//css
import './LunchStep.scss'

class LunchStep extends Component {

  constructor(props) {
    super(props)

    this.state = {
    }

    this.listenDeviceOrientation()

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
        this.updateProgression(progressionRounded)
        this.props.wsEmitIntroProgression(progressionRounded)
      });
    }).catch((e) => {
      console.error(e);
    });
  }

  updateProgression = (progression) => {
    if(this.progression){
      TweenMax.to(this.progression, 0.1, {scaleY: progression})
    }
  }

  componentWillUnmount() {
    this.gn.end()
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
