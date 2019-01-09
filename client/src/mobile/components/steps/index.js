import React from 'react'

import {default as IntroStep} from './IntroStep/IntroStep'
import {onEnter as IntroStepOnEnter, onExit as IntroStepOnExit} from './IntroStep/transition'

import {default as CursorStep} from './CursorStep/CursorStep'
import {onEnter as CursorStepOnEnter, onExit as CursorStepOnExit} from './CursorStep/transition'


export default {
  INTRO: {
    name: 'INTRO',
    component: <IntroStep/>,
    classNames: "",
    timeout: {enter: 3000, exit: 3000},
    onEnter: IntroStepOnEnter,
    onExit: IntroStepOnExit
  },
  CURSOR: {
    name: 'CURSOR',
    component: <CursorStep/>,
    classNames: "",
    timeout: {enter: 4000, exit: 3000},
    onEnter: CursorStepOnEnter,
    onExit: CursorStepOnExit
  }
}