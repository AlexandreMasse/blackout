import SceneFBO from './three/SceneFBO'
import SceneFBO2 from './three/SceneFBO2'
import SceneTest from './three/SceneTest'
import SceneTest2 from './three/SceneTest2'
import * as dat from 'dat.gui'
import {setFullScreen} from '../../utils'

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
    this.container = new PIXI.Container()

    const THREE_TEXTURE = PIXI.Texture.fromCanvas(this.sceneThree.createTexture())
    THREE_TEXTURE.baseTexture.resolution = 2
    this.sprite = new PIXI.Sprite(THREE_TEXTURE)
    this.sprite.anchor.y = 1 
    this.sprite.scale.y *= -1
    this.sprite.x = this.player === 'player2' ? width - this.containerSize.width: 0 

    // ==== OLD ====
    // if (this.player === 'player1') {
    //   const THREE_TEXTURE = PIXI.Texture.fromCanvas(this.sceneThree.createTexture())
    //   THREE_TEXTURE.baseTexture.resolution = 1
    //   this.sprite = new PIXI.Sprite(THREE_TEXTURE)
    //   this.sprite.anchor.y = 1 
    //   this.sprite.scale.y *= -1
    //   setFullScreen(this.sprite, this.sprite.width, this.sprite.height, this.containerSize.width)
    // } else {
    //   console.log(this.sceneThree2.createTexture())
    //   const THREE_TEXTURE = PIXI.Texture.fromCanvas(this.sceneThree2.createTexture())
    //   THREE_TEXTURE.baseTexture.resolution = 1
    //   this.sprite = new PIXI.Sprite(THREE_TEXTURE)
    //   this.sprite.anchor.y = 1    /* 0 = top, 0.5 = center, 1 = bottom */
    //   this.sprite.scale.y *= -1
    //   setFullScreen(this.sprite, this.sprite.width, this.sprite.height, this.containerSize.width)
    //   this.sprite.x =  width - this.containerSize.width
    // }
    // this.sprite.x = this.player === 'player1' ? 0 : window.innerWidth *.5 + 10 
    // this.sprite.x = this.player === 'player2' ? width - this.containerSize.width: 0 
    // this.baseX = this.player === 'player2' ? this.containerSize.width + this.marge : 0
  }

  initSceneThree() {
    this.sceneThree = new SceneTest(this.status, this.player, this.dispatch)

    // === OLD ===
    // if (this.player === 'player1') {
    //   this.sceneThree = new SceneTest(this.status, this.player, this.dispatch)
    // }

    // if (this.player === 'player2') {
    //   this.sceneThree2 = new SceneTest2(this.status, this.player, this.dispatch)
    // }
    // this.scenePlayer1 = this.sceneThree.sceneplayer1()
    // this.scenePlayer2 = this.sceneThree.sceneplayer2()
  }

  addToScene() {
    this.container.addChild(this.sprite)
  }

  update() {
    if (!this.addedOnce && this.sprite._texture.baseTexture._glTextures[0] != null && this.renderer3D.properties.get(this.sceneThree.renderTarget.texture).__webglTexture != null) {

          this.sprite._texture.baseTexture._glTextures[0].texture = this.renderer3D.properties.get(this.sceneThree.renderTarget.texture).__webglTexture;
          this.addedOnce = true
          console.log("added")
        }
    
        this.renderer2D.reset()
        /* Three */
        this.renderer3D.state.reset()
        this.renderer3D.setRenderTarget(null)
        this.sceneThree.render(this.renderer3D)
        this.sceneThree.update()
        this.renderer2D.reset()
      
    // }
    // === OLD ===
    // if (this.player === 'player1') {
    //   if (!this.addedOnce && this.sprite._texture.baseTexture._glTextures[0] != null && this.renderer3D.properties.get(this.sceneThree.renderTarget.texture).__webglTexture != null) {

    //     this.sprite._texture.baseTexture._glTextures[0].texture = this.renderer3D.properties.get(this.sceneThree.renderTarget.texture).__webglTexture;
    //     this.addedOnce = true
    //     console.log("added")
    //   }
  
    //   this.renderer2D.reset()
    //   /* Three */
    //   this.renderer3D.state.reset()
    //   this.renderer3D.setRenderTarget(null)
    //   this.sceneThree.render(this.renderer3D)
    //   this.sceneThree.update()
    //   this.renderer2D.reset()
    // } else {
    //   if (this.player === 'player2') {
    //     if (!this.addedOnce2 && this.sprite._texture.baseTexture._glTextures[0] != null && this.renderer3D.properties.get(this.sceneThree2.renderTarget.texture).__webglTexture != null) {
  
    //       this.sprite._texture.baseTexture._glTextures[0].texture = this.renderer3D.properties.get(this.sceneThree2.renderTarget.texture).__webglTexture;
    //       this.addedOnce2 = true
    //       console.log("added")
    //     }
    //   }

    //   this.renderer2D.reset()
    //   /* Three */
    //   this.renderer3D.state.reset()
    //   this.renderer3D.setRenderTarget(null)
    //   this.sceneThree2.render(this.renderer3D)
    //   this.sceneThree2.update()
    //   this.renderer2D.reset()
    // }
  }
  
  resize() {

  }

}