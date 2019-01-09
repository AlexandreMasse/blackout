import React, {Component} from 'react';
//redux
import {connect} from 'react-redux';
import {wsEmitDeviceType, wsEmitPassword} from "../../../redux/actions/websockets/websocketsAction";
import {setCurrentStep} from "../../../redux/actions/mobileAction";
//components
import {Keyboard} from "../../components";
//step
import steps from '..'
//lib
import NoSleep from "nosleep.js";
//css
import './IntroStep.scss'
//asset
import {AssetsManager} from "./../../../../managers"
import {assetsToLoad} from "../../../assets/asset-list"

class IntroStep extends Component {

  constructor(props) {
    super(props)

    this.state = {
      password: ''
    }
  }

  setFullscreen = () => {
      const elem = document.documentElement
      elem.requestFullscreen()
  }

  setNoSleep = () => {
    const noSleep = new NoSleep()
    noSleep.enable()
  }

  submit = (e) => {
    e.preventDefault()
    let password = this.state.password
    if(password !== null && password !== '') {
      this.props.wsEmitPassword(password)
      //this.setFullscreen()
      this.setNoSleep()
    } else {
      console.log('le password est vide')
    }
  }

  handleKeyBoardPress = (key) => {
    if(this.state.password.length < 4) {
      this.setState({
        password: this.state.password + key
      });
    }
  }
  handleKeyBoardPressDelete = (key) => {
    this.setState({
      password: this.state.password.substring(0,this.state.password.length-1)
    });
  }

  //TODO: just for test
  componentWillReceiveProps(nextProps, nextContext) {
    // change step after connexion
    if(nextProps.isConnected && this.props.isConnected !== nextProps.isConnected) {
      setTimeout(() => {
        this.props.setCurrentStep(steps.CURSOR.name)
      }, 3000)
    }
  }

  render() {
    const { roomId, userId, isConnected} = this.props
    const { password} = this.state

    return (
      <div className="intro-step">
        <button onClick={() => this.props.setCurrentStep(steps.CURSOR.name)}>Step suivant</button>
        {isConnected ? (
          <>
            <p>Hello <span>{userId}</span></p>
            <p>Welcome in <span>{roomId}</span></p>
          </>
        ) : (
          <>
          <div className='intro-step__infos'>
            <span className='intro-step__infos__logoContainer'>
              <svg className="intro-step__infos__logo" viewBox="0 0 227 32">
                <use xlinkHref="#icon-logo" />
              </svg>
            </span>
            <p className='intro-step__infos__paragraph'>
              <span className="bold">Blackout</span> est un jeu collaboratif qui fait participer deux joueurs
            </p>
            <p className='intro-step__infos__paragraph'>
              Pour lancer une partie, <br/> rendez-vous sur <span className="bold">blackout.io</span>  à partir d’un ordinateur.
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
          </>
        )}
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    userId: state.mobile.userId,
    roomId: state.mobile.roomId,
    isConnected: state.mobile.isConnected,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    wsEmitPassword: (code) => dispatch(wsEmitPassword({code})),
    wsEmitDeviceType: (type) => dispatch(wsEmitDeviceType({type})),
    setCurrentStep: (currentStep) => dispatch(setCurrentStep(currentStep)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(IntroStep);