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

  renderSteps = () => {
    return this.stepsArray.map(step => (
      <CSSTransition
          key={step.name}
          in={step.name === this.props.currentStep}
          timeout={(() => {
            const timeout = {}
            Object.keys(step.timeout).map((key) => {
              timeout[key] = step.timeout[key] * 1000;
            });
            return timeout
          })()}
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

