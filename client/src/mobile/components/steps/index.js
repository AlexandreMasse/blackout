import React from 'react'

import {default as IntroStep} from './IntroStep/IntroStep'
import {onEnter as IntroStepOnEnter, onExit as IntroStepOnExit} from './IntroStep/transition'

import {default as CursorStep} from './CursorStep/CursorStep'
import {onEnter as CursorStepOnEnter, onExit as CursorStepOnExit} from './CursorStep/transition'


import {default as NotificationStep} from './NotificationStep/NotificationStep'
import {onEnter as NotificationStepOnEnter, onExit as NotificationStepOnExit} from './CursorStep/transition'

import {default as SliderStep} from './SliderStep/SliderStep'
import {onEnter as SliderStepOnEnter, onExit as SliderStepOnExit} from './SliderStep/transition'


export default {
  INTRO: {
    name: 'INTRO',
    component: <IntroStep/>,
    classNames: "",
    timeout: {enter: 1000, exit: 1000},
    onEnter: IntroStepOnEnter,
    onExit: IntroStepOnExit
  },
  NOTIFICATION: {
    name: 'NOTIFICATION',
    component: <NotificationStep/>,
    classNames: "",
    timeout: {enter: 2000, exit: 1000},
    onEnter: NotificationStepOnEnter,
    onExit: NotificationStepOnExit
  },
  CURSOR: {
    name: 'CURSOR',
    component: <CursorStep/>,
    classNames: "",
    timeout: {enter: 2000, exit: 1000},
    onEnter: CursorStepOnEnter,
    onExit: CursorStepOnExit
  },
  SLIDER: {
    name: 'SLIDER',
    component: <SliderStep/>,
    classNames: "",
    timeout: {enter: 2000, exit: 1000},
    onEnter: SliderStepOnEnter,
    onExit: SliderStepOnExit
  }
}