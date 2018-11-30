import React, { Component } from 'react';
import { connect } from 'react-redux';
import { testAction } from '../../store/actions/testAction'
import logo from '../../logo.svg';
import {TestComponent} from "./components/index";

// css
import './AppDesktop.scss';

class AppDesktop extends Component {

  testAction = () => {
    this.props.testAction()
  }

  onInputChange = (e) => {
    this.props.testAction(e.target.value)
  }

  render() {
    return (
      <div className="app-desktop">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <input type="text" onChange={this.onInputChange}/>
          <div className="input-result">
            <p onClick={this.testAction}>{this.props.text}</p>
          </div>
          <TestComponent/>
        </header>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    text: state.test.text,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    testAction: (text) => dispatch(testAction({text}))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AppDesktop);
