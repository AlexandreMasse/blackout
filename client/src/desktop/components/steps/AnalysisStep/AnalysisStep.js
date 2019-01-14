import React, {Component} from 'react'
import {connect} from 'react-redux'
import {TextAnalysis} from './components'
import {AssetsManager} from "../../../../managers"

import {TimelineMax} from 'gsap'

// style
import './AnalysisStep.scss'

class AnalysisStep extends Component {
  componentDidMount() {
    this.playVideo()
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
    this.tl = new TimelineMax()
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

    return (
      <div className="analysis-step step">
            <video className="analysis-step__video" src={video.src}></video>
            <TextAnalysis  
              handleBlockAppear={this.handleBlockAppear}
              position="left"
              userId="Player1"
              os="iOS 11"
              year="2018"
              resolution="1980x900"
              state="Ile-de-France"
              country="FR"
              scoreUser1="12.345443"
              scoreUser2="9.32454"
            />

            <TextAnalysis  
              position="right"
              userId="Player2"
              os="iOS11"
              year="2018"
              resolution="1980x900"
              state="Ile-de-France"
              country="FR"
              scoreUser2="12.345443"
              scoreUser1="9.32454"
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
