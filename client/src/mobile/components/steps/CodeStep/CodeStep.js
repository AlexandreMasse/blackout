import React, {Component} from 'react'
// redux
import {connect} from 'react-redux'
//css
import './CodeStep.scss'
//lib
import classNames from "classnames"
//component
import {RollingNumber} from '../../components'

class CodeStep extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={classNames("code-step")} ref={ref => this.ref = ref}>
        <RollingNumber />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeStep)