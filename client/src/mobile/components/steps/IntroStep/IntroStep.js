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
    this.setState({password: this.state.password + key});
  }
  handleKeyBoardPressDelete = (key) => {
    this.setState({password: ''});
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

    return (
      <div className="intro">
        <button style={{color:"red"}} onClick={() => this.props.setCurrentStep(steps.CURSOR.name)}>Step suivant</button>
        {isConnected ? (
          <>
            <p>Hello <span>{userId}</span></p>
            <p>Welcome in <span>{roomId}</span></p>
          </>
        ) : (
          <>
          <div className='intro__infos'>
            <span className='intro__infos__logoContainer'>
              <svg className="intro__infos__logo" viewBox="0 0 227 32">
                <use xlinkHref="#icon-logo" />
              </svg>
            </span>
            <p className='intro__infos__paragraph'>
              <span className="bold">Blackout</span> est un jeu collaboratif qui fait participer deux joueurs
            </p>
            <p className='intro__infos__paragraph'>
              Pour lancer une partie, <br/> rendez-vous sur <span className="bold">blackout.io</span>  à partir d’un ordinateur.
            </p>
            <span className="intro__infos__viewmore">Entrez le code</span>
            <span className="intro__infos__viewmoreIcon">
              <svg className="intro__infos__arrow" viewBox="0 0 21 32">
                <use xlinkHref="#icon-arrow" />
              </svg>
            </span>
          </div>
          <form className='intro__infos__form'>
            <input disabled={true} type="number" value={this.state.password}/>
            <Keyboard handleKeyPress={this.handleKeyBoardPress} handleDelete={this.handleKeyBoardPressDelete}
                      handleSubmit={this.submit}/>
            {/*<input type="submit" value={"Submit"}/>*/}
            
          </form>
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
