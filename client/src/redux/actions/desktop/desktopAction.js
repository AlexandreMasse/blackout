import desktopActionTypes from './desktopActionTypes'

export const desktopAction = (payload) => (dispatch, getState) => {
 dispatch({
  type: desktopActionTypes.DESKTOP_ACTION,
  payload
 })
}