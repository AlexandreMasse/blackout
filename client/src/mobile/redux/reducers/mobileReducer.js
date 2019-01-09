import mobileActionTypes from '../actions/mobileActionTypes'
import {websocketsOnActionTypes} from "../actions/websockets/websocketsActionTypes";

const initialState = {
    roomId: null,
    userId: null,
    isConnected: false,
    currentStep: null,
    phoneData: null,
    isLoaded: false
}

export default (state = initialState, action) => {
    switch (action.type) {

        // mobile action

        case mobileActionTypes.SET_APP_LOADED: {
             return {
                ...state,
                isLoaded: true
            }
        }

        case mobileActionTypes.SET_CURRENT_STEP: {
            return {
                ...state,
                currentStep: action.currentStep
            }
        }

        case mobileActionTypes.SET_PHONE_DATA: {
            return {
                ...state,
                phoneData: action.phoneData
            }
        }

        // websocket actions

        case websocketsOnActionTypes.WEBSOCKET_ON_CONNECT_TO_ROOM:
            const {roomId, userId} = action.payload
            return {
                ...state,
                roomId,
                userId,
                isConnected: true
            }
        default:
            return state
    }
}