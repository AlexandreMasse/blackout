import React,{ Component} from 'react'
import PropTypes from "prop-types"
//Step
import steps from '../../steps'
import {CSSTransition} from "react-transition-group";

class StepManager extends Component {

  renderSteps = () => {
    let stepsNodes = []

    for(let step in steps) {
      const stepObject = steps[step];

      stepsNodes.push(
        <CSSTransition
          key={stepObject.name}
          timeout={stepObject.timeout}
          classNames={stepObject.classNames}
          in={stepObject.name === this.props.currentStep}
          appear={true}
          mountOnEnter={true}
          unmountOnExit={true}
          onEnter={stepObject.onEnter}
          onExit={stepObject.onExit}
        >
          {stepObject.component}
        </CSSTransition>
      )
    }

    // const stepObject = steps[this.props.currentStep];

    return stepsNodes

  }


  render() {
    const {currentStep} = this.props;
    return (
      <>{currentStep && this.renderSteps()}</>
    )
  }
}

StepManager.propTypes = {
  currentStep: PropTypes.string,
}
StepManager.defaultProps = {
  currentStep: null,
}

export default StepManager

