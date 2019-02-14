import React, {Component} from 'react'
import PropTypes from "prop-types"
import * as PIXI from "pixi.js"
// import * as THREE from 'three'
//redux
import {setPlayer1SplitScreenPercentage, setCurrentStep, setUserIndicationActive} from "../../../redux/actions/desktopAction"
import {wsEmitCurrentStep} from '../../../redux/actions/websockets/websocketsAction'

//Steps
import steps from '../../steps'
//Scene
import scenes from '../../scenes'
//lib
import {TweenMax, TimelineMax, Power2} from 'gsap'
import classNames from "classnames";
import {Transition} from "react-transition-group";
//components
import {RollingNumber} from "../../../../mobile/components/components"
import {LottieAnimation} from "../../components";
import animations from "../../components/LottieAnimation/animations";
//style
import "./SceneManager.scss"
//utils
import {requestTimeout, clearRequestTimeout} from "../../../../utils";

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


    this.player1SplitScreenPourcentage = props.store.users.find(user => user.id === "player1").splitScreenPercentage

    this.splitScreenPercentageBeforeHandle = null
    this.handlePourcentage = null

    this.overlayMinDuration = 0.22
    this.overlayMaxDuration = 2.5

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
    this.soundHandle = true
    this.setMargeSplitScreen()
  }

  initPIXI() {
    this.renderer2D = new PIXI.autoDetectRenderer(this.canvasObj.width, this.canvasObj.height, {
        backgroundColor: 0x000000,
        view: this.canvasObj.el,
        resolution:window.devicePixelRatio
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

    TweenMax.to(this, 1, {
      player1SplitScreenPourcentage: pct,
      onUpdate: () => {
        // this.refScene1.style.width = `calc(${this.player1SplitScreenPourcentage * window.innerWidth}px - 3px)`
        // this.refScene2.style.width = `${(1 - this.player1SplitScreenPourcentage) * window.innerWidth}px`
        TweenMax.set(this.refScene1, {scaleX: this.player1SplitScreenPourcentage, x: -3})
        if(this.player1SplitScreenPourcentage > 0) {
          TweenMax.set(this.refScene1.querySelector(".scene-manager__player1__wrapper"), {scaleX: 1 / this.player1SplitScreenPourcentage})
        }

        TweenMax.set(this.refScene2, {x: window.innerWidth * this.player1SplitScreenPourcentage, scaleX: 1 - this.player1SplitScreenPourcentage})
        if (this.player1SplitScreenPourcentage < 1) {
          TweenMax.set(this.refScene2.querySelector(".scene-manager__player2__wrapper"), {scaleX: 1 / (1 - this.player1SplitScreenPourcentage)})
        }

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

  onStairProgression1 = (stairProgressionPlayer1) => {
      let stairProgressionPlayer2 = this.props.store.users.find(user => user.id === "player2").stairsProgression
      let advantage = stairProgressionPlayer1 - stairProgressionPlayer2
      // console.log('ADVANTAGE ===', advantage)
      let currentSplitScreenPercentage = .5
      const splitScreenPercentage = currentSplitScreenPercentage + advantage
      this.props.dispatch(setPlayer1SplitScreenPercentage({splitScreenPercentage}))
  }

  onStairProgression2 = (stairProgressionPlayer2) => {
      let stairProgressionPlayer1 = this.props.store.users.find(user => user.id === "player1").stairsProgression
      let advantage = stairProgressionPlayer1 - stairProgressionPlayer2
      let currentSplitScreenPercentage = .5
      const splitScreenPercentage = currentSplitScreenPercentage + advantage
      this.props.dispatch(setPlayer1SplitScreenPercentage({splitScreenPercentage}))
  }


  // handle

  onReceiveHandle = (handle, player) => {
    this.handlePourcentage = handle
    if (this.splitScreenPercentageBeforeHandle !== null) {
      const isPlayer1 = player === "player1"
      const handlePourcentage = handle * (1 - this.splitScreenPercentageBeforeHandle)
      const splitScreenPercentage = isPlayer1 ? this.splitScreenPercentageBeforeHandle + handlePourcentage : (1 - this.splitScreenPercentageBeforeHandle) - handlePourcentage;
      this.props.dispatch(setPlayer1SplitScreenPercentage({splitScreenPercentage}))

      // TODO: play sound when handle is 80%
      if(handle >= 0.98) {
        if (this.soundHandle) {
          this.currentSceneInstanceArray.forEach((scene) => {
            if (scene.isSceneDoor && scene.isUserAdvantage) {
              scene.playDoorAlmostClose()
            }
          })
        }
        this.soundHandle = false        
      }

      if(handle === 1) {
        requestTimeout(() => {
          this.isConclusion = true
        }, 2000)

      }
    } else {
      this.splitScreenPercentageBeforeHandle = this.props.store.users.find(user => user.id === "player1").splitScreenPercentage
      this.overlay()
      this.currentSceneInstanceArray.forEach((scene) => {
        if (scene.isSceneDoor && scene.isUserAdvantage) {
          scene.playDoorClosing()
        }
      })
    }
  }

  // overlay

  overlay = () => {
    const root = window.document.querySelector("#root")
    const app = window.document.querySelector(".desktop-app")

    const duration = (this.overlayMaxDuration - this.overlayMinDuration) * (1 - this.handlePourcentage) + this.overlayMinDuration

    root.classList.add("overlay")
    app.classList.add("overlay")

    requestTimeout(() => {
      root.classList.remove("overlay")
      app.classList.remove("overlay")
    }, (duration / 2) * 1000)

    this.overlayRequestTimeout = requestTimeout(this.overlay, (duration) * 1000)

    if(this.isConclusion) {
      requestTimeout(() => {
        this.currentSceneInstanceArray.forEach((scene) => {
          if (scene.isSceneDoor && scene.isUserAdvantage) {
            scene.stopSoundBgDoor1()
          }
        })
        this.props.dispatch(setUserIndicationActive({
          userId: "player1",
          isActive: false
        }))
        this.props.dispatch(setUserIndicationActive({
          userId: "player2",
          isActive: false
        }))
        this.props.dispatch(setCurrentStep(steps.CONCLUSION.name))
        const currentStep = null
        this.props.dispatch(wsEmitCurrentStep({currentStep}))
        clearRequestTimeout(this.overlayRequestTimeout)
      }, (duration / 2) * 1000)
    }

  }

  // dom elements transitions

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
      .to(html, .2, {
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
      .to(html, .2, {
        opacity: 1,
        ease: Power2.easeInOut
      }, "+=1.2")
  }

  onExitDoorCircle = (html) => {
    TweenMax.to(html, 4, {
      opacity: 0
    })
  }

  // hooks

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

    // player 1 handle change
    if (prevProps.store.users.find((user) => user.id === 'player1').handle !== this.props.store.users.find((user) => user.id === 'player1').handle
    ) {
      this.onReceiveHandle(this.props.store.users.find((user) => user.id === 'player1').handle, "player1")
    }
    // player 2 handle change
    if (prevProps.store.users.find((user) => user.id === 'player2').handle !== this.props.store.users.find((user) => user.id === 'player2').handle
    ) {
      this.onReceiveHandle(this.props.store.users.find((user) => user.id === 'player2').handle, "player2")
    }

    // stair progression Player1
    if (
      prevProps.store.users.find((user) => user.id === 'player1').stairsProgression !== 
      this.props.store.users.find((user) => user.id === 'player1').stairsProgression) {
        let stairsProgression1 = this.props.store.users.find((user) => user.id === 'player1').stairsProgression
        let stairsProgression2 = this.props.store.users.find((user) => user.id === 'player2').stairsProgression
        if (stairsProgression1 < 0.19 && stairsProgression2 < 0.19) {
          this.onStairProgression1(stairsProgression1)
        }
    }

    // stair progression Player2
    if (
      prevProps.store.users.find((user) => user.id === 'player2').stairsProgression !== 
      this.props.store.users.find((user) => user.id === 'player2').stairsProgression) {
        let stairsProgression2 = this.props.store.users.find((user) => user.id === 'player2').stairsProgression
        let stairsProgression1 = this.props.store.users.find((user) => user.id === 'player1').stairsProgression
        if (stairsProgression1 < 0.19 && stairsProgression2 < 0.19) {
          this.onStairProgression2(stairsProgression2)
        }
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
    const {store} = this.props

    const player1 = store.users.find(user => user.id === "player1")
    const player2 = store.users.find(user => user.id === "player2")

    return (
      <>
        <div ref={ref => this.refScene1 = ref} className={classNames("scene-manager__player1", {
          "door-circle": store.isSplitScreen && player1.currentScene === scenes.SCENEDOOR.name && player1.fingerprint && player1.status === "superior"
        })} style={{
          width: window.innerWidth,
        }}>
          <div className="scene-manager__player1__wrapper" style={{
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
              <RollingNumber className={"desktop"} numbers={player1.code} isMobile={false}/>
            </Transition>


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
                aspectRatio={"contain"}
                progressionTweenDuration={0.05}
                progression={player1.handle}
                clampLastFrames={1}
              />
            </Transition>
          </div>

        </div>

        <div ref={ref => this.refScene2 = ref} className={classNames("scene-manager__player2", {
          "door-circle": store.isSplitScreen && player2.currentScene === scenes.SCENEDOOR.name && player2.fingerprint && player2.status === "superior"
        })} style={{
          width: window.innerWidth,
          height: window.innerHeight,
        }}>

          <div className="scene-manager__player2__wrapper" style={{
            width: window.innerWidth,
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
              <RollingNumber className={"desktop"} numbers={player2.code} isMobile={false}/>
            </Transition>

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
                aspectRatio={"contain"}
                progressionTweenDuration={0.05}
                progression={player2.handle}
                clampLastFrames={1}
              />
            </Transition>
          </div>


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

