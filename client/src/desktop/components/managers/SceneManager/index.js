import React, {Component} from 'react'
import PropTypes from "prop-types"
import * as PIXI from "pixi.js"
import * as THREE from 'three'
//Step
import scenes from '../../scenes'

import {TweenMax, TimelineMax, Power2} from 'gsap'

import {RollingNumber} from "../../../../mobile/components/components"
import {LottieAnimation} from "../../components";
import classNames from "classnames";
import animations from "../../components/LottieAnimation/animations";

//style
import "./SceneManager.scss"
import {Transition} from "react-transition-group";

class SceneManager extends Component {

  constructor(props) {
    super(props)

    this.players = [
      "player1",
      "player2",
    ]

    this.player1SplitScreenPourcentage = props.store.users.find(user => user.id === "player1").splitScreenPercentage

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
    this.firstSplitAppear = true
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

    if (this.firstSplitAppear) {
      scenePlayer1.enterAnimation(pct)
      scenePlayer2.enterAnimation(pct)
      TweenMax.to(this.margeSplitScreen, 2, {
        x: (window.innerWidth * pct) - this.margeSplitScreen.width / 2
      })
      this.margeSplitScreen.visible = true
      this.margeSplitScreen.alpha = 1
      this.firstSplitAppear = false
    } else {
      if (scenePlayer1) {
        scenePlayer1.splitScreen(pct)
      }

      if (scenePlayer2) {
        scenePlayer2.splitScreen(1 - pct)
      }

    TweenMax.to(this.refScene1,1, {
      x: (window.innerWidth * pct) / 2 - this.refScene1.clientWidth / 2,
    })

    TweenMax.to(this.refScene2, 1, {
       x: (window.innerWidth * pct) / 2,
    })

    TweenMax.to(this, 1, {
      player1SplitScreenPourcentage: pct,
      onUpdate: () => {
        this.refScene1.style.clipPath = `inset(0 calc(${(0.5 - (this.player1SplitScreenPourcentage * 0.5)) * 100}% + 2px) 0 ${(0.5 - (this.player1SplitScreenPourcentage * 0.5)) * 100}%)`
        this.refScene2.style.clipPath = `inset(0 ${(this.player1SplitScreenPourcentage - (0.5 * this.player1SplitScreenPourcentage)) * 100}% 0 calc(${(this.player1SplitScreenPourcentage - (0.5 * this.player1SplitScreenPourcentage)) * 100}% + 0px))`
      }
    })

      TweenMax.to(this.margeSplitScreen, 1, {
        x: (window.innerWidth * pct) - this.margeSplitScreen.width / 2
      })
    }
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


  onExitRollingNumber = (html) => {
    TweenMax.to(html, 4, {
      opacity: 0
    })
  }

  onEnterDoorCircle = (html) => {
    const timeline = new TimelineMax()

    timeline
      .set(html, {
        opacity: 0
      })
      .to(html, 3, {
        opacity: 1,
        ease: Power2.easeInOut
      }, "+=2")
  }

  onEnterRollingNumber = (html) => {
    const timeline = new TimelineMax()

    timeline
      .set(html, {
        opacity: 0
      })
      .to(html, 3, {
        opacity: 1,
        ease: Power2.easeInOut
      }, "+=2")
  }

  onExitDoorCircle = (html) => {
    TweenMax.to(html, 4, {
      opacity: 0
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

  componentDidMount() {

    const player1SplitSCreenPoucentage = this.props.store.users.find(user => user.id === "player1").splitScreenPercentage

    TweenMax.to(this.refScene2, 1, {
      x: window.innerWidth / 2 + (window.innerWidth * player1SplitSCreenPoucentage) / 2 - this.refScene1.clientWidth,
      // x: (window.innerWidth * pct) - this.refScene2.clientWidth / 2,
    })
  }


  render() {
    const {store} = this.props

    const player1 = store.users.find(user => user.id === "player1")
    const player2 = store.users.find(user => user.id === "player2")

    return (
      <>
        <div ref={ref => this.refScene1 = ref} className="scene-manager__player1" style={{
          width: window.innerWidth,
        }}>

          <Transition
            in={store.isSplitScreen && player1.currentScene === scenes.SCENEDOOR.name && player1.fingerprint && player1.status === "inferior"}
            timeout={{enter: 10, exit: 5000}}
            appear={true}
            mountOnEnter={true}
            unmountOnExit={true}
            onEnter={this.onEnterRollingNumber}
            onExit={this.onExitRollingNumber}
          >
            <RollingNumber className={"desktop"} numbers={player1.code}/>
          </Transition>

          {/*{player1.currentScene === scenes.SCENEDOOR.name && player1.fingerprint && player1.status === "inferior" &&*/}
            {/*<RollingNumber className={"desktop"} numbers={player1.code}/>*/}
          {/*}*/}


          <Transition
            in={store.isSplitScreen && player1.currentScene === scenes.SCENEDOOR.name && player1.fingerprint && player1.status === "superior"}
            timeout={{enter: 10, exit: 5000}}
            appear={true}
            mountOnEnter={true}
            unmountOnExit={true}
            onEnter={this.onEnterDoorCircle}
            onExit={this.onExitDoorCircle}
          >
            <LottieAnimation
              autoplay={false}
              loop={false}
              play={false}
              className={classNames("")}
              animationData={animations.DoorCircle}
              aspectRatio={"cover"}
              progressionTweenDuration={0.1}
              progression={player1.handle}
            />
          </Transition>


          {/*{player1.currentScene === scenes.SCENEDOOR.name && player1.fingerprint && player1.status === "superior" &&*/}
            {/*<LottieAnimation*/}
              {/*autoplay={false}*/}
              {/*loop={false}*/}
              {/*play={false}*/}
              {/*className={classNames("")}*/}
              {/*animationData={animations.DoorCircle}*/}
              {/*aspectRatio={"contain"}*/}
              {/*progressionTweenDuration={0.1}*/}
              {/*progression={player1.handle}*/}
            {/*/>*/}
          {/*}*/}

        </div>

        <div ref={ref => this.refScene2 = ref} className="scene-manager__player2" style={{
          width: window.innerWidth,
          height: window.innerHeight,
        }}>

          <Transition
            in={store.isSplitScreen && player2.currentScene === scenes.SCENEDOOR.name && player2.fingerprint && player2.status === "inferior"}
            timeout={{enter: 10, exit: 5000}}
            appear={true}
            mountOnEnter={true}
            unmountOnExit={true}
            onEnter={this.onEnterRollingNumber}
            onExit={this.onExitRollingNumber}
          >
            <RollingNumber className={"desktop"} numbers={player2.code}/>
          </Transition>


          {/*{player2.currentScene === scenes.SCENEDOOR.name && player2.fingerprint && player2.status === "inferior" &&*/}
            {/*<RollingNumber className={"desktop"} numbers={player2.code}/>*/}
          {/*}*/}


          <Transition
            in={store.isSplitScreen && player2.currentScene === scenes.SCENEDOOR.name && player2.fingerprint && player2.status === "superior"}
            timeout={{enter: 10, exit: 5000}}
            appear={true}
            mountOnEnter={true}
            unmountOnExit={true}
            onEnter={this.onEnterDoorCircle}
            onExit={this.onExitDoorCircle}
          >
            <LottieAnimation
              autoplay={false}
              loop={false}
              play={false}
              className={classNames("")}
              animationData={animations.DoorCircle}
              aspectRatio={"cover"}
              progressionTweenDuration={0.1}
              progression={player2.handle}
            />
          </Transition>

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

