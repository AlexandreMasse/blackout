
import {default as SceneFlashlight} from './SceneFlashlight/SceneFlashlight'
import {onEnter as onEnterSceneFlashlight, onExit as onExitSceneFlashlight} from './SceneFlashlight/transition'

import {default as SceneGenerator} from './SceneGenerator/SceneGenerator'
import {onEnter as onEnterSceneGenerator, onExit as onExitSceneGenerator} from './SceneGenerator/transition'

import {default as SceneKinematic} from './SceneKinematic/SceneKinematic'
import {onEnter as onEnterSceneKinematic, onExit as onExitSceneKinematic} from './SceneKinematic/transition'

export default {
  SCENEFLASHLIGHT: {
    name:"SCENEFLASHLIGHT",
    scene: SceneFlashlight,
    onEnter: onEnterSceneFlashlight,
    onExit: onExitSceneFlashlight,
  },
  SCENEGENERATOR: {
    name:"SCENEGENERATOR",
    scene: SceneGenerator,
    onEnter: onEnterSceneGenerator,
    onExit: onExitSceneGenerator,
  },
  SCENEKINEMATIC: {
    name:"SCENEKINEMATIC",
    scene: SceneKinematic,
    onEnter: onEnterSceneKinematic,
    onExit: onExitSceneKinematic,
  },
}


