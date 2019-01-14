import React, {Component} from 'react'
import PropTypes from "prop-types"
import * as PIXI from "pixi.js";
//Step
import scenes from '../../scenes'

class SceneManager extends Component {

  constructor(props) {
    super(props)
    this.scenesArray = Object.keys(scenes).map(i => scenes[i])

    this.currentSceneObjectArray = props.currentScene.map(currentScene => {
      return this.scenesArray.find(scene => scene.name === currentScene);
    })

    this.currentSceneInstanceArray = this.currentSceneObjectArray.map(currentSceneObject => {
      return new currentSceneObject.scene({dispatch : props.dispatch, store: props.store})
    })

    console.log("instance array", this.currentSceneInstanceArray);


    this.nextSceneObjectArray = [null, null];


    this.nextSceneInstanceArray = [null, null];


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

    this.currentSceneObjectArray.forEach((currentSceneObject, index) => {
      //enter animation
      currentSceneObject.onEnter(this.currentSceneInstanceArray[index])
      // add texture scene
      this.app.stage.addChild(this.currentSceneInstanceArray[index].sprite)
    })

    window.addEventListener('resize', this.onWindowResize, false)
  }



  renderScene(delta) {
    const {currentScene} = this.props


    this.currentSceneInstanceArray.forEach(currentSceneInstance => {
      this.app.renderer.render(currentSceneInstance.container, currentSceneInstance.rt)
      if (currentSceneInstance.needUpdate) {
        currentSceneInstance.update()
      }
    })

    // required only if nextScene enter before currentScene exited
    this.nextSceneInstanceArray.forEach(nextSceneInstance => {
      if (nextSceneInstance) {
        this.app.renderer.render(nextSceneInstance.container, nextSceneInstance.rt)
        if (nextSceneInstance.needUpdate) {
          nextSceneInstance.update()
        }
      }
    })

  }

  onWindowResize = () => {
    const {parentRef} = this.props
    this.app.renderer.resize(parentRef.clientWidth, parentRef.clientHeight)
  }

  changeScene(nextScene, index) {
    console.log("changeScene", this.currentSceneObjectArray);

    this.currentSceneObjectArray[index].onExit(this.currentSceneInstanceArray[index]).then(() => {
      this.nextScene(nextScene, index)
      this.currentSceneInstanceArray[index].sprite.destroy()
      this.currentSceneInstanceArray[index] = this.nextSceneInstanceArray[index]
      this.nextSceneInstanceArray[index] = null
    })
  }

  nextScene = (nextScene, index) => {
    console.log("nextScene");

    this.nextSceneObjectArray[index] = this.scenesArray.find(scene => scene.name === nextScene);
    this.nextSceneInstanceArray[index] = new this.nextSceneObjectArray[index].scene({dispatch: this.props.dispatch, store: this.props.store})
    this.app.stage.addChild(this.nextSceneInstanceArray[index].sprite)
    this.nextSceneObjectArray[index].onEnter(this.nextSceneInstanceArray[index]).then(() => {
    })
  }

  updateStore = (store) => {
    console.log("store",store);
    this.currentSceneInstanceArray.forEach(currentSceneInstance => {
      currentSceneInstance.store = store
    })
    this.nextSceneInstanceArray.forEach(nextSceneInstance => {
      if(nextSceneInstance) nextSceneInstance.store = store
    })
  }

  componentWillReceiveProps(nextProps, nextContext) {

    console.log("currentSCene array :", nextProps.currentScene);

    if (nextProps.currentScene.length !== this.props.currentScene.length) {
      //TODO : wip
      this.currentSceneObjectArray = nextProps.currentScene.map(currentScene => {
        return this.scenesArray.find(scene => scene.name === currentScene);
      })
    }

    if (nextProps.currentScene[0] !== this.props.currentScene[0]) {
      this.changeScene(nextProps.currentScene[0], 0)
    }

    if (nextProps.currentScene[1] && nextProps.currentScene[1] !== this.props.currentScene[1]) {
      this.changeScene(nextProps.currentScene[1], 1)
    }

    if(nextProps.store !== this.props.store) {
      this.updateStore(nextProps.store)
    }
  }

  render() {
    return null
  }
}

SceneManager.propTypes = {
  currentScene: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  parentRef: PropTypes.any.isRequired,
  store: PropTypes.object.isRequired,
}
SceneManager.defaultProps = {}

export default SceneManager

