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
    users: [
        {
            id: "player1",
            isConnected: false,
            phoneScore: null,
        },
        {
            id: "player2",
            isConnected: false,
            phoneScore: null,
        }
    ],
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
                //useless
                users: state.users.map(user => {
                    if (user.id === userId) {
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
                                phoneScore: phoneData.phoneData.score
                            }
                        }
                    })
                    return user
                }),
            }
        }
        case websocketsOnActionTypes.WEBSOCKET_ON_CURRENT_STEP: {
            const {step} = action.payload
            return {
                ...state,
                currentStep:step
            }
        }

        default: {
            return state
        }
    }
}