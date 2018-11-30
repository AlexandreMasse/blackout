import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import test from './reducers/testReducer';

export default function configureStore(initialState = {}) {

    const combinedReducers = combineReducers({
        test
    })

    const enhancer = composeWithDevTools(applyMiddleware(thunk))

    return createStore(
        combinedReducers,
        enhancer
    );
}