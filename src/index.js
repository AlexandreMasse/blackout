import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './store/redux';
import './stylesheets/index.scss';
import AppDesktop from './components/desktop/AppDesktop';
import AppMobile from './components/mobile/AppMobile';
import * as serviceWorker from './serviceWorker';

const App = window.innerWidth > 764 ? AppDesktop : AppMobile

ReactDOM.render(
    <Provider store={configureStore()}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
