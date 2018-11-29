const initialState = {
    text: ''
}

export default (state = initialState, action) => {
 switch (action.type) {
     case 'TEST_ACTION':
   return {
       ...state,
       text: action.payload.text
   }
  default:
   return state
 }
}