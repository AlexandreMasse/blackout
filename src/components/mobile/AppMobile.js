import React, { Component } from 'react';
import { connect } from 'react-redux';
import {MobileComponent} from './components/index'

//css
import './AppMobile.scss';

class AppMobile extends Component {

  render() {
    return (
      <div className="app-mobile">
        <p>App mobile</p>
        <MobileComponent/>
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

export default connect(mapStateToProps,mapDispatchToProps)(AppMobile);
