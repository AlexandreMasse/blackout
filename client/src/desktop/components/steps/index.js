import React from 'react'

import {onEnter as ConnexionStepOnEnter, onExit as ConnexionStepOnExit, onEnterTimeout as ConnexionStepOnEnterTimeout, onExitTimeout as ConnexionStepOnExitTimeout} from "./ConnexionStep/transition";
import {default as ConnexionStep} from './ConnexionStep/ConnexionStep'

import {onEnter as AnalysisStepOnEnter, onExit as AnalysisStepOnExit,
  onEnterTimeout as AnalysisStepOnEnterTimeout, onExitTimeout as AnalysisStepOnExitTimeout} from "./AnalysisStep/transition";
import {default as AnalysisStep} from './AnalysisStep/AnalysisStep'


import {onEnter as SceneStepOnEnter, onExit as SceneStepOnExit} from "./SceneStep/transition";
import {default as SceneStep} from './SceneStep/SceneStep'



export default {
  CONNEXION: {
    name:"CONNEXION",
    classNames: "",
    component: <ConnexionStep/>,
    timeout: {enter: ConnexionStepOnEnterTimeout * 1000, exit: ConnexionStepOnExitTimeout * 1000},
    onEnter: ConnexionStepOnEnter,
    onExit: ConnexionStepOnExit
  },
  ANALYSIS: {
    name: "ANALYSIS",
    classNames: "",
    component: <AnalysisStep/>,
    timeout: {enter: AnalysisStepOnEnterTimeout * 1000, exit: AnalysisStepOnExitTimeout * 1000},
    onEnter: AnalysisStepOnEnter,
    onExit: AnalysisStepOnExit
  },
  SCENE: {
    name: "SCENE",
    classNames: "",
    component: <SceneStep/>,
    timeout: {enter: 2000, exit: 3000},
    onEnter: SceneStepOnEnter,
    onExit: SceneStepOnExit
  }
}


