import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import testReducer from './reducers/testReducer';

export default function configureStore(initialState = {}) {

    const reducers = combineReducers({
        testReducer
    })

    return createStore(
        reducers,
        composeWithDevTools(
            applyMiddleware(thunk),
        )
    );
}