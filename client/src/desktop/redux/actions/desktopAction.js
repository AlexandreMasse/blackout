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

export const setSplitScreen = (payload) => (dispatch, getState, {emit}) => {
 dispatch({
  type: desktopActionTypes.SET_SPLIT_SCREEN,
  payload
 })
}

export const setUserCurrentScene = (payload) => (dispatch, getState, {emit}) => {
 dispatch({
  type: desktopActionTypes.SET_USER_CURRENT_SCENE,
  payload
 })
}

export const setUserIndicationActive = (payload) => (dispatch, getState, {emit}) => {
 dispatch({
  type: desktopActionTypes.SET_USER_INDICATION_ACTIVE,
  payload
 })
}

export const setUserIndicationOpen = (payload) => (dispatch, getState, {emit}) => {
 dispatch({
  type: desktopActionTypes.SET_USER_INDICATION_OPEN,
  payload
 })
}

export const setUserIndicationTitle = (payload) => (dispatch, getState, {emit}) => {
 dispatch({
  type: desktopActionTypes.SET_USER_INDICATION_TITLE,
  payload
 })
}

export const setUserIndicationDescription = (payload) => (dispatch, getState, {emit}) => {
 dispatch({
  type: desktopActionTypes.SET_USER_INDICATION_DESCRIPTION,
  payload
 })
}

export const setUserIndicationTheme = (payload) => (dispatch, getState, {emit}) => {
 dispatch({
  type: desktopActionTypes.SET_USER_INDICATION_THEME,
  payload
 })
}

export const setStairsProgression = (payload) => (dispatch, getState, {emit}) => {
 dispatch({
  type: desktopActionTypes.SET_USER_STAIRS_PROGRESSION,
  payload
 })
}

export const setPlayer1SplitScreenPercentage = (payload) => (dispatch, getState, {emit}) => {
 dispatch({
  type: desktopActionTypes.SET_PLAYER1_SPLIT_SCREEN_PERCENTAGE,
  payload
 })
}