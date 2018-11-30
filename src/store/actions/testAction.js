import actionTypes from './actionTypes'

export const testAction = (payload) => dispatch => {
 dispatch({
  type: actionTypes.TEST_ACTION,
  payload
 })
}