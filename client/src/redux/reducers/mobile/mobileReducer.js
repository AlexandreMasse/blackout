import mobileActionTypes from '../../actions/mobile/mobileActionTypes'
import {websocketsOnActionTypes} from "../../actions/websockets/websocketsActionTypes";

const initialState = {
    roomId: null,
    userId: null,
    isConnected: false
}

export default (state = initialState, action) => {
    switch (action.type) {
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