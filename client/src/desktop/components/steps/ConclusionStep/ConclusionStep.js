import React, {Component} from 'react'
import {connect} from 'react-redux'
import {AssetsManager} from "../../../../managers"
import steps from '..'
import stepsMobile from '../../../../mobile/components/steps'

import {TimelineMax, TweenMax} from 'gsap'

import {requestTimeout} from '../../../../utils'
//transition
import {onEnterDelay} from './transition'
// style
import './ConclusionStep.scss'


class ConclusionStep extends Component {  
  
  handleBlockAppear = (blockAppear) => {this.blockAppear = blockAppear}

  componentDidMount() {
    this.setTimeLineConclusion()
  }

  wordSplit = () => {
    
  }
  
  setTimeLineConclusion = () => {
    this.timeLineStep1()
  }

  timeLineStep1 = () => {
    const parent = document.querySelector('.conclusion-step__substep--1')
    const $wordSplit = parent.querySelectorAll('.wordSplit')
    let arrSentence = []

    this.init()

    // $wordSplit.forEach((sentence) => {
    //   var parentEl = sentence
    //   // console.log('PARENT EL',parentEl)
    //   const words = sentence.textContent.split(" ")
    //   // console.log('WORDS',words)
    //   let countWord = 0
    //   words.forEach((word) => {
    //     if (countWord === 0) {
    //       sentence.innerHTML = ''
    //     }
    //     createSpan(parentEl,word)
    //     countWord++
    //   })
    //   arrSentence.push({el:sentence, words : sentence.textContent.split(" ")})
    // })

    // function createSpan(parentEl ,word) {
    //   console.log('PARENT EL', parentEl)
    //   let span = document.createElement('span')
    //   span.innerHTML = word
    //   parentEl.appendChild(span)
    // }
  }

  init = () => {
    let duration = 500
    const parent = document.querySelector('.conclusion-step__substep--1')
    const $wordSplit = parent.querySelectorAll('.wordSplit')
    $wordSplit.forEach((sentence) => {
        const sentenceText = sentence.textContent
        sentence.innerHTML = ''
        const words = sentenceText.split(" ")
        const wordNb = words.length
        let wordArr = []
        for (let i = 0; i < wordNb; i++) {
            var span = document.createElement("span")
            span.classList.add('hide')
            span.innerText = words[i]
            sentence.appendChild(span)
            wordArr.push(span)
        }

        let timer = setInterval(() => {
            if (wordArr.length > 0) {
                let i = 0 
                wordArr[i].classList.remove('hide')
                wordArr[i].classList.add('show')
                wordArr.splice(i, 1)
                i++
            } else {
                clearInterval(timer)
            }
        }, duration)
    })
  }

  timeLineStep2 = () => {

  }

  render() {
    const {player1PhoneData, player2PhoneData} = this.props
    console.log(player1PhoneData)
    const osUser1 = `${player1PhoneData.os} ${player1PhoneData.osVersionNumber}`
    const osUser2 = `${player2PhoneData.os} ${player2PhoneData.osVersionNumber}`
    const resolutionUSer1 = `${player1PhoneData.width}x${player1PhoneData.height}`
    const resolutionUSer2 = `${player2PhoneData.width}x${player2PhoneData.height}`
    const score1 = player1PhoneData.score
    const score2 = player2PhoneData.score
    const operator1 = player1PhoneData.operator.org
    const operator2 = player2PhoneData.operator.org
    return (
      <div className="conclusion-step step">
        <div className="conclusion-step__substep conclusion-step__substep--1">
            <p className="conclusion-step__substep__text conclusion-step__substep__text--title conclusion-step__substep__text--white wordSplit">Vous avez échoué.</p>
            <p className="conclusion-step__substep__text conclusion-step__substep__text--title conclusion-step__substep__text--white text-over wordSplit">Vous avez échoué.</p>
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
          <div className="conclusion-step__substep__wrapper conclusion-step__substep__wrapper--left">
            <p className="conclusion-step__substep__text title">
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
              <p className="conclusion-step__substep__text">Votre smartphone {osUser1}, de</p>
              <p className="conclusion-step__substep__text">résolution {resolutionUSer1}, connecté au</p>
              <p className="conclusion-step__substep__text">réseau Free vous a attribué le</p>
              <p className="conclusion-step__substep__text">
                <span>s</span>
                <span>c</span>
                <span>o</span>
                <span>r</span>
                <span>e</span>
              </p>
            </div>
            <div className="conclusion-step__substep__score">
              <span className="conclusion-step__substep__text">{score1.toFixed(1)}</span>
            </div>
          </div>
          
          <div className="conclusion-step__substep__wrapper conclusion-step__substep__wrapper--right">
            <p className="conclusion-step__substep__text title">
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
              <p className="conclusion-step__substep__text">Votre smartphone {osUser2}, de</p>
              <p className="conclusion-step__substep__text">résolution {resolutionUSer2}, connecté au</p>
              <p className="conclusion-step__substep__text">réseau Free vous a attribué le</p>
              <p className="conclusion-step__substep__text">
                <span>s</span>
                <span>c</span>
                <span>o</span>
                <span>r</span>
                <span>e</span>
              </p>
            </div>
            <div className="conclusion-step__substep__score">
              <span className="conclusion-step__substep__text">{score2.toFixed(1)}</span>
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
