import mobileActionTypes from './mobileActionTypes'

export const mobileAction = (payload) => (dispatch, getState, {emit}) => {
 dispatch({
  type: mobileActionTypes.MOBILE_ACTION,
  payload
 })
}