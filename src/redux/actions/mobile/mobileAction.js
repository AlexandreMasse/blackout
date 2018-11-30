import mobileActionTypes from './mobileActionTypes'

export const mobileAction = (payload) => dispatch => {
 dispatch({
  type: mobileActionTypes.MOBILE_ACTION,
  payload
 })
}