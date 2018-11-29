export const testAction = (payload) => dispatch => {
 dispatch({
  type: 'TEST_ACTION',
  payload
 })
}