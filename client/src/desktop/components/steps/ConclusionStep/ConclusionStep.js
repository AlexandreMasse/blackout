import React, {Component} from 'react'
import {connect} from 'react-redux'
import {AssetsManager} from "../../../../managers"
import steps from '..'
import stepsMobile from '../../../../mobile/components/steps'

import {TimelineMax} from 'gsap'

import {requestTimeout} from '../../../../utils'
//transition
import {onEnterDelay} from './transition'
// style
import './ConclusionStep.scss'

class ConclusionStep extends Component {  
  
  handleBlockAppear = (blockAppear) => {this.blockAppear = blockAppear}

  render() {
    const {player1PhoneData, player2PhoneData} = this.props
    const osUser1 = `${player1PhoneData.os} ${player1PhoneData.osVersionNumber}`
    const osUser2 = `${player2PhoneData.os} ${player2PhoneData.osVersionNumber}`
    const resolutionUSer1 = `${player1PhoneData.width}x${player1PhoneData.height}`
    const resolutionUSer2 = `${player2PhoneData.width}x${player2PhoneData.height}`
    const score1 = player1PhoneData.score
    const score2 = player2PhoneData.score
    const osReleaseDate1 = player1PhoneData.osReleaseDate
    const dateUser1 =  osReleaseDate1.split('/', 3)
    const osReleaseDate2 = player2PhoneData.osReleaseDate
    const dateUser2 = osReleaseDate2.split('/', 3)
    return (
      <div className="conclusion-step step">
        <div className="conclusion-step__substep conclusion-step__substep--1">
            <p className="conclusion-step__substep__text conclusion-step__substep__text--title conclusion-step__substep__text--white">Vous avez échoué.</p>
            <p className="conclusion-step__substep__text conclusion-step__substep__text--title conclusion-step__substep__text--white">Vous avez échoué.</p>
        </div>
        <div className="conclusion-step__substep conclusion-step__substep--2">
          <div className="conclusion-step__substep__wrapper">
            <p className="conclusion-step__substep__text">Seul</p>
            <p className="conclusion-step__substep__text conclusion-step__substep__text--white">
              <span>J</span>
              <span>O</span>
              <span>U</span>
              <span>E</span>
              <span>U</span>
              <span>R</span>
              <span>-</span>
              <span>1</span>
            </p>
            <p className="conclusion-step__substep__text">a pu se mettre à l’abri.</p>
          </div>
          
        </div>
        <div className="conclusion-step__substep conclusion-step__substep--3">
        <div className="conclusion-step__substep__wrapper">
        <p className="conclusion-step__substep__text">Votre destin était</p>
            <p className="conclusion-step__substep__text">
              <span>p</span>
              <span>o</span>
              <span>u</span>
              <span>r</span>
              <span>t</span>
              <span>a</span>
              <span>n</span>
              <span>t</span>
            </p>
            <p className="conclusion-step__substep__text">entre vos mains.</p>
        </div>
        </div>
        <div className="conclusion-step__substep conclusion-step__substep--4">
          <div className="conclusion-step__substep__wrapper">
          <p className="conclusion-step__substep__text">Dans <span className="bold">Black|out,</span> le modèle de votre</p>
            <p className="conclusion-step__substep__text">smartphone vous attribue un rôle et</p>
            <p className="conclusion-step__substep__text">définit dès le départ vos chances  de</p>
            <p className="conclusion-step__substep__text">
              <span>s</span>
              <span>u</span>
              <span>r</span>
              <span>v</span>
              <span>i</span>
              <span>e</span>
              <span>.</span>
            </p>
          </div>
        </div>
        <div className="conclusion-step__substep conclusion-step__substep--5">
          <div className="conclusion-step__substep conclusion-step__substep--left">
            <p className="conclusion-step__substep__title">
              <span>J</span>
              <span>o</span>
              <span>u</span>
              <span>e</span>
              <span>u</span>
              <span>r</span>
              <span>-</span>
              <span>1</span>
            </p>
            <div className="conclusion-step__substep__description">
              <p>Votre smartphone iOs11, de</p>
              <p>résolution 1920x1080, connecté au</p>
              <p>réseau Free vous a attribué le</p>
              <p>
                <span>s</span>
                <span>c</span>
                <span>o</span>
                <span>r</span>
                <span>e</span>
              </p>
            </div>
            <div className="conclusion-step__substep__score">
              <span>11.4</span>
            </div>
          </div>
          
          <div className="conclusion-step__substep conclusion-step__substep--right">
            <p className="conclusion-step__substep__title">
              <span>J</span>
              <span>o</span>
              <span>u</span>
              <span>e</span>
              <span>u</span>
              <span>r</span>
              <span>-</span>
              <span>2</span>
            </p>
            <div className="conclusion-step__substep__description">
              <p>Votre smartphone iOs11, de</p>
              <p>résolution 1920x1080, connecté au</p>
              <p>réseau Free vous a attribué le</p>
              <p>
                <span>s</span>
                <span>c</span>
                <span>o</span>
                <span>r</span>
                <span>e</span>
              </p>
            </div>
            <div className="conclusion-step__substep__score">
              <span>11.4</span>
            </div>
          </div>
        </div>
        <div className="conclusion-step__substep conclusion-step__substep--6">
          <p className="conclusion-step__substep__text">Dans un jeu, les règles devraient être les mêmes pour tous.</p>
          <p className="conclusion-step__substep__text conclusion-step__substep__text--red">Sur Internet, c’est le principe de neutralité du net.</p>
          <p className="conclusion-step__substep__text conclusion-step__substep__text--red">Pourtant, il pourrait disparaître.</p>
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    player1PhoneData: state.desktop.users.find(user => user.id === "player1").phoneData,
    player2PhoneData: state.desktop.users.find(user => user.id === "player2").phoneData,
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     setCurrentStep: (currentStep) => dispatch(setCurrentStep(currentStep)),
//     wsEmitCurrentStep: (currentStep) => dispatch(wsEmitCurrentStep({currentStep}))
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ConclusionStep)
export default connect(mapStateToProps)(ConclusionStep)
