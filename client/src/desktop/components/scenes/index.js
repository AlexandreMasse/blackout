
import {default as SceneFlashlight} from './SceneFlashlight/SceneFlashlight'
import {onEnter as onEnterSceneFlashlight, onExit as onExitSceneFlashlight} from './SceneFlashlight/transition'

import {default as SceneGenerator} from './SceneGenerator/SceneGenerator'
import {onEnter as onEnterSceneGenerator, onExit as onExitSceneGenerator} from './SceneGenerator/transition'

import {default as SceneKinematic} from './SceneKinematic/SceneKinematic'
import {onEnter as onEnterSceneKinematic, onExit as onExitSceneKinematic} from './SceneKinematic/transition'

import {default as SceneKinematic2} from './SceneKinematic2/SceneKinematic2'
import {onEnter as onEnterSceneKinematic2, onExit as onExitSceneKinematic2} from './SceneKinematic2/transition'

import {default as SceneStairs} from './SplitScreen/SceneStairs/SceneStairs'
import {onEnter as onEnterSceneStairs, onExit as onExitSceneStairs} from './SplitScreen/SceneStairs/transition'

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
  SCENEKINEMATIC2: {
    name:"SCENEKINEMATIC2",
    scene: SceneKinematic2,
    onEnter: onEnterSceneKinematic2,
    onExit: onExitSceneKinematic2,
  },
  SCENESTAIRS: {
    name:"SCENESTAIRS",
    scene: SceneStairs,
    onEnter: onEnterSceneStairs,
    onExit: onExitSceneStairs,
  },
}


