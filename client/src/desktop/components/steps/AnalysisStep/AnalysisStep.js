import React, {Component} from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'
import {TextAnalysis} from './components'
// style
import './AnalysisStep.scss'

class AnalysisStep extends Component {
  render() {
    return (
      <div className="analysis-step step">
            <TextAnalysis  
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
          {/* <p className={"analysis-step__text"}>ANALYSE...</p> */}
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
