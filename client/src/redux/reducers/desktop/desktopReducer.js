import {websocketsOnActionTypes} from '../../actions/websockets/websocketsActionTypes'
import {SET_APP_LOADED} from '../../actions/desktop/desktopActionTypes'

const initialState = {
  app: {
    isLoaded: false
  },
  roomId: null,
  password1: null,
  password2: null,
  users: [
    {
      id: "player1",
      isConnected: false,
      position: {}
    },
    {
      id: "player2",
      isConnected: false,
      position:{}
    }
  ],
  position: {}
}


export default (state = initialState, action) => {
  switch (action.type) {


    // app action
    case SET_APP_LOADED:
      return {
        ...state,
        app: {
          isLoaded: true
        }
      }

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
      const {position, userId} = action.payload
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === userId) {
            return {
              ...user,
              position
            }
          } else {
            return user;
          }
        }),
      }

    // default

    default:
      return state
  }
}