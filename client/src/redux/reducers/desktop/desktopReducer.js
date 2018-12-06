import {websocketsOnActionTypes} from '../../actions/websockets/websocketsActionTypes'

const initialState = {
    roomId: null,
    password1: null,
    password2: null,
    users: [
        {
            id: "player1",
            isConnected: false
        },
        {
            id: "player2",
            isConnected: false
        }
    ],
    position:[0,0]
}


export default (state = initialState, action) => {
    switch (action.type) {

        // socket action

        case websocketsOnActionTypes.WEBSOCKET_ON_CREATE_ROOM:
            const {roomId, password1, password2} = action.payload
            return {
                ...state,
                roomId,
                password1,
                password2,
            }
        case websocketsOnActionTypes.WEBSOCKET_ON_CONNECT_TO_ROOM:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.payload.userId) {
                        return {
                            ...user,
                            isConnected: true
                        }
                    } else {
                        return user;
                    }
                }),
            }
        case websocketsOnActionTypes.WEBSOCKET_ON_DISCONNECT_TO_ROOM:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.payload.userId) {
                        return {
                            ...user,
                            isConnected: false
                        }
                    } else {
                        return user;
                    }
                }),
            }
      case websocketsOnActionTypes.WEBSOCKET_ON_POSITION:
        return {
          ...state,
          position: action.payload.position
        }

        // default

        default:
            return state
    }
}