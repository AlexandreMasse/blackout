import React, {Component} from 'react'
import PropTypes from "prop-types"
import * as PIXI from "pixi.js";
//Step
import scenes from '../../scenes'

class SceneManager extends Component {

  constructor(props) {
    super(props)

    this.players = [
      "player1",
      "player2",
    ]

    this.scenesArray = Object.keys(scenes).map(i => scenes[i])

    this.currentSceneObjectArray = props.currentScene.map(currentScene => {
      return this.scenesArray.find(scene => scene.name === currentScene);
    })

    this.currentSceneInstanceArray = this.currentSceneObjectArray.map((currentSceneObject, index) => {
      return new currentSceneObject.scene({dispatch : props.dispatch, store: props.store, player: this.players[index]})
    })

    this.nextSceneObjectArray = [null, null];

    this.nextSceneInstanceArray = [null, null];

    this.app = null;

    this.init()
  }

  init() {
    const {parentRef, currentScene} = this.props

    let width = parentRef.clientWidth
    let height = parentRef.clientHeight

    this.app = new PIXI.Application(width, height, {backgroundColor: 0x000, antialias: false})

    parentRef.appendChild(this.app.view)

    this.app.ticker.add(this.renderScene.bind(this))

    this.currentSceneObjectArray.forEach((currentSceneObject, index) => {
      //enter animation
      currentSceneObject.onEnter(this.currentSceneInstanceArray[index])
      // add texture scene
      this.app.stage.addChild(this.currentSceneInstanceArray[index].sprite)
    })

    window.addEventListener('resize', this.onWindowResize, false)
  }

  renderScene() {
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

  calculWidthScene(pct) {
    const scenePlayer1 = this.currentSceneInstanceArray[0]
    const scenePlayer2 = this.currentSceneInstanceArray[1]
    scenePlayer1.splitScreen(pct)
    scenePlayer2.splitScreen(1 - pct)
  }



  changeScene(nextScene, index) {
    // check to prevent split screen activation error
    //if current scene index exist do transition
    if(this.currentSceneObjectArray[index]) {
      this.currentSceneObjectArray[index].onExit(this.currentSceneInstanceArray[index]).then(() => {
        if (nextScene) {
          this.nextScene(nextScene, index)
        } else {
          //if scene doesn't exist destroy and pop last scene
          this.currentSceneObjectArray.pop()
          this.currentSceneInstanceArray[index].sprite.destroy()
          this.currentSceneInstanceArray.pop()
        }
      })
    } else {
      // if scene index doesn't exist : create object and instance of missing scene
      this.currentSceneObjectArray[index] = this.scenesArray.find(scene => scene.name === this.props.currentScene[index])
      this.currentSceneInstanceArray[index] = new this.currentSceneObjectArray[index].scene({
        dispatch: this.props.dispatch,
        store: this.props.store,
        player: this.players[index]
      })
      // then go to next scene
      this.nextScene(nextScene, index)
    }
  }

  nextScene = (nextScene, index) => {
    const {dispatch, store} = this.props
    const player = this.players[index]

    this.nextSceneObjectArray[index] = this.scenesArray.find(scene => scene.name === nextScene);
    this.nextSceneInstanceArray[index] = new this.nextSceneObjectArray[index].scene({dispatch, store, player})
    this.app.stage.addChild(this.nextSceneInstanceArray[index].sprite)
    this.nextSceneObjectArray[index].onEnter(this.nextSceneInstanceArray[index]).then(() => {
    })
    this.currentSceneInstanceArray[index].sprite.destroy()
    this.currentSceneInstanceArray[index] = this.nextSceneInstanceArray[index]
    this.nextSceneInstanceArray[index] = null
  }

  updateStore = (store) => {
    this.currentSceneInstanceArray.forEach(currentSceneInstance => {
      currentSceneInstance.updateStore(store)
    })
    this.nextSceneInstanceArray.forEach(nextSceneInstance => {
      if(nextSceneInstance) nextSceneInstance.updateStore(store)
    })
  }

  componentWillReceiveProps(nextProps, nextContext) {

    //update store if it change
    if(nextProps.store !== this.props.store) {
      this.updateStore(nextProps.store)
    }

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // update first scene if number of scene change or scene change
    if (
      prevProps.currentScene.length !== this.props.currentScene.length ||
      prevProps.currentScene[0] !== this.props.currentScene[0]
    ) {
      this.changeScene(this.props.currentScene[0], 0)
    }
    // update second scene if number of scene change or scene change
    if (
      prevProps.currentScene.length !== this.props.currentScene.length ||
      prevProps.currentScene[1] !== this.props.currentScene[1]
    ) {
      // console.log(">>>>", this.props.currentScene);
      // console.log(">>>>", this.props.currentScene[1]);
      this.changeScene(this.props.currentScene[1], 1)
    }

    // update player 1 scene split screen percentage
    if (
      prevProps.store.users.find((user) => user.id === 'player1').splitScreenPercentage !==
      this.props.store.users.find((user) => user.id === 'player1').splitScreenPercentage 
    ) {
      this.calculWidthScene(this.props.store.users.find((user) => user.id === 'player1').splitScreenPercentage)
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

