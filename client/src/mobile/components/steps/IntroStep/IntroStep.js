import React, {Component} from 'react';
//redux
import {connect} from 'react-redux';
import {
  wsEmitDeviceType,
  wsEmitPassword,
  wsEmitIntroProgression
} from "../../../redux/actions/websockets/websocketsAction";
import {setCurrentStep, setPassword} from "../../../redux/actions/mobileAction";
//components
import {Keyboard} from "../../components";
//step
import steps from '..'
//lib
import NoSleep from "nosleep.js";
import {TweenMax, Power1} from 'gsap'
//css
import './IntroStep.scss'
//asset
import {AssetsManager} from "./../../../../managers"
import {assetsToLoad} from "../../../assets/asset-list"
// utils 
import {toggleFullscreen} from '../../../../utils'
import logotype from "../../../../assets/global/video/logotype.mp4";

class IntroStep extends Component {

  constructor(props) {
    super(props)

    this.state = {
      password: '',
    }

  }

  setFullscreen = () => {
    toggleFullscreen()
  }

  setNoSleep = () => {
    const noSleep = new NoSleep()
    noSleep.enable()
  }

  submit = (e) => {
    e.preventDefault()
    let password = this.state.password
    if (password !== null && password !== '' && password.length === 4) {
      this.setFullscreen()
      this.setNoSleep()
      this.props.setPassword(password)
      this.props.wsEmitPassword(password)
    } else {
      console.log('le password est invalide')
    }
  }

  handleKeyBoardPress = (key) => {
    if (this.state.password.length < 4) {
      this.setState({
        password: this.state.password + key
      });
    }
  }

  handleKeyBoardPressDelete = (key) => {
    this.setState({
      password: this.state.password.substring(0, this.state.password.length - 1)
    });
  }

  getTouches = (evt) => {
    return evt.touches
  }

  handleTouchStart = (evt) => {
    const firstTouch = this.getTouches(evt)[0];
    this.xDown = firstTouch.clientX;
    this.yDown = firstTouch.clientY;
  };

  handleTouchMove = (evt) => {
    if (!this.xDown || !this.yDown) {
      return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = this.xDown - xUp;
    let yDiff = this.yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
      if (xDiff > 0) {
        /* left swipe */
      } else {
        /* right swipe */
      }
    } else {
      if (yDiff > 0) {
        /* up swipe */
        const formHeight = this.ref.querySelector(".intro-step__form").clientHeight
        TweenMax.to(this.ref, 0.8, {ease: Power1.easeInOut,y: `-${formHeight * 0.9}px`})
      } else {
        /* down swipe */
        window.scrollTo(0, 0) // for safari top bar
        TweenMax.to(this.ref, 0.8, {ease: Power1.easeInOut, y: this.ref._gsTransform.y - this.ref._gsTransform.y})
      }
    }
    /* reset values */
    this.xDown = null;
    this.yDown = null;
  };


  componentDidMount() {
    this.ref.addEventListener('touchstart', this.handleTouchStart, false);
    this.ref.addEventListener('touchmove', this.handleTouchMove, false);

    this.xDown = null;
    this.yDown = null;
    
    TweenMax.set(this.ref, {y: 0})
  }

  componentWillUnmount() {
    this.ref.removeEventListener('touchstart', this.handleTouchStart, false);
    this.ref.removeEventListener('touchmove', this.handleTouchMove, false);
  }

  //TODO: just for test
  componentWillReceiveProps(nextProps, nextContext) {
    // change step after connexion
    if (nextProps.isConnected && this.props.isConnected !== nextProps.isConnected) {
      this.props.setCurrentStep(steps.LUNCH.name)
    }
  }

  render() {
    const {isConnected} = this.props
    const {password} = this.state

    return (
      <div className="intro-step" ref={(ref) => this.ref = ref}>
        <button onClick={() => this.props.setCurrentStep(steps.LUNCH.name)}>
          Step suivant
        </button>
        <div className='intro-step__infos'>
          <video width="80%" autoPlay playsInline loop muted ref={(ref) => this.video = ref}>
            <source src={logotype} type="video/mp4"/>
          </video>
          <p className='intro-step__infos__paragraph'>
            <span className="bold">Blackout</span> est une expérience de survie collabortive, dans un univers alternatif
            régit par la technologie.
          </p>
          <p className='intro-step__infos__paragraph'>
            Pour lancer une partie, rendez-vous sur <span className="bold">blackout.io</span> à partir d’un ordinateur.
          </p>
          <span className="intro-step__infos__viewmore">Entrez le code</span>
          <div className="intro-step__infos__viewmoreIcon">
            <img src={AssetsManager.get(assetsToLoad.arrowDonw.name).src} alt=""/>
          </div>
        </div>
        <div className='intro-step__form'>
          <div className="intro-step__form__numbers">
            <p className="intro-step__form__numbers__1">{password.substring(0, 1)}</p>
            <p className="intro-step__form__numbers__2">{password.substring(1, 2)}</p>
            <p className="intro-step__form__numbers__3">{password.substring(2, 3)}</p>
            <p className="intro-step__form__numbers__4">{password.substring(3, 4)}</p>
          </div>
          <Keyboard
            handleKeyPress={this.handleKeyBoardPress}
            handleDelete={this.handleKeyBoardPressDelete}
            handleSubmit={this.submit}
          />
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    isConnected: state.mobile.isConnected,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    wsEmitPassword: (code) => dispatch(wsEmitPassword({code})),
    wsEmitDeviceType: (type) => dispatch(wsEmitDeviceType({type})),
    wsEmitIntroProgression: (progression) => dispatch(wsEmitIntroProgression({progression})),
    setCurrentStep: (currentStep) => dispatch(setCurrentStep(currentStep)),
    setPassword: (password) => dispatch(setPassword({password})),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IntroStep);
