import { websocketsOnActionTypes } from '../actions/websockets/websocketsActionTypes';
import desktopActionTypes from '../actions/desktopActionTypes';
import scenes from './../../components/scenes';
import steps from './../../components/steps';

const initialState = {
  app: {
    isLoaded: false
  },
  currentStep: null,
  lang: 'en',
  currentScene: scenes.SCENEKINEMATIC.name,
  isSplitScreen: false,
  roomId: null,
  password1: null,
  password2: null,
  users: [
    {
      id: 'player1',
      isConnected: false,
      isConnectedOnce: false,
      status: 'inferior',
      introProgression: 0,
      phoneData: {
        os: 'Android',
        osVersionNumber: 7,
        osReleaseDate: '21/08/2017',
        height: 731,
        width: 411,
        operator: {
          ip: '195.68.195.30',
          hostname: 'toto.urba.cci-parisidf.fr',
          city: 'Paris',
          region: 'Ile-de-France',
          country: 'FR',
          loc: '48.8763,2.3183',
          postal: '75008',
          org: "AS56774 Chambre de commerce et d'Industrie de Paris"
        },
        score: 12.43252921697582
      },
      position: null,
      isLightOn: false,
      sliderValue: null,
      tapValue: null,
      fingerprint: false, //TODO : false
      code: [0, 0, 0],
      handle: 0,
      stairsProgression: 0,
      splitScreenPercentage: 0.1,
      currentScene: scenes.SCENEBASE.name,
      indication: {
        isActive: false,
        isOpen: false,
        title: 'Allumez votre lampe',
        description: 'Pointez votre téléphone vers le + à gauche et appuyez sur le boutton',
        theme: 'white'
      }
    },
    {
      id: 'player2',
      isConnected: false,
      isConnectedOnce: false,
      status: 'superior',
      introProgression: 0,
      phoneData: {
        os: 'Android',
        osVersionNumber: 8,
        osReleaseDate: '21/08/2017',
        height: 731,
        width: 411,
        operator: {
          ip: '195.68.195.30',
          hostname: 'toto.urba.cci-parisidf.fr',
          city: 'Paris',
          region: 'Ile-de-France',
          country: 'FR',
          loc: '48.8763,2.3183',
          postal: '75008',
          org: "AS56774 Chambre de commerce et d'Industrie de Paris"
        },
        score: 15.43252921697582
      },
      position: null,
      isLightOn: false,
      sliderValue: null,
      tapValue: null,
      fingerprint: false, // TODO: false
      code: [0, 0, 0],
      handle: 0,
      stairsProgression: 0,
      currentScene: scenes.SCENEBASE.name,
      indication: {
        isActive: false,
        isOpen: false,
        title: 'Allumez votre lampe',
        description: 'Pointez votre téléphone vers le + à droite et appuyez sur le boutton',
        theme: 'white'
      }
    }
  ]
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
      };
    }

    case desktopActionTypes.SET_LANG: {
      return {
        ...state,
        lang: action.lang
      };
    }

    case desktopActionTypes.SET_CURRENT_STEP: {
      return {
        ...state,
        currentStep: action.currentStep
      };
    }

    case desktopActionTypes.SET_CURRENT_SCENE: {
      return {
        ...state,
        currentScene: action.currentScene
      };
    }

    case desktopActionTypes.SET_SPLIT_SCREEN: {
      return {
        ...state,
        isSplitScreen: action.payload.isSplitScreen
      };
    }

    case desktopActionTypes.SET_USER_CURRENT_SCENE: {
      const { currentScene, userId } = action.payload;
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === userId) {
            return {
              ...user,
              currentScene
            };
          } else {
            return user;
          }
        })
      };
    }

    case desktopActionTypes.SET_USER_INDICATION_ACTIVE: {
      const { isActive, userId } = action.payload;
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === userId) {
            return {
              ...user,
              indication: {
                ...user.indication,
                isActive
              }
            };
          } else {
            return user;
          }
        })
      };
    }

    case desktopActionTypes.SET_USER_INDICATION_OPEN: {
      const { isOpen, userId } = action.payload;
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === userId) {
            return {
              ...user,
              indication: {
                ...user.indication,
                isOpen
              }
            };
          } else {
            return user;
          }
        })
      };
    }

    case desktopActionTypes.SET_USER_INDICATION_TITLE: {
      const { title, userId } = action.payload;
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === userId) {
            return {
              ...user,
              indication: {
                ...user.indication,
                title
              }
            };
          } else {
            return user;
          }
        })
      };
    }

    case desktopActionTypes.SET_USER_INDICATION_DESCRIPTION: {
      const { description, userId } = action.payload;
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === userId) {
            return {
              ...user,
              indication: {
                ...user.indication,
                description
              }
            };
          } else {
            return user;
          }
        })
      };
    }

    case desktopActionTypes.SET_USER_INDICATION_THEME: {
      const { theme, userId } = action.payload;
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === userId) {
            return {
              ...user,
              indication: {
                ...user.indication,
                theme
              }
            };
          } else {
            return user;
          }
        })
      };
    }

    case desktopActionTypes.SET_USER_STAIRS_PROGRESSION: {
      const { stairsProgression, userId } = action.payload;
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === userId) {
            return {
              ...user,
              stairsProgression
            };
          } else {
            return user;
          }
        })
      };
    }

    case desktopActionTypes.SET_USER_STAIRS_FINISHED: {
      const { stairsFinished, userId } = action.payload;
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === userId) {
            return {
              ...user,
              stairsFinished
            };
          } else {
            return user;
          }
        })
      };
    }

    case desktopActionTypes.SET_PLAYER1_SPLIT_SCREEN_PERCENTAGE: {
      const { splitScreenPercentage } = action.payload;
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === 'player1') {
            return {
              ...user,
              splitScreenPercentage
            };
          } else {
            return user;
          }
        })
      };
    }

    // socket action

    case websocketsOnActionTypes.WEBSOCKET_ON_CREATE_ROOM: {
      const { roomId, password1, password2 } = action.payload;
      return {
        ...state,
        roomId,
        password1,
        password2
      };
    }

    case websocketsOnActionTypes.WEBSOCKET_ON_CONNECT_TO_ROOM: {
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.payload.userId) {
            return {
              ...user,
              isConnected: true,
              isConnectedOnce: true
            };
          } else {
            return user;
          }
        })
      };
    }

    case websocketsOnActionTypes.WEBSOCKET_ON_PHONE_DATA: {
      const phoneDataArray = action.payload;
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
                    return 'superior';
                  } else if (currentScore === otherScore) {
                    return user.id === 'player1' ? 'superior' : 'inferior';
                  } else {
                    return 'inferior';
                  }
                })(),
                phoneData: phoneData.phoneData
              };
            }
          });
          return user;
        })
      };
    }

    case websocketsOnActionTypes.WEBSOCKET_ON_DISCONNECT_TO_ROOM: {
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.payload.userId) {
            return {
              ...user,
              isConnected: false,
              introProgression: 0
            };
          } else {
            return user;
          }
        })
      };
    }

    case websocketsOnActionTypes.WEBSOCKET_ON_POSITION: {
      const { position, userId } = action.payload;
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === userId) {
            return {
              ...user,
              position
            };
          } else {
            return user;
          }
        })
      };
    }
    case websocketsOnActionTypes.WEBSOCKET_ON_LIGHTON: {
      const { isLightOn, userId } = action.payload;
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === userId) {
            return {
              ...user,
              isLightOn
            };
          } else {
            return user;
          }
        })
      };
    }

    case websocketsOnActionTypes.WEBSOCKET_ON_SLIDER_VALUE: {
      const { sliderValue, userId } = action.payload;
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === userId) {
            return {
              ...user,
              sliderValue
            };
          } else {
            return user;
          }
        })
      };
    }

    case websocketsOnActionTypes.WEBSOCKET_ON_TAP_VALUE: {
      const { tapValue, userId } = action.payload;
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === userId) {
            return {
              ...user,
              tapValue
            };
          } else {
            return user;
          }
        })
      };
    }

    case websocketsOnActionTypes.WEBSOCKET_ON_FINGERPRINT: {
      const { userId } = action.payload;
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === userId) {
            return {
              ...user,
              fingerprint: true
            };
          } else {
            return user;
          }
        })
      };
    }

    case websocketsOnActionTypes.WEBSOCKET_ON_CODE: {
      const { code, userId } = action.payload;
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === userId) {
            return {
              ...user,
              code
            };
          } else {
            return user;
          }
        })
      };
    }

    case websocketsOnActionTypes.WEBSOCKET_ON_HANDLE: {
      const { handle, userId } = action.payload;
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === userId) {
            return {
              ...user,
              handle
            };
          } else {
            return user;
          }
        })
      };
    }

    case websocketsOnActionTypes.WEBSOCKET_ON_INTRO_PROGRESSION: {
      const { progression, userId } = action.payload;
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === userId) {
            return {
              ...user,
              introProgression: progression
            };
          } else {
            return user;
          }
        })
      };
    }

    // default

    default:
      return state;
  }
};
