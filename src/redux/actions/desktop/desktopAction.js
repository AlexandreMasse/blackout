import desktopActionTypes from './desktopActionTypes'

export const desktopAction = (payload) => dispatch => {
 dispatch({
  type: desktopActionTypes.DESKTOP_ACTION,
  payload
 })
}