import SceneFBO from './three/SceneFBO'
import SceneFBO2 from './three/SceneFBO2'
import SceneTest from './three/SceneTest'
import SceneTest2 from './three/SceneTest2'
import * as dat from 'dat.gui'

// import {AssetsManager} from "../../../../managers";
import * as PIXI from "pixi.js";

export default class SceneStairs {

  constructor({dispatch, store, player, renderer2D, renderer3D}) {
    this.player = player
    this.store = store
    this.needUpdate = true
    this.status = this.store.users.find(user => user.id === this.player).status
    this.renderer2D = renderer2D
    this.renderer3D = renderer3D
    this.addedOnce = false
    this.addedOnce2 = false
    // console.log('YO LE PLAYER',this.player, ' Ton status est :', this.status)

    this.init()
    // if (this.player === 'player1') {
    //   this.initGUI()
    // }
  }

  //required
  updateStore(newStore) {
    //update store

    // this.currentPlayer1TapValue = this.store.users.find(user => user.id === "player1").tapValue
    // this.newPlayer1TapValue = newStore.users.find(user => user.id === "player1").tapValue

    // if (this.newPlayer1TapValue) {
    //   this.sceneThree.moveCamera()
    // }

    // this.currentPlayer2TapValue = this.store.users.find(user => user.id === "player2").tapValue
    // this.newPlayer2TapValue = newStore.users.find(user => user.id === "player2").tapValue

    // if (this.newPlayer2TapValue) {
    //   this.sceneThree.moveCamera()    
    // }

    // console.log("updateStore", newStore);
    this.store = newStore
  }

  init() {
    console.log("scene stairs init")
    let width = window.innerWidth
    let height = window.innerHeight
    this.initSceneThree()
    this.marge = 3
    this.container = new PIXI.Container()
    if (this.player === 'player1') {
      const THREE_TEXTURE = PIXI.Texture.fromCanvas(this.sceneThree.createTexture())
      THREE_TEXTURE.baseTexture.resolution = 1
      this.sprite = new PIXI.Sprite(THREE_TEXTURE)
      this.sprite.anchor.y = 1    /* 0 = top, 0.5 = center, 1 = bottom */
      this.sprite.scale.y *= -1
    } else {
      console.log(this.sceneThree2.createTexture())
      const THREE_TEXTURE = PIXI.Texture.fromCanvas(this.sceneThree2.createTexture())
      THREE_TEXTURE.baseTexture.resolution = 1
      this.sprite = new PIXI.Sprite(THREE_TEXTURE)
      this.sprite.anchor.y = 1    /* 0 = top, 0.5 = center, 1 = bottom */
      this.sprite.scale.y *= -1
    }
   
   
    // this.sprite.position.x += 110

    // const THREE_TEXTURE = PIXI.Texture.fromCanvas(this.sceneThree.createTexture()) 
    // THREE_TEXTURE.baseTexture.resolution = 1
    // this.sprite = new PIXI.Sprite(THREE_TEXTURE)
    // this.sprite.width = width
    // this.sprite.height = height
    // this.addToScene()
    // this.brt = new PIXI.BaseRenderTexture(width, height, PIXI.SCALE_MODES.LINEAR, 1)
    // this.rt = new PIXI.RenderTexture(this.brt)
    
    // this.sprite = new PIXI.Sprite(this.rt)
    this.sprite.x = this.player === 'player1' ? 0 : window.innerWidth *.5 + 10 

  }

  initSceneThree() {
    if (this.player === 'player1') {
      this.sceneThree = new SceneTest(this.status)
    }

    if (this.player === 'player2') {
      this.sceneThree2 = new SceneTest2(this.status)
    }
    // this.scenePlayer1 = this.sceneThree.sceneplayer1()
    // this.scenePlayer2 = this.sceneThree.sceneplayer2()
  }

  addToScene() {
    this.container.addChild(this.sprite)
  }

  update() {
    if (this.player === 'player1') {
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
    } else {

      if (this.player === 'player2') {
        if (!this.addedOnce2 && this.sprite._texture.baseTexture._glTextures[0] != null && this.renderer3D.properties.get(this.sceneThree2.renderTarget.texture).__webglTexture != null) {
  
          this.sprite._texture.baseTexture._glTextures[0].texture = this.renderer3D.properties.get(this.sceneThree2.renderTarget.texture).__webglTexture;
          this.addedOnce2 = true
          console.log("added")
        }
      }

      this.renderer2D.reset()
      /* Three */
      this.renderer3D.state.reset()
      this.renderer3D.setRenderTarget(null)
      this.sceneThree2.render(this.renderer3D)
      this.sceneThree2.update()
      this.renderer2D.reset()
    }
  }

  initGUI() {
    this.gui = new dat.GUI({ autoPlace: false })
    var customContainer = document.querySelector('.desktop-app')
    customContainer.appendChild(this.gui.domElement)
    
    const spritePos = {
      rotation: this.sprite.rotation,
    }

    let spriteChanger = () => {
        this.sprite.rotation = spritePos.rotation
    }

    let f1 = this.gui.addFolder('SPRITE')
    f1.add(spritePos, 'rotation', 0, 180, 0.1).onChange(spriteChanger)

    this.gui.close()
  }

  resize() {

  }

}