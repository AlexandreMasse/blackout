import React, {Component} from 'react'
import {connect} from 'react-redux'
import {AssetsManager} from "../../../../managers"
import steps from '..'
import stepsMobile from '../../../../mobile/components/steps'
import {SentenceAppear} from './components'
import {TimelineMax, TweenMax} from 'gsap'
import {TextAnimation} from '../../components'

import {requestTimeout} from '../../../../utils'
//transition
import {onEnterDelay} from './transition'
// style
import './ConclusionStep.scss'


class ConclusionStep extends Component {  
  
  componentDidMount() {
    this.setTimeLineConclusion()
    this.sentenceAppear = new SentenceAppear()
    this.substeps = document.querySelectorAll('.conclusion-step__substep')
  }

  wordSplit = () => {
    
  }
  
  setTimeLineConclusion = () => {
    this.timeLineStep6()
    this.timeLineStep5()
    this.timeLineStep4()
    this.timeLineStep3()
    this.timeLineStep2()
    this.timeLineStep1()
  }

  timeLineStep1 = () => {
    const parent = document.querySelector('.conclusion-step__substep--1')
    const $wordSplit = parent.querySelectorAll('.wordSplit')
    const $textOver = parent.querySelector('.text-over')
    this.tl = new TimelineMax({
      // delay: onEnterDelay
      delay: 2
    })
    this.tl.add(() => {this.sentenceAppear.start($wordSplit[0])}, 0)
    this.tl.add(() => {this.sentenceAppear.start($wordSplit[1])}, 0)
    this.tl.add(() => {this.textAnim(parent, $textOver)}, 0)
  }
  textAnim = (parent, textOver) => {
    const Timeline = new TimelineMax({repeat: 35, onComplete: () => {
      parent.classList.remove('is-active')
      this.substeps[1].classList.add('is-active')
      this.tlStep2.play()
      console.log("complete")
      }})
    Timeline
      .addCallback(() => {
        textOver.classList.add("hide")
      },`+=${0.055}`)
      .addCallback(() => {
        textOver.classList.remove("hide")
      }, `+=${0.055}`)
  }

  timeLineStep2 = () => {
    const parent = document.querySelector('.conclusion-step__substep--2')
    const $wordSplit = parent.querySelectorAll('.wordSplit')
    this.tlStep2 = new TimelineMax({
      paused:true,
    })
    this.tlStep2.add(() => {this.sentenceAppear.start($wordSplit[0])}, 0)
    this.tlStep2.add(() => {this.playerAnimation.start()}, .5)
    this.tlStep2.add(() => {this.sentenceAppear.start($wordSplit[1], 80)}, 1)
    this.tlStep2.add(() => {
      parent.classList.remove('is-active')
      this.substeps[2].classList.add('is-active')
      this.tlStep3.play()
    }, 3)
  }


  timeLineStep3 = () => {
    const parent = document.querySelector('.conclusion-step__substep--3')
    const $wordSplit = parent.querySelectorAll('.wordSplit')
    const $largeWord = parent.querySelector('.largeWord')
    this.tlStep3 = new TimelineMax({
      delay:.4,
      paused:true,
    })
   this.tlStep3.add(() => {this.sentenceAppear.start($wordSplit[0], 130)}, 0)
   this.tlStep3.add(() => {$largeWord.classList.add('show')}, .8)
   this.tlStep3.add(() => {this.sentenceAppear.start($wordSplit[1], 130)}, 1)
   this.tlStep3.add(() => {
    parent.classList.remove('is-active')
    this.substeps[3].classList.add('is-active')
    this.tlStep4.play()
    }, 3)
  }

  timeLineStep4 = () => {
    const parent = document.querySelector('.conclusion-step__substep--4')
    const $wordSplit = parent.querySelectorAll('.wordSplit')
    const $largeWord = parent.querySelector('.largeWord')
    this.tlStep4 = new TimelineMax({
      delay:.4,
      paused:true,
    })

    this.tlStep4.add(() => {this.sentenceAppear.start($wordSplit[0], 180)}, 0)
    this.tlStep4.add(() => {this.sentenceAppear.start($wordSplit[1], 180)}, 1.2)
    this.tlStep4.add(() => {this.sentenceAppear.start($wordSplit[2], 180)}, 2.8)
    this.tlStep4.add(() => {$largeWord.classList.add('show')}, 5)

    this.tlStep4.add(() => {
    parent.classList.remove('is-active')
    this.substeps[4].classList.add('is-active')
    this.tlStep5.play()
    }, 7.3)
  }

  timeLineStep5 = () => {
    const parent = document.querySelector('.conclusion-step__substep--5')
    const blockLeft = parent.querySelector('.conclusion-step__substep__wrapper--left')
    const $wordSplit = blockLeft.querySelectorAll('.wordSplit')
    const $largeWord = blockLeft.querySelectorAll('.largeWord')
    const $scoreBlock = blockLeft.querySelector('.conclusion-step__substep__score')

    const blockRight = parent.querySelector('.conclusion-step__substep__wrapper--right')
    const $wordSplitR = blockRight.querySelectorAll('.wordSplit')
    const $largeWordR = blockRight.querySelectorAll('.largeWord')
    const $scoreBlockR = blockRight.querySelector('.conclusion-step__substep__score')


    this.tlStep5 = new TimelineMax({
      delay:.5,
      paused:true,
    })
    
    this.tlStep5.add(() => {$largeWord[0].classList.add('show')}, 0)
    this.tlStep5.add(() => {this.sentenceAppear.start($wordSplit[0], 200)}, .6)
    this.tlStep5.add(() => {this.osAnimation.start()}, .8)
    this.tlStep5.add(() => {this.sentenceAppear.start($wordSplit[1], 200)}, 1)

    this.tlStep5.add(() => {this.sentenceAppear.start($wordSplit[2], 200)}, 1.2)
    this.tlStep5.add(() => {this.resAnimation.start()}, 1.4)
    this.tlStep5.add(() => {this.sentenceAppear.start($wordSplit[3], 200)}, 1.6)

    this.tlStep5.add(() => {this.sentenceAppear.start($wordSplit[4], 200)}, 1.8)
    this.tlStep5.add(() => {this.operatorAnimation.start()}, 2)
    this.tlStep5.add(() => {this.sentenceAppear.start($wordSplit[5], 200)}, 2.2)
    
    this.tlStep5.add(() => {$largeWord[1].classList.add('show')}, 2.4)
    this.tlStep5.add(() => {$scoreBlock.classList.add('show')}, 2.6)
    this.tlStep5.add(() => {this.scoreAnimation.start()}, 3)


    // Right
    this.tlStep5.add(() => {$largeWordR[0].classList.add('show')}, 0)
    this.tlStep5.add(() => {this.sentenceAppear.start($wordSplitR[0], 120)}, .6)
    this.tlStep5.add(() => {this.osAnimation2.start()}, .8)
    this.tlStep5.add(() => {this.sentenceAppear.start($wordSplitR[1], 120)}, 1)

    this.tlStep5.add(() => {this.sentenceAppear.start($wordSplitR[2], 120)}, 1.2)
    this.tlStep5.add(() => {this.resAnimation2.start()}, 1.4)
    this.tlStep5.add(() => {this.sentenceAppear.start($wordSplitR[3], 120)}, 1.6)

    this.tlStep5.add(() => {this.sentenceAppear.start($wordSplitR[4], 120)}, 1.8)
    this.tlStep5.add(() => {this.operatorAnimation2.start()}, 2)
    this.tlStep5.add(() => {this.sentenceAppear.start($wordSplitR[5], 120)}, 2.2)
    
    this.tlStep5.add(() => {$largeWordR[1].classList.add('show')}, 2.4)
    this.tlStep5.add(() => {$scoreBlockR.classList.add('show')}, 2.6)
    this.tlStep5.add(() => {this.scoreAnimation2.start()}, 3)

    this.tlStep5.add(() => {
    this.substeps[5].classList.add('is-active')
    TweenMax.to(parent, .5, {opacity:0, onComplete:() => {
      parent.classList.remove('is-active')
      this.tlStep6.play()
    }})
    }, 8.5)
  }

  timeLineStep6 = () => {
    const parent = document.querySelector('.conclusion-step__substep--6')
    const texts = parent.querySelectorAll('.conclusion-step__substep__text')
    const icon = parent.querySelector('.conclusion-step__substep__icon')
    this.tlStep6 = new TimelineMax({
      paused:true,
    })
    
    this.tlStep6.add(() => {texts[0].classList.add('show')}, 0)
    this.tlStep6.add(() => {texts[1].classList.add('show')}, 0)
    this.tlStep6.add(() => {texts[2].classList.add('show')}, 0)
    this.tlStep6.add(() => {icon.classList.add('show')}, 4)
  }


  render() {
    const {player1PhoneData, player2PhoneData, player1Status} = this.props
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
        <div className="conclusion-step__substep conclusion-step__substep--1 is-active">
            <p className="conclusion-step__substep__text conclusion-step__substep__text--title conclusion-step__substep__text--white wordSplit">Vous avez échoué.</p>
            <p className="conclusion-step__substep__text conclusion-step__substep__text--title conclusion-step__substep__text--white text-over wordSplit">Vous avez échoué.</p>
        </div>
        <div className="conclusion-step__substep conclusion-step__substep--2">
          <div className="conclusion-step__substep__wrapper">
            <p className="conclusion-step__substep__text wordSplit">Seul</p>
            <TextAnimation className='conclusion-step__substep__text conclusion-step__substep__text--white' letterDuration={300} letterMinSpeed={10} letterMaxSpeed={60} text={player1Status === 'superior' ? 'JOUEUR-1' : 'JOUEUR-2'} handleWord={word => this.playerAnimation = word}/>
            <p className="conclusion-step__substep__text wordSplit">a pu se mettre à l’abri.</p>
          </div>
        </div>
        <div className="conclusion-step__substep conclusion-step__substep--3">
        <div className="conclusion-step__substep__wrapper">
        <p className="conclusion-step__substep__text wordSplit">Votre destin était</p>
            <p className="conclusion-step__substep__text largeWord">
              <span>p</span>
              <span>o</span>
              <span>u</span>
              <span>r</span>
              <span>t</span>
              <span>a</span>
              <span>n</span>
              <span>t</span>
            </p>
            <p className="conclusion-step__substep__text wordSplit">entre vos mains.</p>
        </div>
        </div>
        <div className="conclusion-step__substep conclusion-step__substep--4">
          <div className="conclusion-step__substep__wrapper">
          <p className="conclusion-step__substep__text wordSplit">Dans <span className="bold">Black|out,</span> le modèle de votre</p>
            <p className="conclusion-step__substep__text wordSplit">smartphone vous attribue un rôle et</p>
            <p className="conclusion-step__substep__text wordSplit">définit dès le départ vos chances  de</p>
            <p className="conclusion-step__substep__text largeWord">
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
            <p className="conclusion-step__substep__text title largeWord">
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
              <div className="conclusion-step__substep__wrapperDescription conclusion-step__substep__wrapperDescription--1">
                <p className="conclusion-step__substep__text wordSplit first">Votre smartphone</p>
                <TextAnimation className='conclusion-step__substep__text conclusion-step__substep__text--white' letterDuration={400} letterMinSpeed={10} letterMaxSpeed={40} text={osUser1} handleWord={word => this.osAnimation = word}/>
                <p className="conclusion-step__substep__text wordSplit">de</p>
              </div>
              <div className="conclusion-step__substep__wrapperDescription conclusion-step__substep__wrapperDescription--2">
                <p className="conclusion-step__substep__text wordSplit first">résolution</p>
                <TextAnimation className='conclusion-step__substep__text conclusion-step__substep__text--white' letterDuration={360} letterMinSpeed={10} letterMaxSpeed={40} text={resolutionUSer1} handleWord={word => this.resAnimation = word}/>
                <p className="conclusion-step__substep__text wordSplit last"> ,connecté au</p>
              </div>
              <div className="conclusion-step__substep__wrapperDescription conclusion-step__substep__wrapperDescription--3">
                <p className="conclusion-step__substep__text first wordSplit">réseau</p>
                <TextAnimation className='conclusion-step__substep__text conclusion-step__substep__text--white' letterDuration={340} letterMinSpeed={10} letterMaxSpeed={40} text={'SFR'} handleWord={word => this.operatorAnimation = word}/>
                <p className="conclusion-step__substep__text last wordSplit">vous a attribué le</p>
              </div>            
              <p className="conclusion-step__substep__text largeWord">
                <span>s</span>
                <span>c</span>
                <span>o</span>
                <span>r</span>
                <span>e</span>
              </p>
            </div>
            <div className="conclusion-step__substep__score">
              <TextAnimation className='conclusion-step__substep__text conclusion-step__substep__text--white' letterDuration={240} letterMinSpeed={10} letterMaxSpeed={40} text={score1.toFixed(1)} handleWord={word => this.scoreAnimation = word}/>
            </div>
          </div>
          
          <div className="conclusion-step__substep__wrapper conclusion-step__substep__wrapper--right">
            <p className="conclusion-step__substep__text title largeWord">
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
              <div className="conclusion-step__substep__wrapperDescription conclusion-step__substep__wrapperDescription--1">
                <p className="conclusion-step__substep__text wordSplit first">Votre smartphone</p>
                <TextAnimation className='conclusion-step__substep__text conclusion-step__substep__text--white' letterDuration={400} letterMinSpeed={10} letterMaxSpeed={40} text={osUser2} handleWord={word => this.osAnimation2 = word}/>
                <p className="conclusion-step__substep__text wordSplit">de</p>
              </div>
              <div className="conclusion-step__substep__wrapperDescription conclusion-step__substep__wrapperDescription--2">
                <p className="conclusion-step__substep__text wordSplit first">résolution</p>
                <TextAnimation className='conclusion-step__substep__text conclusion-step__substep__text--white' letterDuration={360} letterMinSpeed={10} letterMaxSpeed={40} text={resolutionUSer2} handleWord={word => this.resAnimation2 = word}/>
                <p className="conclusion-step__substep__text wordSplit last"> ,connecté au</p>
              </div>
              <div className="conclusion-step__substep__wrapperDescription conclusion-step__substep__wrapperDescription--3">
                <p className="conclusion-step__substep__text first wordSplit">réseau</p>
                <TextAnimation className='conclusion-step__substep__text conclusion-step__substep__text--white' letterDuration={340} letterMinSpeed={10} letterMaxSpeed={40} text={'SFR'} handleWord={word => this.operatorAnimation2 = word}/>
                <p className="conclusion-step__substep__text last wordSplit">vous a attribué le</p>
              </div>            
              <p className="conclusion-step__substep__text largeWord">
                <span>s</span>
                <span>c</span>
                <span>o</span>
                <span>r</span>
                <span>e</span>
              </p>
            </div>
            <div className="conclusion-step__substep__score">
              <TextAnimation className='conclusion-step__substep__text conclusion-step__substep__text--white' letterDuration={240} letterMinSpeed={10} letterMaxSpeed={40} text={score2.toFixed(1)} handleWord={word => this.scoreAnimation2 = word}/>
            </div>
          </div>
        </div>
        
        <div className="conclusion-step__substep conclusion-step__substep--6">
          <p className="conclusion-step__substep__text">Dans un jeu, les règles devraient être les mêmes pour tous.</p>
          <p className="conclusion-step__substep__text conclusion-step__substep__text--red">Sur Internet, c’est le principe de neutralité du net.</p>
          <p className="conclusion-step__substep__text conclusion-step__substep__text--red">Pourtant, il pourrait disparaître.</p>
          <span className="conclusion-step__substep__icon">
            <svg viewBox="0 0 16 32">
            <use xlinkHref="#icon-mobile-2"/>
            </svg>
          </span>
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    player1Status: state.desktop.users.find(user => user.id === "player1").status,
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
