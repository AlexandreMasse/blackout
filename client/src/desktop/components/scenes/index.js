import React from 'react'

import {default as Scene1} from './Scene1/Scene1'
import {onEnter as onEnterScene1, onExit as onExitScene1} from './Scene1/transition'

import {default as Scene2} from './Scene2/Scene2'
import {onEnter as onEnterScene2, onExit as onExitScene2} from './Scene2/transition'


export default {
  SCENE1: {
    name:"SCENE1",
    scene: Scene1,
    onEnter: onEnterScene1,
    onExit: onExitScene1,
  },
  SCENE2: {
    name:"SCENE2",
    scene: Scene2,
    onEnter: onEnterScene2,
    onExit: onExitScene2,
  },
}


