import Scene from './three/Scene'

// import {AssetsManager} from "../../../../managers";
import * as PIXI from "pixi.js";

export default class SceneStairs {

  constructor({dispatch, store, player}) {
    this.player = player
    this.store = store
    this.needUpdate = true
    this.status = this.store.users.find(user => user.id === this.player).status
    // console.log('YO LE PLAYER',this.player, ' Ton status est :', this.status)

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
    }

    // console.log("updateStore", newStore);
    this.store = newStore
  }

  init() {
    console.log("scene stairs init")
    let width = window.innerWidth
    let height = window.innerHeight
    this.initSceneThree()
    this.container = new PIXI.Container()
    this.THREE_TEXTURE = PIXI.BaseTexture.fromCanvas(this.sceneThree.renderer.domElement, PIXI.SCALE_MODES.LINEAR) 
    this.bg = new PIXI.Sprite.from(new PIXI.Texture(this.THREE_TEXTURE))
    this.bg.width = width
    this.bg.height = height
    this.addToScene()
    this.brt = new PIXI.BaseRenderTexture(width, height, PIXI.SCALE_MODES.LINEAR, 1)
    this.rt = new PIXI.RenderTexture(this.brt)
    
    this.sprite = new PIXI.Sprite(this.rt)
    // this.sprite.x = this.player === 'player1' ? -350 : 350 
  }

  initSceneThree() {
    this.sceneThree = new Scene(this.status) 
    // this.scenePlayer1 = this.sceneThree.sceneplayer1()
    // this.scenePlayer2 = this.sceneThree.sceneplayer2()
  }

  addToScene() {
    this.container.addChild(this.bg)
  }

  update() {
    this.sceneThree.update()
    this.bg.texture.update()
  }

  resize() {

  }

}