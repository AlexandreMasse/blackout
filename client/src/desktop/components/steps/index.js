import React from 'react'

import {onEnter as ConnexionStepOnEnter, onExit as ConnexionStepOnExit} from "./ConnexionStep/transition";
import {default as ConnexionStep} from './ConnexionStep/ConnexionStep'

import {onEnter as AnalysisStepOnEnter, onExit as AnalysisStepOnExit} from "./AnalysisStep/transition";
import {default as AnalysisStep} from './AnalysisStep/AnalysisStep'


import {onEnter as SceneStepOnEnter, onExit as SceneStepOnExit} from "./SceneStep/transition";
import {default as SceneStep} from './SceneStep/SceneStep'



export default {
  CONNEXION: {
    name:"CONNEXION",
    classNames: "",
    component: <ConnexionStep/>,
    timeout: {enter: 3000, exit: 3000},
    onEnter: ConnexionStepOnEnter,
    onExit: ConnexionStepOnExit
  },
  ANALYSIS: {
    name: "ANALYSIS",
    classNames: "",
    component: <AnalysisStep/>,
    timeout: {enter: 3000, exit: 3000},
    onEnter: AnalysisStepOnEnter,
    onExit: AnalysisStepOnExit
  },
  SCENE: {
    name: "SCENE",
    classNames: "",
    component: <SceneStep/>,
    timeout: {enter: 3000, exit: 3000},
    onEnter: SceneStepOnEnter,
    onExit: SceneStepOnExit
  }
}


