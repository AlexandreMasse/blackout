import React, {Component} from 'react'
//redux
import {connect} from 'react-redux'
import {setCurrentStep} from "../../../redux/actions/desktopAction";
//lib
import classNames from 'classnames'
import {TimelineMax} from "gsap";
//asset
import logotype from "../../../../assets/global/video/logotype.mp4"
// style
import './ConnexionStep.scss'
//steps
import steps from "..";
//components
import {LottieAnimation, TextAnimation} from "../../components";
//LottieAnimation
import animations from "../../components/LottieAnimation/animations"
import {onEnterDelay} from "../ConnexionStep/transition";

class ConnexionStep extends Component {

  constructor(props) {
    super(props)

    this.state = {
      cityLeftProgression: 0,
      cityRightProgression: 0
    }
  }


  handleWordBaseline1 = (word) => {
    this.wordBaseline1 = word
  }

  handleWordBaseline2 = (word) => {
    this.wordBaseline2 = word
  }

  handleWordInstructions1 = (word) => {
    this.wordInstructions1 = word
  }

  handleWordInstructions2 = (word) => {
    this.wordInstructions2 = word
  }

  handleWordPlayer1Password = (word) => {
    this.wordPlayer1Password = word
  }

  handleWordPlayer2Password = (word) => {
    this.wordPlayer2Password = word
  }


  componentDidMount() {

    this.tl = new TimelineMax({
      delay: onEnterDelay
    })

    this.tl.delay(1.5)
    //video
    this.tl.to(this.ref.querySelector("video"), 4, {
      opacity: 1
    })

    this.tl.add(() => {this.video.play()})

    //baseline
    this.tl.addLabel("baseline", "-=3")
    this.tl.add(() => {this.wordBaseline1.start()}, "baseline")
    this.tl.to(this.ref.querySelector(".connexion-step__intro__baseline__1"), 1, {
      opacity: 1
    }, "baseline")
    this.tl.add(() => {this.wordBaseline2.start()}, "baseline+=0.5")
    this.tl.to(this.ref.querySelector(".connexion-step__intro__baseline__2"), 1, {
      opacity: 1
    }, "baseline+=0.5")

    //instructions
    this.tl.addLabel("instructions", "baseline+=1")
    this.tl.add(() => {this.wordInstructions1.start()}, "instructions")
    this.tl.to(this.ref.querySelector(".connexion-step__intro__codes__instructions__1"), 1, {
      opacity: 1
    }, "instructions")
    this.tl.add(() => {this.wordInstructions2.start()}, "instructions+=0.5")
    this.tl.to(this.ref.querySelector(".connexion-step__intro__codes__instructions__2"), 1, {
      opacity: 1
    }, "instructions+=0.5")

    //Player1
    this.tl.addLabel("player1", "instructions+=1")
    this.tl.add(() => {this.wordPlayer1Password.start()}, "player1")
    this.tl.to(this.ref.querySelector(".connexion-step__intro__codes__player1__password"), 1, {
      opacity: 1
    }, "player1")

    //Player2
    this.tl.addLabel("player2", "player1+=0.5")
    this.tl.add(() => {this.wordPlayer2Password.start()}, "player2")
    this.tl.to(this.ref.querySelector(".connexion-step__intro__codes__player2__password"), 1, {
      opacity: 1
    }, "player2")

  }


  render() {
    const {password1, password2, isPlayer1Connected, isPlayer2Connected, player1PhoneData, player2PhoneData} = this.props
    return (
      <div className="connexion-step step" ref={(ref) => this.ref = ref}>

        <p style={{position:"absolute", margin:"0", top: "10px", left: "10px", zIndex: "100", fontSize:"3rem", cursor:"pointer"}} onClick={() => this.props.setCurrentStep(steps.ANALYSIS.name)}>Next step ></p>

        {/*TODO: enable autoplay*/}
        <LottieAnimation autoplay={true} animationData={animations.HomeAbstrait} className={"home-abstrait"} />

        <input
          style={{zIndex:"10", width: "50%", position:"absolute", top: "0"}}
          type="range"
          onChange={(e) => {console.log(e); this.setState({cityLeftProgression: e.target.value})}}
          value={this.state.cityLeftProgression}
          step={0.001}
          min={0}
          max={1}
        />
        <input
          style={{zIndex: "10", width: "50%", position: "absolute", top: "25px"}}
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
          <video width="350" loop muted={true} ref={(ref) => this.video = ref}>
            <source src={logotype} type="video/mp4"/>
          </video>

          <div className="connexion-step__intro__baseline">
            <TextAnimation
              letterDuration={200}
              className={"connexion-step__intro__baseline__1"}
              text="Une expérience de survie collaborative,"
              handleWord={this.handleWordBaseline1}
            />
            <TextAnimation
              letterDuration={200}
              className={"connexion-step__intro__baseline__2"}
              text="dans un univers alternatif régit par la technologie"
              handleWord={this.handleWordBaseline2}
            />
          </div>

          <div className="connexion-step__intro__codes">
            <div className={classNames("connexion-step__intro__codes__player1", {"connected": isPlayer1Connected})}>
              {password1 &&
                <TextAnimation
                  letterDuration={200}
                  className={"connexion-step__intro__codes__player1__password"}
                  text={password1.toString()}
                  handleWord={this.handleWordPlayer1Password}
                />
              }
              <p className={"connexion-step__intro__codes__player1__score"}>JOUEUR 1</p>
            </div>

            <div className="connexion-step__intro__codes__instructions">
              <TextAnimation
                letterDuration={200}
                className={"connexion-step__intro__codes__instructions__1"}
                text="Lancez Blackout sur votre smartphone et"
                handleWord={this.handleWordInstructions1}
              />
              <TextAnimation
                letterDuration={200}
                className={"connexion-step__intro__codes__instructions__2"}
                text="entrez un des codes pour démarrer"
                handleWord={this.handleWordInstructions2}
              />
            </div>

            <div className={classNames("connexion-step__intro__codes__player2", {"connected": isPlayer2Connected})}>
              {password2 &&
                <TextAnimation
                  letterDuration={200}
                  className={"connexion-step__intro__codes__player2__password"}
                  text={password2.toString()}
                  handleWord={this.handleWordPlayer2Password}
                />
              }
              <p className={"connexion-step__intro__codes__player2__score"}>JOUEUR 2</p>
            </div>
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
