import React, { Component } from 'react';
import { connect } from 'react-redux';
import { desktopAction } from '../../redux/actions/desktop/desktopAction'
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
    text: state.desktop.text,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    testAction: (text) => dispatch(desktopAction({text}))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AppDesktop);
