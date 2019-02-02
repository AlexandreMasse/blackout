import React,{ Component} from 'react'
import PropTypes from "prop-types"
//Step
import steps from '../../steps'
import {CSSTransition} from "react-transition-group";

class StepManager extends Component {

  constructor(props) {
    super(props)
    this.stepsArray = Object.keys(steps).map(i => steps[i])
  }

  renderTimeout = (timeout) => {
      const newTimeout = {}
      Object.keys(timeout).map((key) => {
        newTimeout[key] = timeout[key] * 1000;
      });
      return newTimeout
  }

  renderSteps = () => {
    return this.stepsArray.map(step => (
      <CSSTransition
          key={step.name}
          in={step.name === this.props.currentStep}
          timeout={this.renderTimeout(step.timeout)}
          classNames={step.classNames}
          appear={true}
          mountOnEnter={true}
          unmountOnExit={true}
          onEnter={step.onEnter}
          onExit={step.onExit}
        >
          {step.component}
        </CSSTransition>
    ))
  }

  render() {
    const {currentStep} = this.props;
    return currentStep && this.renderSteps()
  }
}

StepManager.propTypes = {
  currentStep: PropTypes.string,
}
StepManager.defaultProps = {
  currentStep: null,
}

export default StepManager

