import io from 'socket.io-client'

import {websocketsOnActionTypes, websocketsEmitActionTypes} from './websocketsActionTypes';


export const socket = io.connect(process.env.REACT_APP_SERVER_URL)

// init

export const init = ( store ) => {
  Object.keys( websocketsOnActionTypes )
    .forEach( type => socket.on(websocketsOnActionTypes[type], ( payload ) =>
       store.dispatch({ type, payload })
    )
  );
};

// emit

export const emit = (type, payload, roomId) => roomId ? socket.to(roomId).emit(type, payload) : socket.emit(type, payload)

// actions

export const wsEmitPassword = (payload) => (dispatch, getState, {emit}) => {
    emit(websocketsEmitActionTypes.WEBSOCKET_EMIT_PASSWORD, {
        key: payload.code,
    });
}

export const wsEmitDeviceType = (payload) => (dispatch, getState, {emit}) => {
    emit(websocketsEmitActionTypes.WEBSOCKET_EMIT_DEVICE_TYPE, {
        type: payload.type,
    });
}