import React, {Component} from 'react'
import PropTypes from "prop-types"
import * as PIXI from "pixi.js";
//Step
import scenes from '../../scenes'

class SceneManager extends Component {

  constructor(props) {
    super(props)
    this.scenesArray = Object.keys(scenes).map(i => scenes[i])

    //
    //this.currentSceneObject = this.scenesArray.find(scene => scene.name === props.currentScene[0]);

    this.currentSceneObjectArray = props.currentScene.map(currentScene => {
      return this.scenesArray.find(scene => scene.name === currentScene);
    })

    //
    //this.currentSceneInstance = new this.currentSceneObject.scene()

    this.currentSceneInstanceArray = this.currentSceneObjectArray.map(currentSceneObject => {
      return new currentSceneObject.scene({dispatch : props.dispatch})
    })

    console.log("instance array", this.currentSceneInstanceArray);

    //
    //this.nextSceneObject = null;

    this.nextSceneObjectArray = [null, null];

    //
    //this.nextSceneInstance = null;

    this.nextSceneInstanceArray = [null, null];

    //
    // if (props.currentScene.length > 1) {
    //   this.currentScene2Object = this.scenesArray.find(scene => scene.name === props.currentScene[1]);
    //   this.currentScene2Instance = new this.currentScene2Object.scene()
    //
    //   this.nextScene2Object = null;
    //   this.nextScene2Instance = null;
    // }

    this.app = null;

    this.init()
  }

  init() {
    const {parentRef, currentScene} = this.props

    let width = parentRef.clientWidth
    let height = parentRef.clientHeight

    this.app = new PIXI.Application(width, height, {backgroundColor: 0xD5D5D5})

    parentRef.appendChild(this.app.view)

    //TODO ?
    this.app.ticker.add(this.renderScene.bind(this))

    //
    //this.currentSceneObject.onEnter(this.currentSceneInstance)

    //
    //this.app.stage.addChild(this.currentSceneInstance.sprite)

    this.currentSceneObjectArray.forEach((currentSceneObject, index) => {
      //enter animation
      currentSceneObject.onEnter(this.currentSceneInstanceArray[index])
      // add texture scene
      this.app.stage.addChild(this.currentSceneInstanceArray[index].sprite)
    })

    //
    // if (currentScene.length > 1) {
    //   this.currentScene2Object.onEnter(this.currentScene2Instance)
    //   // add textire scene
    //   this.app.stage.addChild(this.currentScene2Instance.sprite)
    // }

    window.addEventListener('resize', this.onWindowResize, false)
  }

  renderScene(delta) {
    const {currentScene} = this.props

    //
    // this.app.renderer.render(this.currentSceneInstance.container, this.currentSceneInstance.rt)
    // if (this.currentSceneInstance.needUpdate) {
    //   this.currentSceneInstance.update()
    // }

    this.currentSceneInstanceArray.forEach(currentSceneInstance => {
      this.app.renderer.render(currentSceneInstance.container, currentSceneInstance.rt)
      if (currentSceneInstance.needUpdate) {
        currentSceneInstance.update()
      }
    })

    //
    // if (this.nextSceneInstance) {
    //   this.app.renderer.render(this.nextSceneInstance.container, this.nextSceneInstance.rt)
    //   if (this.nextSceneInstance.needUpdate) {
    //     this.nextSceneInstance.update()
    //   }
    // }

    // required only if nextScene enter before currentScene exited
    this.nextSceneInstanceArray.forEach(nextSceneInstance => {
      if (nextSceneInstance) {
        this.app.renderer.render(nextSceneInstance.container, nextSceneInstance.rt)
        if (nextSceneInstance.needUpdate) {
          nextSceneInstance.update()
        }
      }
    })


    //
    // if (currentScene.length > 1) {
    //   this.app.renderer.render(this.currentScene2Instance.container, this.currentScene2Instance.rt)
    //   if (this.currentScene2Instance.needUpdate) {
    //     this.currentScene2Instance.update()
    //   }
    //
    //   // required only if nextScene enter before currentScene exited
    //   if (this.nextScene2Instance) {
    //     this.app.renderer.render(this.nextScene2Instance.container, this.nextScene2Instance.rt)
    //     if (this.nextScene2Instance.needUpdate) {
    //       this.nextScene2Instance.update()
    //     }
    //   }
    // }

  }

  onWindowResize = () => {
    const {parentRef} = this.props
    this.app.renderer.resize(parentRef.clientWidth, parentRef.clientHeight)
  }

  changeScene(nextScene, index) {
    console.log("changeScene");

    //
    // this.currentSceneObject.onExit(this.currentSceneInstance).then(() => {
    //   this.nextScene(nextScene)
    //   this.currentSceneInstance.sprite.destroy()
    //   this.currentSceneInstance = this.nextSceneInstance
    //   this.nextSceneInstance = null
    // })

    this.currentSceneObjectArray[index].onExit(this.currentSceneInstanceArray[index]).then(() => {
      this.nextScene(nextScene, index)
      this.currentSceneInstanceArray[index].sprite.destroy()
      this.currentSceneInstanceArray[index] = this.nextSceneInstanceArray[index]
      this.nextSceneInstanceArray[index] = null
    })
  }

  nextScene = (nextScene, index) => {
    console.log("nextScene");

    //
    // this.nextSceneObject = this.scenesArray.find(scene => scene.name === nextScene);
    // this.nextSceneInstance = new this.nextSceneObject.scene()
    // this.app.stage.addChild(this.nextSceneInstance.sprite)
    // this.nextSceneObject.onEnter(this.nextSceneInstance).then(() => {
    // })

    this.nextSceneObjectArray[index] = this.scenesArray.find(scene => scene.name === nextScene);
    this.nextSceneInstanceArray[index] = new this.nextSceneObjectArray[index].scene({dispatch: this.props.dispatch})
    this.app.stage.addChild(this.nextSceneInstanceArray[index].sprite)
    this.nextSceneObjectArray[index].onEnter(this.nextSceneInstanceArray[index]).then(() => {
    })
  }

  componentWillReceiveProps(nextProps, nextContext) {

    if (nextProps.currentScene[0] !== this.props.currentScene[0]) {
      this.changeScene(nextProps.currentScene[0], 0)
    }
    if (nextProps.currentScene[1] !== this.props.currentScene[1]) {
      this.changeScene(nextProps.currentScene[1], 1)
    }
  }

  render() {
    return null
  }
}

SceneManager.propTypes = {
  currentScene: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.any.isRequired,
  parentRef: PropTypes.any.isRequired,
}
SceneManager.defaultProps = {}

export default SceneManager

