import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {MobileApp, DesktopApp} from './components'
import * as serviceWorker from './serviceWorker'
import {isXs, isMobile} from './utils'

const App = isXs() && isMobile() ? <MobileApp /> : <DesktopApp />

ReactDOM.render(App, document.getElementById('root'))

serviceWorker.unregister()
