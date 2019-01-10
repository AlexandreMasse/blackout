import {websocketsOnActionTypes} from '../actions/websockets/websocketsActionTypes'
import desktopActionTypes from '../actions/desktopActionTypes';
import scenes from './../../components/scenes'

const initialState = {
  app: {
    isLoaded: false
  },
  currentStep: null,
  currentScene: scenes.SCENE1.name,
  roomId: null,
  password1: null,
  password2: null,
  users: [
    {
      id: "player1",
      isConnected: false,
      position: null,
      phoneData: null
    },
    {
      id: "player2",
      isConnected: false,
      position:null,
      phoneData: null
    }
  ],
}


export default (state = initialState, action) => {
  switch (action.type) {

    // desktop action

    case desktopActionTypes.SET_APP_LOADED: {
      return {
        ...state,
        app: {
          isLoaded: true
        }
      }
    }

    case desktopActionTypes.SET_CURRENT_STEP: {
      return {
        ...state,
        currentStep: action.currentStep
      }
    }

    case desktopActionTypes.SET_CURRENT_SCENE: {
      return {
        ...state,
        currentScene: action.currentScene
      }
    }

    // socket action

    case websocketsOnActionTypes.WEBSOCKET_ON_CREATE_ROOM: {
      const {roomId, password1, password2} = action.payload
      return {
        ...state,
        roomId,
        password1,
        password2,
      }
    }

    case websocketsOnActionTypes.WEBSOCKET_ON_CONNECT_TO_ROOM: {
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
    }

    case websocketsOnActionTypes.WEBSOCKET_ON_PHONE_DATA: {
      const  {phoneData, userId} = action.payload
      console.log(action);
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === userId) {
            return {
              ...user,
              phoneData
            }
          } else {
            return user;
          }
        }),
      }
    }

    case websocketsOnActionTypes.WEBSOCKET_ON_DISCONNECT_TO_ROOM: {
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
    }

    case websocketsOnActionTypes.WEBSOCKET_ON_POSITION: {
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
    }

    // default

    default:
      return state
  }
}