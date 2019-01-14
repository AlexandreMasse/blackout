import {websocketsOnActionTypes} from '../actions/websockets/websocketsActionTypes'
import desktopActionTypes from '../actions/desktopActionTypes';
import scenes from './../../components/scenes'

const initialState = {
  app: {
    isLoaded: false
  },
  currentStep: null,
  currentScene: scenes.SCENE1.name,
  isSplitScreen: false,
  roomId: null,
  password1: null,
  password2: null,
  users: [
    {
      id: "player1",
      isConnected: false,
      status: null,
      position: null,
      phoneData: null,
      currentScene: scenes.SCENE1.name,
    },
    {
      id: "player2",
      isConnected: false,
      status: null,
      position:null,
      phoneData: null,
      currentScene: scenes.SCENE2.name,
    }
  ],
};


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

    case desktopActionTypes.SET_SPLIT_SCREEN: {
      return {
        ...state,
        isSplitScreen: action.payload
      }
    }

    case desktopActionTypes.SET_USER_CURRENT_SCENE: {
      const {currentScene, userId} = action.payload
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === userId) {
            return {
              ...user,
              currentScene
            }
          } else {
            return user;
          }
        }),
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
      const phoneDataArray = action.payload
      return {
        ...state,
        users: state.users.map(user => {
          phoneDataArray.forEach(phoneData => {
            if (user.id === phoneData.userId) {
              user = {
                ...user,
                status: (() => {
                  const currentScore = phoneData.phoneData.score;
                  const otherScore = phoneDataArray.find(pd => pd.userId !== user.id).phoneData.score;
                   if (currentScore > otherScore) {
                     return "superior"
                   } else if (currentScore === otherScore) {
                     return "equal"
                   } else {
                     return "inferior"
                   }
                })(),
                phoneData: phoneData.phoneData
              }
            }
          })
          return user
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

