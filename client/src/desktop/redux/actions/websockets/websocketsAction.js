import io from 'socket.io-client'

import {websocketsOnActionTypes, websocketsEmitActionTypes} from './websocketsActionTypes';
import {setPlayer1SplitScreenPercentage} from './../desktopAction';
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
                    const currentUser = store.getState().desktop.users.find(user => user.id === payload.userId)
                    // set mobile user currentStep
                    const nextMobileStep = currentUser.status === "superior" ? mobileSteps.HANDLE.name : mobileSteps.CODE.name
                    store.dispatch(wsEmitUserCurrentStep({userId: payload.userId, currentStep: nextMobileStep }))
                    break;
                }
                case websocketsOnActionTypes.WEBSOCKET_ON_HANDLE: {
                    const isPlayer1 = payload.userId === "player1"
                    const handlePourcentage = payload.handle / 2
                    const splitScreenPercentage = isPlayer1 ? 0.5 + handlePourcentage : 0.5 - handlePourcentage;
                    store.dispatch(setPlayer1SplitScreenPercentage({splitScreenPercentage}))
                    break;
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
