import React from 'react'

import { default as IntroStep} from './IntroStep/IntroStep'
import {
  onEnter as IntroStepOnEnter,
  onExit as IntroStepOnExit,
  onEnterTimeout as IntroStepOnEnterTimeout,
  onExitTimeout as IntroStepOnExitTimeout
} from './IntroStep/transition'

import {default as LunchStep} from './LunchStep/LunchStep'
import {
  onEnter as LunchStepOnEnter,
  onExit as LunchStepOnExit,
  onEnterTimeout as LunchStepOnEnterTimeout,
  onExitTimeout as LunchStepOnExitTimeout
} from './LunchStep/transition'


import {default as CursorStep} from './CursorStep/CursorStep'
import {
  onEnter as CursorStepOnEnter,
  onExit as CursorStepOnExit,
  onEnterTimeout as CursorStepOnEnterTimeout,
  onExitTimeout as CursorStepOnExitTimeout
} from './CursorStep/transition'

import {default as NotificationStep} from './NotificationStep/NotificationStep'
import {
  onEnter as NotificationStepOnEnter,
  onExit as NotificationStepOnExit,
  onEnterTimeout as NotificationStepOnEnterTimeout,
  onExitTimeout as NotificationStepOnExitTimeout
} from './NotificationStep/transition'

import {default as SliderStep} from './SliderStep/SliderStep'
import {
  onEnter as SliderStepOnEnter,
  onExit as SliderStepOnExit,
  onEnterTimeout as SliderStepOnEnterTimeout,
  onExitTimeout as SliderStepOnExitTimeout
} from './SliderStep/transition'

import {default as StairsStep} from './StairsStep/StairsStep'
import {
  onEnter as StairsStepOnEnter,
  onExit as StairsStepOnExit,
  onEnterTimeout as StairsStepOnEnterTimeout,
  onExitTimeout as StairsStepOnExitTimeout
} from './StairsStep/transition'


import {default as FingerprintStep} from './FingerprintStep/FingerprintStep'
import {
  onEnter as FingerprintStepOnEnter,
  onExit as FingerprintStepOnExit,
  onEnterTimeout as FingerprintStepOnEnterTimeout,
  onExitTimeout as FingerprintStepOnExitTimeout
} from './FingerprintStep/transition'


import {default as CodeStep} from './CodeStep/CodeStep'
import {
  onEnter as CodeStepOnEnter,
  onExit as CodeStepOnExit,
  onEnterTimeout as CodeStepOnEnterTimeout,
  onExitTimeout as CodeStepOnExitTimeout
} from './CodeStep/transition'

import {default as HandleStep} from './HandleStep/HandleStep'
import {
  onEnter as HandleStepOnEnter,
  onExit as HandleStepOnExit,
  onEnterTimeout as HandleStepOnEnterTimeout,
  onExitTimeout as HandleStepOnExitTimeout
} from './HandleStep/transition'

import {default as ConclusionStep} from './ConclusionStep/ConclusionStep'
import {
  onEnter as ConclusionStepOnEnter,
  onExit as ConclusionStepOnExit,
  onEnterTimeout as ConclusionStepOnEnterTimeout,
  onExitTimeout as ConclusionStepOnExitTimeout
} from './ConclusionStep/transition'


export default {
  INTRO: {
    name: 'INTRO',
    component: <IntroStep/>,
    classNames: "",
    timeout: {enter: IntroStepOnEnterTimeout, exit: IntroStepOnExitTimeout},
    onEnter: IntroStepOnEnter,
    onExit: IntroStepOnExit
  },
  LUNCH: {
    name: 'LUNCH',
    component: <LunchStep/>,
    classNames: "",
    timeout: {enter: LunchStepOnEnterTimeout, exit: LunchStepOnExitTimeout},
    onEnter: LunchStepOnEnter,
    onExit: LunchStepOnExit
  },
  NOTIFICATION: {
    name: 'NOTIFICATION',
    component: <NotificationStep/>,
    classNames: "",
    timeout: {enter: NotificationStepOnEnterTimeout, exit: NotificationStepOnExitTimeout},
    onEnter: NotificationStepOnEnter,
    onExit: NotificationStepOnExit
  },
  CURSOR: {
    name: 'CURSOR',
    component: <CursorStep/>,
    classNames: "",
    timeout: {enter: CursorStepOnEnterTimeout, exit: CursorStepOnExitTimeout},
    onEnter: CursorStepOnEnter,
    onExit: CursorStepOnExit
  },
  SLIDER: {
    name: 'SLIDER',
    component: <SliderStep/>,
    classNames: "",
    timeout: {enter: SliderStepOnEnterTimeout, exit: SliderStepOnExitTimeout},
    onEnter: SliderStepOnEnter,
    onExit: SliderStepOnExit
  },
  STAIRS: {
    name: 'STAIRS',
    component: <StairsStep/>,
    classNames: "",
    timeout: {enter: StairsStepOnEnterTimeout, exit: StairsStepOnExitTimeout},
    onEnter: StairsStepOnEnter,
    onExit: StairsStepOnExit
  },
  FINGERPRINT: {
    name: 'FINGERPRINT',
    component: <FingerprintStep/>,
    classNames: "",
    timeout: {enter: FingerprintStepOnEnterTimeout, exit: FingerprintStepOnExitTimeout},
    onEnter: FingerprintStepOnEnter,
    onExit: FingerprintStepOnExit
  },
  CODE: {
    name: 'CODE',
    component: <CodeStep/>,
    classNames: "",
    timeout: {enter: CodeStepOnEnterTimeout, exit: CodeStepOnExitTimeout},
    onEnter: CodeStepOnEnter,
    onExit: CodeStepOnExit
  },
  HANDLE: {
    name: 'HANDLE',
    component: <HandleStep/>,
    classNames: "",
    timeout: {enter: HandleStepOnEnterTimeout, exit: HandleStepOnExitTimeout},
    onEnter: HandleStepOnEnter,
    onExit: HandleStepOnExit
  },
  CONCLUSION: {
    name: 'CONCLUSION',
    component: <ConclusionStep/>,
    classNames: "",
    timeout: {enter: ConclusionStepOnEnterTimeout, exit: ConclusionStepOnExitTimeout},
    onEnter: ConclusionStepOnEnter,
    onExit: ConclusionStepOnExit
  }
}