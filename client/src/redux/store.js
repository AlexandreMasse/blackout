import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import desktop from './reducers/desktop/desktopReducer';
import mobile from './reducers/mobile/mobileReducer';

export default function configureStore(type, initialState = {}) {

    let combinedReducers;

    if(type === "desktop") {
        combinedReducers = combineReducers({
            desktop
        })
    } else if (type === "mobile") {
         combinedReducers = combineReducers({
             mobile
         })
    }

    const enhancer = composeWithDevTools(applyMiddleware(thunk))

    return createStore(
        combinedReducers,
        enhancer
    );
}