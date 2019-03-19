import SceneTest from './three/SceneThree'
// scene utils
import {setFullScreen, requ} from '../../utils'
// general utils
import {requestTimeout} from '../../../../../utils'
import {AssetsManager} from "../../../../../managers"
// libs
import {TweenMax} from 'gsap'
import * as PIXI from "pixi.js"
import { Howl } from 'howler'
// redux
import {setPlayer1SplitScreenPercentage, setUserIndicationTitle, setUserIndicationDescription, setUserIndicationActive, } from "../../../../redux/actions/desktopAction"



export default class SceneStairs {

  constructor({dispatch, store, player, renderer2D}) {
    this.dispatch = dispatch
    this.player = player
    this.store = store
    this.needUpdate = true
    this.needResize = false
    this.moveSplitScreen = true
    this.status = this.store.users.find(user => user.id === this.player).status
    this.initialPrct = player === 'player1' ? 0.1 : 1 
    this.renderer2D = renderer2D
    this.initBackgroundSound()
    this.init()
  }

  initBackgroundSound() {
    const stairsSoundAsset = AssetsManager.get('stairsSound')
    this.stairsSound = new Howl({
      src: stairsSoundAsset.src,
      volume: 0.5,
      html5: true,
      preload: true,
      autoplay: false,
      loop: true,
      format: ['mp3']
    })
  }

  //required
  updateStore(newStore) {
    //update store

    this.currentPlayerTapValue = this.store.users.find(user => user.id === this.player).tapValue
    this.newPlayerTapValue = newStore.users.find(user => user.id === this.player).tapValue

    if (this.currentPlayerTapValue !== this.newPlayerTapValue) {
        this.sceneThree.moveCamera()
    }
    // console.log("updateStore", newStore);
    this.store = newStore
  }

  init() {
    console.log("scene stairs init")
    let width = window.innerWidth
    let height = window.innerHeight
    this.initSceneThree()
    this.marge = 1.5
    this.containerSize = {width: width * this.initialPrct, height:height}
    this.mask = new PIXI.Graphics().beginFill(0x8bc5ff).drawRect(0,0, this.containerSize.width - this.marge, this.containerSize.height).endFill()
    this.container = new PIXI.Container()
    this.THREE_TEXTURE = PIXI.BaseTexture.fromCanvas(this.sceneThree.renderer.domElement, PIXI.SCALE_MODES.LINEAR) 
    this.spriteStairs = new PIXI.Sprite.from(new PIXI.Texture(this.THREE_TEXTURE))
    this.addToScene()
    setFullScreen(this.spriteStairs, this.spriteStairs.width, this.spriteStairs.height, this.containerSize.width)
    this.brt = new PIXI.BaseRenderTexture(this.spriteStairs.width, this.spriteStairs.height, PIXI.SCALE_MODES.LINEAR, 1)
    this.rt = new PIXI.RenderTexture(this.brt)
    this.sprite = new PIXI.Sprite(this.rt)
    this.sprite.x = this.player === 'player2' ? width - this.containerSize.width: 0 
    this.baseX = this.player === 'player2' ? this.containerSize.width + this.marge : 0

    if (this.player === 'player2') {
      requestTimeout(() => {
        this.dispatch(setPlayer1SplitScreenPercentage({splitScreenPercentage: .5}))
      }, 1000)
    }

    // indication
    if (this.player === 'player2') {
      this.dispatch(setUserIndicationTitle({userId: "player1", title: "Rejoignez l’étage -3"}))
      this.dispatch(setUserIndicationTitle({userId: "player2", title: "Rejoignez l’étage -3"}))
      this.dispatch(setUserIndicationDescription({userId: "player1", description: "Appuyez en rythme à droite et à gauche pour avancer."}))
      this.dispatch(setUserIndicationDescription({userId: "player2", description: "Appuyez en rythme à droite et à gauche pour avancer."}))

      requestTimeout(() => {
        this.dispatch(setUserIndicationActive({
          userId: "player1",
          isActive: true
        }))
        this.dispatch(setUserIndicationActive({
          userId: "player2",
          isActive: true
        }))
      }, 2000)
    }
  }

  initSceneThree() {
    this.sceneThree = new SceneTest(this.status, this.player, this.dispatch, this.stairsSound, this.moveSplitScreen)
  }

  splitScreen(pct) {
    if (this.player === "player2") {
      let diffX = this.baseX - (window.innerWidth * pct)
      let spriteX = window.innerWidth - this.baseX + diffX
      TweenMax.to(this.sprite, 1,{x: spriteX})
      let bgX = ((window.innerWidth * pct) - this.spriteStairs.width) / 2
      TweenMax.to(this.spriteStairs.position, 1,{x: bgX})
    } else {
      let masxW = (window.innerWidth * pct) - this.marge
      TweenMax.to(this.mask, 1,{width:masxW})

      let bgX = ((window.innerWidth * pct) - this.spriteStairs.width) / 2
      TweenMax.to(this.spriteStairs.position, 1,{x: bgX})
    }
  }

  enterAnimation(pct) {
    if (this.player === "player2") {
      let diffX = this.baseX - (window.innerWidth * pct)
      let spriteX = window.innerWidth - this.baseX + diffX
      TweenMax.to(this.sprite, 2,{x: spriteX})
      let bgX = ((window.innerWidth * pct) - this.spriteStairs.width) / 2
      TweenMax.to(this.spriteStairs.position, 2,{x: bgX})
    } else {
      let masxW = (window.innerWidth * pct) - this.marge
      TweenMax.to(this.mask, 2,{width:masxW})

      let bgX = ((window.innerWidth * pct) - this.spriteStairs.width) / 2
      TweenMax.to(this.spriteStairs.position, 2,{x: bgX})

      TweenMax.to(this.sprite, 2,{alpha: 1})
    }
  }
  

  addToScene() {
    if (this.player === 'player1') {
      this.container.addChild(this.mask)
      this.container.mask = this.mask
    }
    this.container.addChild(this.spriteStairs)
  }

  update() {
    this.sceneThree.update()
    this.spriteStairs.texture.update() 
  }
  
  resize() {
    let width = window.innerWidth
    this.containerSize.width = width * this.initialPrct
    setFullScreen(this.spriteStairs, this.spriteStairs.width, this.spriteStairs.height, this.containerSize.width)
  }

}