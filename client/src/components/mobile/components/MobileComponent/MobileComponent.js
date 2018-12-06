import React, {Component} from 'react';
import {connect} from 'react-redux';
import withDeviceOrientation from '../withDeviceOrientation/withDeviceOrientation'
import {wsEmitPosition} from '../../../../redux/actions/websockets/websocketsAction'

//css
import './MobileComponent.scss'

class MobileComponent extends Component {

  handleRef = (el) => {
    this.props.handleRef(el)
  }

  render() {
    const x = this.props.deviceOrientationPosition[0] * (window.innerWidth * .5);
    const y = this.props.deviceOrientationPosition[1] * (window.innerHeight * .5);

    this.props.wsEmitPosition(this.props.deviceOrientationPosition)

    return (
      <div className="mobile-component" ref={this.handleRef}>
        <div className="cursor" style={{
          transform: `translate3d(${x}px,${y}px,0)`
        }}/>
        <div className="power-button"/>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    wsEmitPosition: (position) => dispatch(wsEmitPosition({position}))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withDeviceOrientation(MobileComponent));
