import SceneTest from './three/SceneThree'
import * as dat from 'dat.gui'
import {setFullScreen} from '../../utils'
import {TweenMax} from 'gsap'

// import {AssetsManager} from "../../../../managers";
import * as PIXI from "pixi.js";

export default class SceneStairs {

  constructor({dispatch, store, player, renderer2D}) {
    this.dispatch = dispatch
    this.player = player
    this.store = store
    this.needUpdate = true
    this.status = this.store.users.find(user => user.id === this.player).status
    let pct = this.store.users.find(user => user.id === "player1").splitScreenPercentage
    this.initialPrct = player === 'player1' ? pct : 1 - pct 
    this.renderer2D = renderer2D
    this.addedOnce = false
    this.addedOnce2 = false

    this.init()

  }

  //required
  updateStore(newStore) {
    //update store

    this.currentPlayer1TapValue = this.store.users.find(user => user.id === "player1").tapValue
    this.newPlayer1TapValue = newStore.users.find(user => user.id === "player1").tapValue

    if (this.newPlayer1TapValue) {
      this.sceneThree.moveCamera()
    }

    this.currentPlayer2TapValue = this.store.users.find(user => user.id === "player2").tapValue
    this.newPlayer2TapValue = newStore.users.find(user => user.id === "player2").tapValue

    if (this.newPlayer2TapValue) {
      this.sceneThree.moveCamera()    
      // === OLD ===
      // this.sceneThree2.moveCamera()    
    }

    // console.log("updateStore", newStore);
    this.store = newStore
  }

  init() {
    console.log("scene stairs init")
    let width = window.innerWidth
    let height = window.innerHeight
    this.initSceneThree()
    this.marge = 3
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
  }

  initSceneThree() {
    this.sceneThree = new SceneTest(this.status, this.player, this.dispatch)
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

  }

}