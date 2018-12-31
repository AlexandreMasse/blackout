import mobileActionTypes from '../../actions/mobile/mobileActionTypes'
import {websocketsOnActionTypes} from "../../actions/websockets/mobile/websocketsActionTypes";

const initialState = {
    roomId: null,
    userId: null,
    isConnected: false,
    currentStep: null,
    phoneData: null,
}

export default (state = initialState, action) => {
    switch (action.type) {

        // mobile action

        case mobileActionTypes.SET_CURRENT_STEP:
            return {
                ...state,
                currentStep: action.currentStep
            }

        case mobileActionTypes.SET_PHONE_DATA:
            return {
                ...state,
                phoneData: action.phoneData
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