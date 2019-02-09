// import SceneFBO from './three/SceneFBO'
// import SceneFBO2 from './three/SceneFBO2'
import SceneTest from './three/SceneTest'
import {TweenMax} from 'gsap'
// import SceneTest2 from './three/SceneTest2'
import * as dat from 'dat.gui'
import {setFullScreen} from '../../utils'

// redux 
import {setPlayer1SplitScreenPercentage} from "../../../../redux/actions/desktopAction"

// import {AssetsManager} from "../../../../managers";
import * as PIXI from "pixi.js";

export default class SceneStairs {

  constructor({dispatch, store, player, renderer2D, renderer3D}) {
    this.dispatch = dispatch
    this.player = player
    this.store = store
    this.needUpdate = true
    this.status = this.store.users.find(user => user.id === this.player).status
    let pct = this.store.users.find(user => user.id === "player1").splitScreenPercentage
    this.initialPrct = player === 'player1' ? pct : 1 - pct 
    this.renderer2D = renderer2D
    this.renderer3D = renderer3D
    this.addedOnce = false
    // this.addedOnce2 = false

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
    const THREE_TEXTURE = PIXI.Texture.fromCanvas(this.sceneThree.createTexture())
    THREE_TEXTURE.baseTexture.resolution = 2
    // this.stairSprite = new PIXI.Sprite(THREE_TEXTURE)
    // this.stairSprite.anchor.y = 1 
    // this.stairSprite.scale.y *= -1
    // console.log('STAIR SPRITE,', this.stairSprite)
    // this.brt = new PIXI.BaseRenderTexture(width, height, PIXI.SCALE_MODES.LINEAR, 1)
    // this.rt = new PIXI.RenderTexture(this.brt)
    // this.rt2 = new PIXI.RenderTexture(this.brt)
    // var currentTexture = this.rt;
    // this.sprite = new PIXI.Sprite(this.rt)

    this.sprite3D = new PIXI.Sprite(THREE_TEXTURE)
    // this.sprite.anchor.y = 1 
    // this.sprite.scale.y *= -1
    

    this.brt = new PIXI.BaseRenderTexture(width, height, PIXI.SCALE_MODES.LINEAR, 1)
    this.rt = new PIXI.RenderTexture(this.brt)
    this.rt2 = new PIXI.RenderTexture(this.brt)
    this.sprite = new PIXI.Sprite(this.rt)
    // if(this.player === "player1") {
    //   setFullScreen(this.stairSprite, this.stairSprite.width, this.stairSprite.height, this.containerSize.width)
    //   console.log(this.s)
    // }
    // this.stairSprite.x = this.player === 'player2' ? width - this.containerSize.width: 0 
    this.sprite.x = this.player === 'player2' ? width - this.containerSize.width : 0 
    this.baseX = this.player === 'player2' ? this.containerSize.width + this.marge : 0
    
    this.addToScene()
    // if(this.player === "player2") {
    //   this.sprite.visible = true
    // }
  }

  initSceneThree() {
    this.sceneThree = new SceneTest(this.status, this.player, this.dispatch)
  }

  addToScene() {
    if (this.player === 'player1') {
      this.container.mask = this.mask
      this.container.addChild(this.mask)
    }
    this.container.addChild(this.sprite3D)
  }

  splitScreen(pct) {
    if (this.player === "player2") {
      let diffX = this.baseX - (window.innerWidth * pct)
      let spriteX = window.innerWidth - this.baseX + diffX
      TweenMax.to(this.sprite, 1,{x: spriteX})

      // let bgX = ((window.innerWidth * pct) - this.spriteDisadvantage.width) / 2
      // TweenMax.to(this.spriteDisadvantage.position, 1,{x: bgX})
    } else {
      let masxW = (window.innerWidth * pct) - this.marge
      TweenMax.to(this.mask, 1,{width:masxW})

      // let bgX = ((window.innerWidth * pct) - this.spriteDisadvantage.width) / 2
      // TweenMax.to(this.spriteDisadvantage.position, 1,{x: bgX})
    }
  }

  update() {
    // if (!this.addedOnce && this.sprite3D._texture.baseTexture._glTextures[0] != null && this.renderer3D.properties.get(this.sceneThree.renderTarget.texture).__webglTexture != null) {
    //   this.sprite3D._texture.baseTexture._glTextures[0].texture = this.renderer3D.properties.get(this.sceneThree.renderTarget.texture).__webglTexture;
    //   this.addedOnce = true
    //   console.log("added")
    //   // console.log('RENDerTARGET UPDATE', this.sceneThree.renderTarget)
    // }
    
    
    
    /* Three */
    // this.renderer3D.state.reset()
   
    // this.sceneThree.render(this.renderer3D)
    // this.sceneThree.update()
    // this.renderer3D.state.reset()
    console.log('reset')
    this.renderer2D.reset()

    // swap the buffers ...
    // var temp = this.rt
    // this.rt = this.rt2
    // this.rt = temp
  }
  
  resize() {

  }

}