import io from 'socket.io-client'

import {websocketsOnActionTypes, websocketsEmitActionTypes} from './websocketsActionTypes';

export const socket = io.connect(process.env.REACT_APP_SERVER_URL)

// init

export const init = ( store ) => {
    for(let typeKey in websocketsOnActionTypes) {
        const typeValue = websocketsOnActionTypes[typeKey]
        socket.on(typeValue, (payload) => {
            store.dispatch({type:typeValue, payload})
        })
    }
};

// emit

export const emit = (type, payload) => socket.emit(type, payload)

// actions

export const wsEmitDeviceType = (payload) => (dispatch, getState, {emit}) => {
    emit(websocketsEmitActionTypes.WEBSOCKET_EMIT_DEVICE_TYPE, {
        type: payload.type,
    })
}

export const wsEmitCurrentStep = (payload) => (dispatch, getState, {emit}) => {
    console.log("wsEmitCurrentStep", payload)
    emit(websocketsEmitActionTypes.WEBSOCKET_EMIT_CURRENT_STEP, {
        step: payload.currentStep,
    })
}
