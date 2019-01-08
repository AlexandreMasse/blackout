import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import desktop from './reducers/desktopReducer';
import {emit as websocketsEmit, init as websocketsInit} from './actions/websockets/websocketsAction';

export default function configureStore(initialState = {}) {

    const combinedReducers = combineReducers({
        desktop
    })
    const enhancer = composeWithDevTools(applyMiddleware(thunk.withExtraArgument({
        emit: websocketsEmit
    })))

    const store = createStore(
        combinedReducers,
        enhancer
    );

    websocketsInit(store)

    return store
}