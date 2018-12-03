import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from '../src/redux/store';
import './stylesheets/index.scss';
//import './index.css'
import {MobileApp, DesktopApp} from './components'
import * as serviceWorker from './serviceWorker'
import {isXs, isMobile} from './utils'

const App = isXs() && isMobile() ? <MobileApp/> : <DesktopApp/>
const storeType = isXs() && isMobile() ? "mobile" : "desktop"

ReactDOM.render(
    <Provider store={configureStore(storeType)}>
        {App}
    </Provider>,
    document.getElementById('root'))

serviceWorker.unregister()
