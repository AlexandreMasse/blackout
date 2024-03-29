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

export const wsEmitPhoneData = (payload) => (dispatch, getState, {emit}) => {
    console.log("emit phone data", payload.data);
    emit(websocketsEmitActionTypes.WEBSOCKET_EMIT_PHONE_DATA, {
        phoneData: payload.data,
    })
}

export const wsEmitIntroProgression = (payload) => (dispatch, getState, {emit}) => {
    emit(websocketsEmitActionTypes.WEBSOCKET_EMIT_INTRO_PROGRESSION, {
        progression: payload.progression,
    });
}

export const wsEmitReconnection = (payload) => (dispatch, getState, {emit}) => {
    emit(websocketsEmitActionTypes.WEBSOCKET_EMIT_RECONNECT, {
        userId: payload.userId,
        roomId: payload.roomId,
    });
}

export const wsEmitShowDanger = (payload) => (dispatch, getState, {emit}) => {
    emit(websocketsEmitActionTypes.WEBSOCKET_EMIT_SHOW_DANGER, {
        userId: payload.userId,
        showDanger: payload.showDanger,
    })
}

export const wsEmitPosition = (payload) => (dispatch, getState, {emit}) => {
    emit(websocketsEmitActionTypes.WEBSOCKET_EMIT_POSITION, {
        position: payload.position,
    })
}

export const wsEmitIsLightOn = (payload) => (dispatch, getState, {emit}) => {
    emit(websocketsEmitActionTypes.WEBSOCKET_EMIT_LIGHT_ON, {
        isLightOn: payload.isLightOn,
    })
}

export const wsEmitSliderValue = (payload) => (dispatch, getState, {emit}) => {
    emit(websocketsEmitActionTypes.WEBSOCKET_EMIT_SLIDER_VALUE, {
        sliderValue: payload.sliderValue,
    });
}

export const wsEmitTapValue = (payload) => (dispatch, getState, {emit}) => {
    emit(websocketsEmitActionTypes.WEBSOCKET_EMIT_TAP_VALUE, {
        tapValue: payload.tapValue,
    });
}

export const wsEmitFingerprint = () => (dispatch, getState, {emit}) => {
    emit(websocketsEmitActionTypes.WEBSOCKET_EMIT_FINGERPRINT, {});
}

export const wsEmitCode = (payload) => (dispatch, getState, {emit}) => {
    emit(websocketsEmitActionTypes.WEBSOCKET_EMIT_CODE, {
        code: payload.code
    });
}

export const wsEmitHandle = (payload) => (dispatch, getState, {emit}) => {
    emit(websocketsEmitActionTypes.WEBSOCKET_EMIT_HANDLE, {
        handle: payload.handle
    });
}

