import mobileActionTypes from '../actions/mobileActionTypes'
import {websocketsOnActionTypes} from "../actions/websockets/websocketsActionTypes";

const initialState = {
    roomId: null,
    userId: null,
    isConnected: false,
    password: null,
    currentStep: null,
    phoneData: null,
    isLoaded: false,
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

        case mobileActionTypes.SET_PASSWORD: {
            const {password} = action.payload
            return {
                ...state,
                password
            }
        }

        case mobileActionTypes.SET_PHONE_DATA: {
            return {
                ...state,
                phoneData: action.phoneData
            }
        }

        // websocket actions

        case websocketsOnActionTypes.WEBSOCKET_ON_CONNECT_TO_ROOM: {
            const {roomId, userId, password} = action.payload
            const isCurrentUser = state.password === password
            return {
                ...state,
                roomId: isCurrentUser ? roomId : state.roomId,
                userId: isCurrentUser ? userId : state.userId,
                isConnected: isCurrentUser ? true : state.isConnected,
            }
        }

        default: {
            return state
        }
    }
}