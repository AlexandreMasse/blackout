import React from 'react'

import {default as ConnexionStep} from './ConnexionStep/ConnexionStep'
import {
  onEnter as ConnexionStepOnEnter,
  onExit as ConnexionStepOnExit,
  onEnterTimeout as ConnexionStepOnEnterTimeout,
  onExitTimeout as ConnexionStepOnExitTimeout
} from "./ConnexionStep/transition";

import {default as AnalysisStep} from './AnalysisStep/AnalysisStep'
import {
  onEnter as AnalysisStepOnEnter,
  onExit as AnalysisStepOnExit,
  onEnterTimeout as AnalysisStepOnEnterTimeout,
  onExitTimeout as AnalysisStepOnExitTimeout
} from "./AnalysisStep/transition";


import {default as SceneStep} from './SceneStep/SceneStep'
import {
  onEnter as SceneStepOnEnter,
  onExit as SceneStepOnExit,
  onEnterTimeout as SceneStepOnEnterTimeout,
  onExitTimeout as SceneStepOnExitTimeout
} from "./SceneStep/transition";

import {default as ConclusionStep} from './ConclusionStep/ConclusionStep'
import {
  onEnter as ConclusionStepOnEnter,
  onExit as ConclusionStepOnExit,
  onEnterTimeout as ConclusionStepOnEnterTimeout,
  onExitTimeout as ConclusionStepOnExitTimeout
} from "./ConclusionStep/transition";



export default {
  CONNEXION: {
    name:"CONNEXION",
    classNames: "",
    component: <ConnexionStep/>,
    timeout: {enter: ConnexionStepOnEnterTimeout, exit: ConnexionStepOnExitTimeout },
    onEnter: ConnexionStepOnEnter,
    onExit: ConnexionStepOnExit
  },
  ANALYSIS: {
    name: "ANALYSIS",
    classNames: "",
    component: <AnalysisStep/>,
    timeout: {enter: AnalysisStepOnEnterTimeout, exit: AnalysisStepOnExitTimeout},
    onEnter: AnalysisStepOnEnter,
    onExit: AnalysisStepOnExit
  },
  SCENE: {
    name: "SCENE",
    classNames: "",
    component: <SceneStep/>,
    timeout: {enter: SceneStepOnEnterTimeout, exit: SceneStepOnExitTimeout},
    onEnter: SceneStepOnEnter,
    onExit: SceneStepOnExit
  },
  CONCLUSION: {
    name: "CONCLUSION",
    classNames: "",
    component: <ConclusionStep/>,
    timeout: {enter: ConclusionStepOnEnterTimeout, exit: ConclusionStepOnExitTimeout},
    onEnter: ConclusionStepOnEnter,
    onExit: ConclusionStepOnExit
  },
}


