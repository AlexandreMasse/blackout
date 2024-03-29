import React, {Component} from 'react'
import {connect} from 'react-redux'
import withDeviceOrientation from '../../components/withDeviceOrientation/withDeviceOrientation'
import {wsEmitPosition, wsEmitIsLightOn} from '../../../redux/actions/websockets/websocketsAction'

//css
import './CursorStep.scss'

class CursorStep extends Component {

  handleRef = (el) => {
    if (el) {
      this.props.handleRef(el)
    }
  }

  render() {
    this.props.wsEmitPosition(this.props.deviceOrientationPosition)
    this.props.wsEmitIsLightOn(this.props.isLightOn)

    return (
      <div className="cursor-step" ref={this.handleRef}>
        <div className="power-button">
          <div className="power-button__container">
          <span className="power-button__text">on</span>
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    wsEmitPosition: (position) => dispatch(wsEmitPosition({position})),
    wsEmitIsLightOn: (isLightOn) => dispatch(wsEmitIsLightOn({isLightOn}))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withDeviceOrientation(CursorStep))
