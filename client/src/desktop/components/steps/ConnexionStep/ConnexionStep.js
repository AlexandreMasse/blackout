import React, {Component} from 'react'
//redux
import {connect} from 'react-redux'
import {setCurrentStep, setUserIndicationActive, setUserIndicationOpen} from "../../../redux/actions/desktopAction";
//lib
import classNames from 'classnames'
import {TimelineMax} from "gsap";
//asset
import logotype from "../../../../assets/global/video/logotype.mp4"
import {AssetsManager} from "../../../../managers"
// style
import './ConnexionStep.scss'
//steps
import steps from "..";
//components
import {LottieAnimation, TextAnimation} from "../../components";
//LottieAnimation
import animations from "../../components/LottieAnimation/animations"
import {onEnterDelay} from "../ConnexionStep/transition";
import {wsEmitCurrentStep} from "../../../redux/actions/websockets/websocketsAction";
// Howl
import { Howl } from 'howler'

class ConnexionStep extends Component {

  constructor(props) {
    super(props)

    this.state = {
      cityLeftProgression: 0,
      cityRightProgression: 0,
      isCityLeftReady: false,
      isCityRightReady: false,
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

  handleWordPlayer1Name = (word) => {
    this.wordPlayer1Name = word
  }

  handleWordPlayer2Name = (word) => {
    this.wordPlayer2Name = word
  }

  handleWordPlayer1Status = (word) => {
    this.wordPlayer1Status = word
  }

  handleWordPlayer2Status = (word) => {
    this.wordPlayer2Status = word
  }


  componentDidMount() {

    this.tl = new TimelineMax({
      delay: onEnterDelay
    })

    this.tl.delay(0.5)
    //video
    this.tl.addLabel("video")
    this.tl.to(this.ref.querySelector("video"), 1.5, {
      opacity: 1,
    }, "video")
    this.tl.add(() => {this.video.play()}, "video+=0.5")

    //baseline
    this.tl.addLabel("baseline", "-=1.3")
    this.tl.add(() => {this.wordBaseline1.start()}, "baseline")
    this.tl.to(this.ref.querySelector(".connexion-step__intro__baseline__1"), 0, {
      opacity: 1
    }, "baseline")
    this.tl.add(() => {this.wordBaseline2.start()}, "baseline+=0.3")
    this.tl.to(this.ref.querySelector(".connexion-step__intro__baseline__2"), 0, {
      opacity: 1
    }, "baseline+=0.3")

    //instructions
    this.tl.addLabel("instructions", "baseline+=0.7")
    this.tl.add(() => {this.wordInstructions1.start()}, "instructions")
    this.tl.to(this.ref.querySelector(".connexion-step__intro__codes__instructions__1"), 0, {
      opacity: 1
    }, "instructions")
    this.tl.add(() => {this.wordInstructions2.start()}, "instructions+=0.3")
    this.tl.to(this.ref.querySelector(".connexion-step__intro__codes__instructions__2"), 0, {
      opacity: 1
    }, "instructions+=0.3")

    //Player1
    this.tl.addLabel("player1", "instructions+=0.7")
    this.tl.add(() => {this.wordPlayer1Password.start()}, "player1")
    this.tl.to(this.ref.querySelector(".connexion-step__intro__codes__player1__password"), 0, {
      opacity: 1
    }, "player1")
    this.tl.add(() => {this.wordPlayer1Name.start()}, "player1+=0.3")
    this.tl.to(this.ref.querySelector(".connexion-step__intro__codes__player1__name"), 0, {
      opacity: 1
    }, "player1+=0.3")
    this.tl.add(() => {this.wordPlayer1Status.start()}, "player1+=0.6")

    //Player2
    this.tl.addLabel("player2", "instructions+=0.7")
    this.tl.add(() => {this.wordPlayer2Password.start()}, "player2")
    this.tl.to(this.ref.querySelector(".connexion-step__intro__codes__player2__password"), 0, {
      opacity: 1
    }, "player2")
    this.tl.add(() => {this.wordPlayer2Name.start()}, "player2+=0.3")
    this.tl.to(this.ref.querySelector(".connexion-step__intro__codes__player2__name"), 0, {
      opacity: 1
    }, "player2+=0.3")
    this.tl.add(() => {this.wordPlayer2Status.start()}, "player2+=0.6")
    
    // sound
    this.setIntroSound()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    if(!this.state.isCityLeftReady && prevProps.player1IntroProgression >= 1){
      console.log("city left ready !");
      this.setState({isCityLeftReady: true})
    }
    if(!this.state.isCityRightReady && prevProps.player2IntroProgression >= 1){
      console.log("city right ready !");
      this.setState({isCityRightReady: true})
    }

    if (
      (!prevState.isCityLeftReady || !prevState.isCityRightReady) &&
      (this.state.isCityLeftReady && this.state.isCityRightReady)
    ) {
      console.log("city left and right ready -> analysis");
      // fadeOut and pause introSOund
      this.introSound.fade(1, 0, 4000)
      this.introSound.once( 'fade', () => {this.introSound.stop()})
      this.props.setCurrentStep(steps.ANALYSIS.name)
      this.props.wsEmitCurrentStep(null)
    }
  }

  setIntroSound = () => {
    const introSoundAsset = AssetsManager.get('introductionSound')
    this.introSound = new Howl({
      src: introSoundAsset.src,
      volume: 0.5,
      html5: true,
      preload: true,
      autoplay: false,
      loop:true,
      format: ['mp3']
    })

    this.introSound.play()
    this.introSound.fade(0, 1, 4000)
  }

  render() {
    const {password1, password2, isPlayer1Connected, isPlayer2Connected, player1IntroProgression, player2IntroProgression} = this.props

    const {isCityLeftReady, isCityRightReady} = this.state

    return (
      <div className="connexion-step step" ref={(ref) => this.ref = ref}>

        <LottieAnimation autoplay={true} animationData={animations.HomeAbstrait} className={"home-abstrait"} />

        <input
          style={{display: "none", zIndex:"10", width: "30%", position:"absolute", top: "0"}}
          type="range"
          onChange={(e) => {this.setState({cityLeftProgression: e.target.value})}}
          value={this.state.cityLeftProgression}
          step={0.001}
          min={0}
          max={1}
        />
        <input
          style={{display: "none", zIndex: "10", width: "30%", position: "absolute", top: "25px"}}
          type="range"
          onChange={(e) => this.setState({cityRightProgression: e.target.value})}
          value={this.state.cityRightProgression}
          step={0.001}
          min={0}
          max={1}
        />

        <div className={"connexion-step__city"}>
          <LottieAnimation
            key={1}
            autoplay={false}
            loop={false}
            play={isPlayer1Connected}
            className={classNames("connexion-step__city__left", {"connected": isPlayer1Connected})}
            animationData={animations.HomeCityLeft}
            aspectRatio={"cover-right"}
            progressionTweenDuration={0.1}
            progression={isCityLeftReady ? 1 : player1IntroProgression}
          />
          <LottieAnimation
            key={2}
            autoplay={false}
            loop={false}
            play={isPlayer2Connected}
            className={classNames("connexion-step__city__right", {"connected": isPlayer2Connected})}
            animationData={animations.HomeCityRight}
            aspectRatio={"cover-left"}
            progressionTweenDuration={0.1}
            progression={isCityRightReady ? 1 : player2IntroProgression}
            //progression={Number(this.state.cityRightProgression)}
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
              text="dans un univers alternatif régit par la technologie."
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
              <TextAnimation
                letterDuration={200}
                className={"connexion-step__intro__codes__player1__name"}
                text="JOUEUR 1"
                handleWord={this.handleWordPlayer1Name}
              />

              <div className={"connexion-step__intro__codes__player1__status"}>
                {!isPlayer1Connected &&
                  <TextAnimation
                    key={1}
                    letterDuration={200}
                    text="LIBRE"
                    className={"connexion-step__intro__codes__player1__status__free"}
                    handleWord={this.handleWordPlayer1Status}
                  />
                }
                {isPlayer1Connected && !isCityLeftReady &&
                  <TextAnimation
                    key={2}
                    letterDuration={200}
                    text="CONNECTÉ"
                    className={"connexion-step__intro__codes__player1__status__connected"}
                    autoPlay={true}
                  />
                }
                {isPlayer1Connected && isCityLeftReady &&
                  <TextAnimation
                    key={3}
                    letterDuration={200}
                    text="PRET"
                    className={"connexion-step__intro__codes__player1__status__ready"}
                    autoPlay={true}
                  />
                }

              </div>
            </div>

            <div className="connexion-step__intro__codes__instructions">
              <TextAnimation
                letterDuration={200}
                className={"connexion-step__intro__codes__instructions__1"}
                text="Lancez Blackout.io sur votre smartphone et"
                handleWord={this.handleWordInstructions1}
              />
              <TextAnimation
                letterDuration={200}
                className={"connexion-step__intro__codes__instructions__2"}
                text="entrez un des codes pour démarrer."
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
              <TextAnimation
                letterDuration={200}
                className={"connexion-step__intro__codes__player2__name"}
                text="JOUEUR 2"
                handleWord={this.handleWordPlayer2Name}
              />

              <div className={"connexion-step__intro__codes__player2__status"}>
                {!isPlayer2Connected &&
                <TextAnimation
                  key={1}
                  letterDuration={200}
                  text="LIBRE"
                  className={"connexion-step__intro__codes__player2__status__free"}
                  handleWord={this.handleWordPlayer2Status}
                />
                }
                {isPlayer2Connected && !isCityRightReady &&
                <TextAnimation
                  key={2}
                  letterDuration={200}
                  text="CONNECTÉ"
                  className={"connexion-step__intro__codes__player2__status__connected"}
                  autoPlay={true}
                />
                }
                {isPlayer2Connected && isCityRightReady &&
                <TextAnimation
                  key={3}
                  letterDuration={200}
                  text="PRET"
                  className={"connexion-step__intro__codes__player2__status__ready"}
                  autoPlay={true}
                />
                }
              </div>
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
    player1IntroProgression: state.desktop.users.find(user => user.id === "player1").introProgression,
    player2IntroProgression: state.desktop.users.find(user => user.id === "player2").introProgression
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentStep: (currentStep) => dispatch(setCurrentStep(currentStep)),
    setUserIndicationActive: (userId, isActive) => dispatch(setUserIndicationActive({userId, isActive})),
    setUserIndicationOpen: (userId, isOpen) => dispatch(setUserIndicationOpen({userId, isOpen})),
    wsEmitCurrentStep: (currentStep) => dispatch(wsEmitCurrentStep({currentStep}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnexionStep)
