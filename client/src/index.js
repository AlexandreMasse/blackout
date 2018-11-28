import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import MobileApp from './components/Mobile'
import DesktopApp from './components/Desktop'
import * as serviceWorker from './serviceWorker'

if (window.innerWidth < 767) {
    console.log('petit')
    ReactDOM.render(<MobileApp />, document.getElementById('root'))
} else {
    console.log('grand')
    ReactDOM.render(<DesktopApp />, document.getElementById('root'))
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
