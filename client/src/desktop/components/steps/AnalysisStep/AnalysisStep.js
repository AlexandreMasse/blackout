import React, {Component} from 'react'
import {connect} from 'react-redux'
import {TextAnalysis} from './components'
import {AssetsManager} from "../../../../managers"

import {TimelineMax} from 'gsap'

//transition
import {onEnterDelay} from './transition'

// style
import './AnalysisStep.scss'

class AnalysisStep extends Component {
  componentDidMount() {
    // this.playVideo()
    this.initTimeline()
  }

  playVideo() {
    this.video = document.querySelector('.analysis-step__video')
    this.video.play()
  }
  stopVideo() {
    this.video.pause()
  }
  
  initTimeline = () => {
    this.tl = new TimelineMax({
      delay: onEnterDelay
    })
    this.tl.add(() => {this.playVideo()}, 0)
    this.tl.add(() => {this.blockAppear.start(0)}, 4)
    this.tl.add(() => {this.blockAppear.activeValue(0)}, 4.4)
    this.tl.add(() => {this.blockAppear.start(1)}, 4.8)
    this.tl.add(() => {this.blockAppear.start(2)}, 5.2)
    this.tl.add(() => {this.blockAppear.activeValue(2)}, 5.6)


    this.tl.add(() => {this.blockAppear.start(3)}, 4)
    this.tl.add(() => {this.blockAppear.activeValue(3)}, 4.4)
    this.tl.add(() => {this.blockAppear.start(4)}, 4.8)
    this.tl.add(() => {this.blockAppear.start(5)}, 5.2)
    this.tl.add(() => {this.blockAppear.activeValue(5)}, 5.6)
    this.tl.add(() => {this.stopVideo()}, 5.6)

    this.tl.add(() => {this.playVideo()}, 6.4)
    this.tl.add(() => {this.blockAppear.removeblockActive()}, 7)
  }
  
  handleBlockAppear = (blockAppear) => {this.blockAppear = blockAppear}

  render() {
    const video = AssetsManager.get('analyse')
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
      <div className="analysis-step step">
            <video className="analysis-step__video" src={video.src}></video>
            <TextAnalysis  
              handleBlockAppear={this.handleBlockAppear}
              position="left"
              userId="Player1"
              os={osUser1}
              year={dateUser1[2]}
              resolution={resolutionUSer1}
              state={player1PhoneData.operator.region}
              country={player1PhoneData.operator.country}
              scoreUser1={score1.toFixed(3)}
              scoreUser2={score2.toFixed(3)}
            />

            <TextAnalysis  
              position="right"
              userId="Player2"
              os={osUser2}
              year={dateUser2}
              resolution={resolutionUSer2}
              state={player2PhoneData.operator.region}
              country={player2PhoneData.operator.country}
              scoreUser1={score1.toFixed(3)}
              scoreUser2={score2.toFixed(3)}
            />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    player1PhoneData: state.desktop.users.find(user => user.id === "player1").phoneData,
    player2PhoneData: state.desktop.users.find(user => user.id === "player2").phoneData
  }
}

export default connect(mapStateToProps)(AnalysisStep)
