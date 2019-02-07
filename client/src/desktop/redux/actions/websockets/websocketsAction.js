import io from 'socket.io-client'

import {websocketsOnActionTypes, websocketsEmitActionTypes} from './websocketsActionTypes';
import {setUserCurrentScene} from './../desktopAction';
import scenes from "../../../components/scenes"
import mobileSteps from "../../../../mobile/components/steps"

export const socket = io.connect(process.env.REACT_APP_SERVER_URL)

// init

export const init = ( store ) => {
    for(let typeKey in websocketsOnActionTypes) {
        const typeValue = websocketsOnActionTypes[typeKey]
        socket.on(typeValue, (payload) => {
            store.dispatch({type:typeValue, payload})
            switch (typeValue) {
                case websocketsOnActionTypes.WEBSOCKET_ON_FINGERPRINT: {
                    console.log("receive fingerprint");
                    const currentUser = store.getState().desktop.users.find(user => user.id === payload.userId)
                    // set desktop user currentScene
                    //TODO: replace with good data
                    const nextScene = currentUser.status === "superior" ? scenes.SCENEDOOR.name : scenes.SCENEDOOR.name
                    store.dispatch(setUserCurrentScene({userId: payload.userId, currentScene: nextScene}))
                    // set mobile user currentStep
                    //TODO: replace with good data
                    const nextMobileStep = currentUser.status === "superior" ? mobileSteps.CURSOR.name : mobileSteps.CURSOR.name
                    store.dispatch(wsEmitUserCurrentStep({userId: payload.userId, currentStep: nextMobileStep }))
                }
            }
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

export const wsEmitUserCurrentStep = (payload) => (dispatch, getState, {emit}) => {
    console.log("wsEmitUserCurrentStep", payload)
    emit(websocketsEmitActionTypes.WEBSOCKET_EMIT_USER_CURRENT_STEP, {
        userId: payload.userId,
        step: payload.currentStep,
    })
}

export const wsEmitShowDanger = (payload) => (dispatch, getState, {emit}) => {
    console.log("wsEmitShowDanger", payload)
    emit(websocketsEmitActionTypes.WEBSOCKET_EMIT_SHOW_DANGER, {
        userId: payload.userId,
        showDanger: payload.showDanger,
    })
}
