import React, {Component} from 'react'
// redux
import {connect} from 'react-redux'
//css
import './HandleStep.scss'
//lib
import classNames from "classnames"
//Component
import {Handle} from '../../components'

class HandleStep extends Component {


  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {

    return (
      <div className={classNames("handle-step")} ref={ref => this.ref = ref}>
        <Handle/>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandleStep)