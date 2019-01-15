
import {default as SceneFlashlight} from './SceneFlashlight/SceneFlashlight'
import {onEnter as onEnterSceneFlashlight, onExit as onExitSceneFlashlight} from './SceneFlashlight/transition'

import {default as Scene2} from './Scene2/Scene2'
import {onEnter as onEnterScene2, onExit as onExitScene2} from './Scene2/transition'

import {default as SceneKinematic} from './SceneKinematic/SceneKinematic'
import {onEnter as onEnterSceneKinematic, onExit as onExitSceneKinematic} from './SceneKinematic/transition'

export default {
  SCENEFLASHLIGHT: {
    name:"SCENEFLASHLIGHT",
    scene: SceneFlashlight,
    onEnter: onEnterSceneFlashlight,
    onExit: onExitSceneFlashlight,
  },
  SCENE2: {
    name:"SCENE2",
    scene: Scene2,
    onEnter: onEnterScene2,
    onExit: onExitScene2,
  },
  SCENEKINEMATIC: {
    name:"SCENEKINEMATIC",
    scene: SceneKinematic,
    onEnter: onEnterSceneKinematic,
    onExit: onExitSceneKinematic,
  },
}


