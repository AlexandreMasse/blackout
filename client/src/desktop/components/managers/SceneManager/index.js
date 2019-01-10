import React, {Component} from 'react'
import PropTypes from "prop-types"
import * as PIXI from "pixi.js";
//Step
import scenes from '../../scenes'

class SceneManager extends Component {

  constructor(props) {
    super(props)
    this.scenesArray = Object.keys(scenes).map(i => scenes[i])

    this.currentSceneObject = this.scenesArray.find(scene => scene.name === props.currentScene);
    this.currentSceneInstance = new this.currentSceneObject.scene()

    this.nextSceneObject = null;
    this.nextSceneInstance = null;

    this.app = null;

    this.init()
  }

  init() {
    let width = window.innerWidth
    let height = window.innerHeight

    this.app = new PIXI.Application(width, height, {autoResize: true, backgroundColor: 0x000})

    this.props.parentRef.appendChild(this.app.view)

    this.app.ticker.add(this.renderScene.bind(this))

    this.currentSceneObject.onEnter(this.currentSceneInstance)

    // add textire scene
    this.app.stage.addChild(this.currentSceneInstance.sprite)

    window.addEventListener('resize', this.onWindowResize, false)
  }

  renderScene(delta) {

    this.app.renderer.render(this.currentSceneInstance.container, this.currentSceneInstance.rt)
    if (this.currentSceneInstance.needUpdate) {
      this.currentSceneInstance.update()
    }

    // required only if nextScene enter before currentScene exited
    if (this.nextSceneInstance) {
      this.app.renderer.render(this.nextSceneInstance.container, this.nextSceneInstance.rt)
      if (this.nextSceneInstance.needUpdate) {
        this.nextSceneInstance.update()
      }
    }
  }

  onWindowResize = () => {
    this.app.renderer.resize(window.innerWidth, window.innerHeight)
  }

  changeScene(nextScene) {
    console.log("changeScene");
    this.currentSceneObject.onExit(this.currentSceneInstance).then(() => {
      this.nextScene(nextScene)
      this.currentSceneInstance.sprite.destroy()
      this.currentSceneInstance = this.nextSceneInstance
      this.nextSceneInstance = null
    })
  }

  nextScene = (nextScene) => {
    console.log("nextScene");
    this.nextSceneObject = this.scenesArray.find(scene => scene.name === nextScene);
    this.nextSceneInstance = new this.nextSceneObject.scene()
    this.app.stage.addChild(this.nextSceneInstance.sprite)
    this.nextSceneObject.onEnter(this.nextSceneInstance).then(() => {
    })
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.currentScene !== this.props.currentScene) {
      this.changeScene(nextProps.currentScene)
    }
  }

  render() {
    return null
  }
}

SceneManager.propTypes = {
  currentScene: PropTypes.string.isRequired,
  parentRef: PropTypes.any.isRequired,
}
SceneManager.defaultProps = {
}

export default SceneManager

