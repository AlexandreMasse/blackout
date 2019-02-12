
import {default as SceneBase} from './SceneBase/SceneBase'
import {onEnter as onEnterSceneBase, onExit as onExitSceneBase} from './SceneBase/transition'

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

import {default as SceneDoor} from './SplitScreen/SceneDoor/SceneDoor'
import {onEnter as onEnterSceneDoor, onExit as onExitSceneDoor} from './SplitScreen/SceneDoor/transition'

export default {
  SCENEBASE: {
    name:"SCENEBASE",
    scene: SceneBase,
    onEnter: onEnterSceneBase,
    onExit: onExitSceneBase,
  },
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
  SCENEDOOR: {
    name:"SCENEDOOR",
    scene: SceneDoor,
    onEnter: onEnterSceneDoor,
    onExit: onExitSceneDoor,
  },
}


