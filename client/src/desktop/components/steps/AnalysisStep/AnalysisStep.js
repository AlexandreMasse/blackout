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
            <TextAnalysis />
          <p className={"analysis-step__text"}>ANALYSE...</p>
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
