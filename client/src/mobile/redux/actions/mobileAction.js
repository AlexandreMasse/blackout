import mobileActionTypes from './mobileActionTypes'


export const setAppLoaded = (payload) => (dispatch, getState, {emit}) => {
 dispatch({
  type: mobileActionTypes.SET_APP_LOADED,
  payload
 })
}

export const setCurrentStep = (currentStep) => (dispatch, getState, {emit}) => {
 dispatch({
  type: mobileActionTypes.SET_CURRENT_STEP,
  currentStep
 })
}

export const setPhoneData = (phoneData) => (dispatch, getState, {emit}) => {
 dispatch({
  type: mobileActionTypes.SET_PHONE_DATA,
  phoneData
 })
}