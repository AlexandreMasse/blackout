import mobileActionTypes from './mobileActionTypes'

export const setCurrentStep = (currentStep) => (dispatch, getState, {emit}) => {
 dispatch({
  type: mobileActionTypes.SET_CURRENT_STEP,
  currentStep
 })
}