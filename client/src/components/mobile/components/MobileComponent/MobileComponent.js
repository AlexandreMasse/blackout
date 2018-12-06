import React, { Component } from 'react';
import { connect } from 'react-redux';
import withDeviceOrientation from '../withDeviceOrientation/withDeviceOrientation'

//css
import './MobileComponent.scss'

class MobileComponent extends Component {
  render() {
    const x = this.props.deviceOrientationPosition[0] * (window.innerWidth * .5);
    const y = this.props.deviceOrientationPosition[1] * (window.innerHeight * .5);

    return (
      <div className="mobile-component">
          <div className="cursor" style={{
            transform: `translate3d(${x}px,${y}px,0)`
          }}/>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps,mapDispatchToProps)(withDeviceOrientation(MobileComponent));
