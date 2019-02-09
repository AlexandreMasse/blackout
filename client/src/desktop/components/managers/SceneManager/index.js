import React, {Component} from 'react'
import PropTypes from "prop-types"
import * as PIXI from "pixi.js"
import * as THREE from 'three'
//Step
import scenes from '../../scenes'

import {TweenMax} from 'gsap'

import {RollingNumber} from "../../../../mobile/components/components"
import {LottieAnimation} from "../../components";
import classNames from "classnames";
import animations from "../../components/LottieAnimation/animations";

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
      return new currentSceneObject.scene({dispatch : props.dispatch, store: props.store, player: this.players[index], renderer2D: this.renderer2D})
    })

    this.nextSceneObjectArray = [null, null]

    this.nextSceneInstanceArray = [null, null]

    this.app = null
    const {parentRef} = this.props

    this.canvasObj = {
        el: parentRef.querySelector('.canvas'),
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: 1
    }
    // this.initThree()
    this.initPIXI()
    // this.init()
    this.isSplitActive = false
    this.setMargeSplitScreen()
  }

  initPIXI() {
    this.renderer2D = new PIXI.autoDetectRenderer(this.canvasObj.width, this.canvasObj.height, {
        backgroundColor: 0x000000,
        view: this.canvasObj.el
    })
    this.stage = new PIXI.Container()
    this.ticker = new PIXI.ticker.Ticker()
    this.ticker.start()

    // setup interaction
    this.interaction = new PIXI.interaction.InteractionManager({
        root: this.stage,
        ticker: this.ticker,
        view: this.renderer2D.view
    })

    this.ticker.add(this.renderScene.bind(this))

    this.currentSceneObjectArray.forEach((currentSceneObject, index) => {
      //enter animation
      currentSceneObject.onEnter(this.currentSceneInstanceArray[index])
      // add texture scene
      this.stage.addChild(this.currentSceneInstanceArray[index].sprite)
    })

  }

  init() {
    const {parentRef, currentScene} = this.props

    let width = parentRef.clientWidth
    let height = parentRef.clientHeight

    this.app = new PIXI.Application(width, height, {backgroundColor: 0x000000, antialias: false})

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
      this.renderer2D.render(currentSceneInstance.container, currentSceneInstance.rt)
      if (currentSceneInstance.needUpdate) {
        currentSceneInstance.update()
      }
    })

    // required only if nextScene enter before currentScene exited
    this.nextSceneInstanceArray.forEach(nextSceneInstance => {
      if (nextSceneInstance) {
        this.renderer2D.render(nextSceneInstance.container, nextSceneInstance.rt)
        if (nextSceneInstance.needUpdate) {
          nextSceneInstance.update()
        }
      }
    })

    this.renderer2D.render(this.stage)
  }

  onWindowResize = () => {
    const {parentRef} = this.props
    this.renderer2D.resize(parentRef.clientWidth, parentRef.clientHeight)
  }

  calculWidthScene(pct) {
    const scenePlayer1 = this.currentSceneInstanceArray[0]
    const scenePlayer2 = this.currentSceneInstanceArray[1]
    
    if (scenePlayer1) {
      scenePlayer1.splitScreen(pct)
    }

    if (scenePlayer2) {
      scenePlayer2.splitScreen(1 - pct)
    }

    TweenMax.to(this.refScene1,0.5, {
      x: (window.innerWidth * pct) / 2 - this.refScene1.clientWidth / 2,
    })

    this.refScene1.style.clipPath = `inset(0 ${(0.5 - pct) * 100}% 0 ${(0.5 - pct) * 100}%)`

    TweenMax.to(this.refScene2, 0.5, {
      x: window.innerWidth / 2 + (window.innerWidth * pct) / 2 - this.refScene1.clientWidth / 2,
    })

    this.refScene2.style.clipPath = `inset(0 ${(pct - 0.5) * 100}% 0 ${(pct - 0.5) * 100}%)`
    if (!this.isSplitActive) {
      this.margeSplitScreen.visible = true
      this.margeSplitScreen.alpha = 1
    }
    this.isSplitActive = true

    TweenMax.to(this.margeSplitScreen, 1, {
      x: (window.innerWidth * pct) - this.margeSplitScreen.width / 2
    })
  }

  setMargeSplitScreen() {
    this.margeSplitScreen = new PIXI.Graphics()
    this.margeSplitScreen.beginFill(0xffffff)
    this.margeSplitScreen.drawRect(0, 0, 6, window.innerHeight)
    this.margeSplitScreen.endFill()
    this.margeSplitScreen.visible = false
    this.margeSplitScreen.alpha = 0
    this.stage.addChild(this.margeSplitScreen)
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
        player: this.players[index],
        renderer2D: this.renderer2D,
    
      })
      // then go to next scene
      this.nextScene(nextScene, index)
    }
  }

  nextScene = (nextScene, index) => {
    const {dispatch, store} = this.props
    const player = this.players[index]

    this.nextSceneObjectArray[index] = this.scenesArray.find(scene => scene.name === nextScene);
    this.nextSceneInstanceArray[index] = new this.nextSceneObjectArray[index].scene({dispatch, store, player, renderer2D: this.renderer2D})
    this.stage.addChild(this.nextSceneInstanceArray[index].sprite)
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
    const {store} = this.props;

    const player1 = store.users.find(user => user.id === "player1")
    const player2 = store.users.find(user => user.id === "player2")

    return (
      <>
        <div ref={ref => this.refScene1 = ref} className="scene1" style={{
          opacity: "1",
          transition: "clip-path 1s",
          backgroundColor:"rgba(20, 200, 170, 0.4)",
          position:"fixed",
          display: "flex",
          top: 0,
          width: window.innerWidth / 2,
          height: window.innerHeight,
          zIndex: 3,
          visibility: "hidden"
        }}>

        {/*<div className="child" style={{*/}
            {/*background: "linear-gradient(to right, red, blue)",*/}
            {/*position: "absolute",*/}
            {/*left: "50%",*/}
            {/*top: "50%",*/}
            {/*width: "100%",*/}
            {/*height: "5rem",*/}
            {/*transform: "translate3d(-50%, -50%, 0)",*/}
          {/*}}/>*/}

          {player1.status === "inferior" &&
            <RollingNumber className={"desktop"} numbers={player1.code}/>
          }

          <p className={"handle-progression"} style={{
            fontSize: "5rem",
            color: "blue",
            position: "absolute",
            left: "50%",
            top: "80%",
            transform: 'translateX(-50%) translateY(-50%)'
          }}>{player1.handle}</p>


        </div>

        <div ref={ref => this.refScene2 = ref} className="scene2" style={{
          opacity: "1",
          transition: "clip-path 1s",
          backgroundColor:"rgba(200, 100, 80, 0.4)",
          position:"fixed",
          top: 0,
          width: window.innerWidth / 2,
          height: window.innerHeight,
          transform: `translateX(${window.innerWidth / 2}px)`,
          zIndex: 3,
          visibility: "hidden"
        }}>
        {/*<div className="child" style={{*/}
            {/*// background: "linear-gradient(to right, red, blue)",*/}
            {/*position: "absolute",*/}
            {/*left: "50%",*/}
            {/*top: "50%",*/}
            {/*width: "100%",*/}
            {/*height: "5rem",*/}
            {/*transform: "translate3d(-50%, -50%, 0)",*/}
          {/*}}/>*/}

          {player2.status === "inferior" &&
            <RollingNumber className={"desktop"} numbers={player2.code}/>
          }

          <LottieAnimation
            autoplay={false}
            loop={false}
            play={false}
            className={classNames("")}
            animationData={animations.DoorCircle}
            aspectRatio={"contain"}
            progressionTweenDuration={0.1}
            progression={player2.handle}
          />
        </div>
      </>
    )
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

