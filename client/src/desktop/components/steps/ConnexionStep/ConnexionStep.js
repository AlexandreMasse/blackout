import React, {Component} from 'react'
//redux
import {connect} from 'react-redux'
import {setCurrentStep, setUserIndicationActive, setUserIndicationOpen} from "../../../redux/actions/desktopAction";
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
import { Howl } from 'howler'
import {AssetsManager} from "../../../../managers"
//LottieAnimation
import animations from "../../components/LottieAnimation/animations"
import {onEnterDelay} from "../ConnexionStep/transition";
import {wsEmitCurrentStep} from "../../../redux/actions/websockets/websocketsAction";


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
    this.setSound()
    this.setStartTimeline()
    this.fullscreen = document.querySelector('.connexion-step__intro__fullscreen')
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
    // button
    this.tl.addLabel("button", "baseline+=.8")
    this.tl.to(this.button,.8, {opacity:1}, "button")
    // fullscren instruction
    this.tl.addLabel("fullscreen", "button+=.4")
    this.tl.to(this.fullscreen, .8, {opacity:1}, "fullscreen")
    // Credits
    this.tl.addLabel("credits", "fullscreen+=0.7")
    this.tl.to(this.credits, .8, {opacity: 1}, "credits")
    // // Icon
    this.tl.addLabel("icon", "fullscreen+=0.7")
    this.tl.to(this.icon, .8, {opacity: 1}, "icon")
  }

  setStartTimeline = () => {
    this.button = document.querySelector('.connexion-step__intro__start')
    this.icon = document.querySelector('.connexion-step__icon')
    this.credits = document.querySelector('.connexion-step__credits')

    this.startTl = new TimelineMax({
      // delay: onEnterDelay
      paused:true
    })
    // button 
    this.startTl.addLabel("button")
    this.startTl.to(this.button, .8, {opacity: 0}, "button")
    //instructions
    this.startTl.addLabel("instructions", "button+=0.7")
    this.startTl.add(() => {this.wordInstructions1.start()}, "instructions")
    this.startTl.to(this.ref.querySelector(".connexion-step__intro__codes__instructions__1"), 0, {
      opacity: 1
    }, "instructions")
    this.startTl.add(() => {this.wordInstructions2.start()}, "instructions+=0.3")
    this.startTl.to(this.ref.querySelector(".connexion-step__intro__codes__instructions__2"), 0, {
      opacity: 1
    }, "instructions+=0.3")

    //Player1
    this.startTl.addLabel("player1", "instructions+=0.7")
    this.startTl.add(() => {this.wordPlayer1Password.start()}, "player1")
    this.startTl.to(this.ref.querySelector(".connexion-step__intro__codes__player1__password"), 0, {
      opacity: 1
    }, "player1")
    this.startTl.add(() => {this.wordPlayer1Name.start()}, "player1+=0.3")
    this.startTl.to(this.ref.querySelector(".connexion-step__intro__codes__player1__name"), 0, {
      opacity: 1
    }, "player1+=0.3")
    this.startTl.add(() => {this.wordPlayer1Status.start()}, "player1+=0.6")

    //Player2
    this.startTl.addLabel("player2", "instructions+=0.7")
    this.startTl.add(() => {this.wordPlayer2Password.start()}, "player2")
    this.startTl.to(this.ref.querySelector(".connexion-step__intro__codes__player2__password"), 0, {
      opacity: 1
    }, "player2")
    this.startTl.add(() => {this.wordPlayer2Name.start()}, "player2+=0.3")
    this.startTl.to(this.ref.querySelector(".connexion-step__intro__codes__player2__name"), 0, {
      opacity: 1
    }, "player2+=0.3")
    this.startTl.add(() => {this.wordPlayer2Status.start()}, "player2+=0.6")

  }

  startExperience = () => {
    this.startTl.play()
    this.doorOpen.play()
    this.introSound.play()
    this.introSound.fade(0, 1, 4000)
  }

  setSound = () => {
    const introSoundAsset = AssetsManager.get('introductionSound')
    const doorOpenAsset = AssetsManager.get('doorOpen')
    const playerReadyAsset = AssetsManager.get('playerReady')

    this.doorOpen = new Howl({
      src: doorOpenAsset.src,
      volume: .8,
      html5: true,
      preload: true,
      autoplay: false,
      loop:false,
      format: ['mp3']
    })

    this.introSound = new Howl({
      src: introSoundAsset.src,
      volume: 0.5,
      html5: true,
      preload: true,
      autoplay: false,
      loop:true,
      format: ['mp3']
    })

    this.playerReady = new Howl({
      src: playerReadyAsset.src,
      volume: 1,
      html5: true,
      preload: true,
      autoplay: false,
      loop:false,
      format: ['mp3']
    })
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (!this.state.isCityLeftReady && nextProps.player1IntroProgression >= 1) {
      console.log("city left ready !");
      this.playerReady.play()
      this.setState({isCityLeftReady: true})
    }
    if (!this.state.isCityRightReady && nextProps.player2IntroProgression >= 1) {
      console.log("city right ready !");
      this.playerReady.play()
      this.setState({isCityRightReady: true})
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    if (
      (!prevState.isCityLeftReady || !prevState.isCityRightReady) &&
      (this.state.isCityLeftReady && this.state.isCityRightReady)
    ) {
      console.log("city left and right ready -> analysis");
      this.introSound.fade(1, 0, 4000)
      this.introSound.once( 'fade', () => {this.introSound.stop()})
      this.props.setCurrentStep(steps.ANALYSIS.name)
      this.props.wsEmitCurrentStep(null)
    }
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
            className={classNames("connexion-step__city__right", {"connected": isPlayer2Connected})}
            animationData={animations.HomeCityRight}
            aspectRatio={"cover-left"}
            progressionTweenDuration={0.1}
            progression={isCityRightReady ? 1 : player2IntroProgression}
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
                text="Lancez Blackout.io sur votre smartphone et entrez"
                handleWord={this.handleWordInstructions1}
              />
              <TextAnimation
                letterDuration={200}
                className={"connexion-step__intro__codes__instructions__2"}
                text=" un des codes pour démarrer."
                handleWord={this.handleWordInstructions2}
              />
              <button className="connexion-step__intro__start" onClick={() => this.startExperience()}>Démarrez l'expérience</button>
              <p className="connexion-step__intro__fullscreen">Appuyez sur la touche <span className="spacebar">espace</span> pour passer en plein écran</p>
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
        <span className="connexion-step__icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.94 56.58"><g id="Calque_2" data-name="Calque 2"><g id="Calque_1-2" data-name="Calque 1"><path d="M31,14.5A14.52,14.52,0,1,1,16.54,0,14.51,14.51,0,0,1,31,14.5Zm-11.26,0a3.25,3.25,0,0,0-3.27-3.13,3.16,3.16,0,0,0-3.18,3.36,3.22,3.22,0,0,0,3.32,3.07A3.32,3.32,0,0,0,19.72,14.5Z"/><path d="M29.29,56.58c1.62-2.76,1-4.25-1.76-5.12-6.24-2-12.51-3.79-18.72-5.83A17.45,17.45,0,0,1,3.56,43a9.09,9.09,0,0,1-.49-14c0,.7-.32,1.81.09,2.48a4.51,4.51,0,0,0,2.41,1.66c6.16,2,12.38,3.8,18.54,5.79A18.38,18.38,0,0,1,29,41.16C34.07,44.76,34.34,52.21,29.29,56.58Z"/></g></g></svg>
        </span>
        <div className="connexion-step__credits">
          <p>Composé en Scope, par Jonas Pelzer.</p>
          <p>Robin Blanc--Beyne | Manon Carrour | Alexandre Massé | Allan Michel | Jean Ndoulou.</p>
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
