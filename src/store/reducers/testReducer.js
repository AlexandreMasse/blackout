import actionTypes from '../actions/actionTypes'

const initialState = {
    text: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TEST_ACTION:
            return {
                ...state,
                text: action.payload.text
            }
        default:
            return state
    }
}