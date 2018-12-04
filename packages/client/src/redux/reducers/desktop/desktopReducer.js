import desktopActionTypes from '../../actions/desktop/desktopActionTypes'

const initialState = {
    text: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case desktopActionTypes.DESKTOP_ACTION:
            return {
                ...state,
                text: action.payload.text
            }
        default:
            return state
    }
}