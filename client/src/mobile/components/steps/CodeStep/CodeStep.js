import React, {Component} from 'react'
// redux
import {connect} from 'react-redux'
import {wsEmitFingerprint} from "../../../redux/actions/websockets/websocketsAction";
//import {setCurrentStep} from "../../../redux/actions/mobileAction";
//css
import './CodeStep.scss'
//lib
import {Power1, TweenMax} from 'gsap'

import {RollingNumber} from '../../components'
import classNames from "classnames"

class CodeStep extends Component {


  constructor(props) {
    super(props);

    this.state = {
      numbers: [0,0,0]
    }
  }

  handleRef = (el) => {
    this.props.handleRef(el)
  }

  componentDidMount() {
  }

  render() {

    return (
      <div className={classNames("code-step")} ref={ref => this.ref = ref}>

        <RollingNumber numbers={this.state.numbers}/>

      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    //playerStatus: state.mobile.users.find(user => user.id === state.mobile.userId).status,
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeStep)