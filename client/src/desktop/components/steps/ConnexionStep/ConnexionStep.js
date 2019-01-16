import React, {Component} from 'react'
//redux
import {connect} from 'react-redux'
import {setCurrentStep} from "../../../redux/actions/desktopAction";
//lib
import classNames from 'classnames'
//asset
import logotype from "../../../../assets/global/video/logotype.mp4"
// style
import './ConnexionStep.scss'
//steps
import steps from "../index";
//components
import {LottieAnimation} from "../../components";
//LottieAnimation
import animations from "../../components/LottieAnimation/animations"

class ConnexionStep extends Component {

  constructor(props) {
    super(props)

    this.state = {
      cityLeftProgression: 0,
      cityRightProgression: 0
    }
  }




  render() {
    const {password1, password2, isPlayer1Connected, isPlayer2Connected, player1PhoneData, player2PhoneData} = this.props
    return (
      <div className="connexion-step step">
        {/*TODO: enable autoplay*/}
        <LottieAnimation autoplay={true} animationData={animations.HomeAbstrait} className={"home-abstrait"} />

        <input
          style={{zIndex:"10", width: "50%"}}
          type="range"
          onChange={(e) => {console.log(e); this.setState({cityLeftProgression: e.target.value})}}
          value={this.state.cityLeftProgression}
          step={0.001}
          min={0}
          max={1}
        />
        <input
          style={{zIndex:"10", width: "50%"}}
          type="range"
          onChange={(e) => this.setState({cityRightProgression: e.target.value})}
          value={this.state.cityRightProgression}
          step={0.001}
          min={0}
          max={1}
        />

        <div className={"connexion-step__city"}>
          <LottieAnimation
            autoplay={false}
            loop={false}
            play={isPlayer1Connected}
            className={"connexion-step__city__left"}
            animationData={animations.HomeCityLeft}
            aspectRatio={"cover-right"}
            speed={0.8}
            progressionTweenDuration={0.2}
            progression={this.props.player1IntroProgression}
          />
          <LottieAnimation
            autoplay={false}
            loop={false}
            play={isPlayer2Connected}
            className={"connexion-step__city__right"}
            animationData={animations.HomeCityRight}
            aspectRatio={"cover-left"}
            speed={0.8}
            progression={Number(this.state.cityRightProgression)}
          />
        </div>

        <div className="connexion-step__intro">
          <video width="350" autoPlay loop muted={true}>
            <source src={logotype} type="video/mp4"/>
          </video>
          <p>Prenez votre mobile et connectez vous à l'expérience !</p>
          {/* <p onClick={() => this.props.setCurrentStep(steps.SCENE.name)}>Next step ></p> */}
          <p onClick={() => this.props.setCurrentStep(steps.ANALYSIS.name)}>Next step ></p>
        </div>
        <div className="connexion-step__codes">
          <div className={classNames("player1", {"connected": isPlayer1Connected})}>
            <p className={"password"}>{password1}</p>
            <p className={"score"}>{player1PhoneData ? player1PhoneData.score : ''}</p>
          </div>
          <div className={classNames("player2", {"connected": isPlayer2Connected})}>
            <p className={"password"}>{password2}</p>
            <p className={"score"}>{player2PhoneData ? player2PhoneData.score : ''}</p>
          </div>
        </div>
      </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    password1: state.desktop.password1,
    password2: state.desktop.password2,
    isPlayer1Connected: state.desktop.users.find(user => user.id === "player1").isConnected,
    isPlayer2Connected: state.desktop.users.find(user => user.id === "player2").isConnected,
    player1PhoneData: state.desktop.users.find(user => user.id === "player1").phoneData,
    player2PhoneData: state.desktop.users.find(user => user.id === "player2").phoneData,
    player1IntroProgression: state.desktop.users.find(user => user.id === "player1").introProgression,
    player2IntroProgression: state.desktop.users.find(user => user.id === "player1").introProgression
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentStep: (currentStep) => dispatch(setCurrentStep(currentStep))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnexionStep)
