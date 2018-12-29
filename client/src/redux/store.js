import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import desktop from './reducers/desktop/desktopReducer';
import mobile from './reducers/mobile/mobileReducer';
import {emit as websocketMobileEmit, init as websocketsMobileInit} from './actions/websockets/mobile/websocketsAction';
import {emit as websocketDesktopEmit, init as websocketsDesktopInit} from './actions/websockets/desktop/websocketsAction';

export default function configureStore(type, initialState = {}) {

    let combinedReducers;
    let enhancer;

    if (type === "desktop") {
        combinedReducers = combineReducers({
            desktop
        })
        enhancer = composeWithDevTools(applyMiddleware(thunk.withExtraArgument({
            emit: websocketDesktopEmit
        })))
    } else if (type === "mobile") {
        combinedReducers = combineReducers({
            mobile
        })
        enhancer = composeWithDevTools(applyMiddleware(thunk.withExtraArgument({
            emit: websocketMobileEmit
        })))
    }

    const store = createStore(
        combinedReducers,
        enhancer
    );

    type === "desktop" ? websocketsDesktopInit(store) : websocketsMobileInit(store)

    return store
}