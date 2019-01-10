import React, {Component} from 'react'
import PropTypes from "prop-types"
import * as PIXI from "pixi.js";
import {TweenMax} from 'gsap'
//Step
import scenes from '../../scenes'


class SceneManager extends Component {

  constructor(props) {
    super(props)
    this.scenesArray = Object.keys(scenes).map(i => scenes[i])

    this.currentSceneClass = this.scenesArray.filter(scene => scene.name === props.currentScene)[0].scene;
    this.currentSceneInstance = new this.currentSceneClass()
    this.init()
  }

  init() {
    let width = window.innerWidth
    let height = window.innerHeight

    this.app = new PIXI.Application(width, height, {autoResize: true, backgroundColor: 0x000})

    this.props.parentRef.appendChild(this.app.view)

    this.app.ticker.add(this.renderScene.bind(this))

    // add textire scene
    this.app.stage.addChild(this.currentSceneInstance.sprite)

    window.addEventListener('resize', this.onWindowResize.bind(this), false)

  }

  renderScene(delta) {

    //if transition

    this.app.renderer.render(this.currentSceneInstance.container, this.currentSceneInstance.rt)
    if (this.currentSceneInstance.needUpdate) {
      this.currentSceneInstance.update()
    }

    if (this.nextSceneInstance) {
      this.app.renderer.render(this.nextSceneInstance.container, this.nextSceneInstance.rt)
      if (this.nextSceneInstance.needUpdate) {
        this.nextSceneInstance.update()
      }
    }
  }

  onWindowResize() {
    this.app.renderer.resize(window.innerWidth, window.innerHeight)
  }

  changeScene(nextScene) {
    console.log("change scene", nextScene);
    const nextSceneClass = this.scenesArray.filter(scene => scene.name === nextScene)[0].scene;
    this.nextSceneInstance = new nextSceneClass()
    this.app.stage.addChild(this.nextSceneInstance.sprite)
    this.nextSceneInstance.sprite.alpha = 0

    TweenMax.to(this.currentSceneInstance.sprite, 1, {
      alpha: 0, onComplete: () => {
        console.log("oncomplete");
        this.nextScene()
      }
    })
  }

  // TODO A REMPLACER PAR UNE TIMELINE
  nextScene = () => {
    TweenMax.to(this.nextSceneInstance.sprite, 1, {
      alpha: 1, onComplete: () => {
        this.currentSceneInstance.sprite.destroy()
        this.currentSceneInstance = this.nextSceneInstance
        this.nextSceneInstance = null
        console.log(this.app.stage)
      }
    })
  }


  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.currentScene !== this.props.currentScene) {
      this.changeScene(nextProps.currentScene)
    }
  }

  render() {
    const {currentScene} = this.props;


    // if(!currentScene) return null
    //
    // const currentSceneClass = this.scenesArray.filter(scene => scene.name === currentScene)[0].scene;
    //
    // currentSceneClass.init()
    //
    // console.log("needUpdate ?", currentSceneClass.sceneInfo.needUpdate);

    return null
  }
}

SceneManager.propTypes = {
  currentScene: PropTypes.string,
  parentRef: PropTypes.any.isRequired,
}
SceneManager.defaultProps = {
  currentScene: null,
}

export default SceneManager

