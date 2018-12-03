import React, { Component } from 'react';
import { connect } from 'react-redux';

//css
import './TestComponent.scss'

class TestComponent extends Component {
  render() {
    return (
      <div className="test-component">
          <p>Desktop</p>
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

export default connect(mapStateToProps,mapDispatchToProps)(TestComponent);
