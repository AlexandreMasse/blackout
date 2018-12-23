import {SET_APP_LOADED} from './desktopActionTypes'

export const setAppLoaded = (payload) => (dispatch) => {
 dispatch({
  type: SET_APP_LOADED,
  payload
 })
}