import React from 'react'
import ReactDOM from 'react-dom'
import './stylesheets/index.scss';
import MobileApp from './mobile/components/MobileApp'
import DesktopApp from './desktop/components/DesktopApp'
import * as serviceWorker from './serviceWorker'
import {isXs, isMobile} from './utils'

const App = isXs() && isMobile() ? <MobileApp/> : <DesktopApp/>

ReactDOM.render(
  App,
  document.getElementById('root'))

serviceWorker.unregister()
