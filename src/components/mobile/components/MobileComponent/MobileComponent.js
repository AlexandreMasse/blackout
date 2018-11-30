import React, { Component } from 'react';
import { connect } from 'react-redux';

//css
import './MobileComponent.scss'

class MobileComponent extends Component {
  render() {
    return (
      <div className="mobile-component">
          <p>Mobile component</p>
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

export default connect(mapStateToProps,mapDispatchToProps)(MobileComponent);
