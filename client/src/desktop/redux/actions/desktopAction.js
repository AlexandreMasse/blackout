import desktopActionTypes from './desktopActionTypes'

export const setAppLoaded = (payload) => (dispatch) => {
 dispatch({
  type: desktopActionTypes.SET_APP_LOADED,
  payload
 })
}


export const setCurrentStep = (currentStep) => (dispatch, getState, {emit}) => {
 dispatch({
  type: desktopActionTypes.SET_CURRENT_STEP,
  currentStep
 })
}

export const setCurrentScene = (currentScene) => (dispatch, getState, {emit}) => {
 dispatch({
  type: desktopActionTypes.SET_CURRENT_SCENE,
  currentScene
 })
}