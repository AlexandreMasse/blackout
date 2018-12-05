import mobileActionTypes from '../../actions/mobile/mobileActionTypes'

const initialState = {
    textMobile: '',
    roomId: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case mobileActionTypes.MOBILE_ACTION:
            return {
                ...state,
                text: action.payload.text
            }
        default:
            return state
    }
}