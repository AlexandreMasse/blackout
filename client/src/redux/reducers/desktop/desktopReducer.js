import {DESKTOP_ACTION} from '../../actions/desktop/desktopActionTypes'
import {websocketsOnActionTypes} from '../../actions/websockets/websocketsActionTypes'

const initialState = {
    textDesktop: 'test',
    roomId: null,
    password1: null,
    password2: null,
}


export default (state = initialState, action) => {
    switch (action.type) {
        case DESKTOP_ACTION:
            return {
                ...state,
                textDesktop: action.payload.text
            }

        // socket action

        case websocketsOnActionTypes.WEBSOCKET_ON_CREATE_ROOM:
            return {
                ...state,
                roomId: action.roomId,
                password1: action.password1,
                password2: action.password2,
            }

        // default

        default:
            return state
    }
}