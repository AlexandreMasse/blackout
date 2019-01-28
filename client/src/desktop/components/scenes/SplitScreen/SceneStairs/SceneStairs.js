import Scene from './three/Scene'

// import {AssetsManager} from "../../../../managers";
import * as PIXI from "pixi.js";

export default class SceneGenerator {

  constructor({dispatch, store}) {
    this.store = store
    this.needUpdate = true;
    
    this.initSceneThree()
    this.init()
  }

  //required
  updateStore(newStore) {
    //update store
    console.log("updateStore", newStore);
    this.store = newStore
  }

  init() {
    console.log("scene stairs init")
    let width = window.innerWidth
    let height = window.innerHeight
    this.container = new PIXI.Container()
    this.THREE_TEXTURE = PIXI.BaseTexture.fromCanvas(this.sceneThree.renderer.domElement, PIXI.SCALE_MODES.LINEAR) 
    this.bg = new PIXI.Sprite.from(new PIXI.Texture(this.THREE_TEXTURE))
    this.bg.width = width
    this.bg.height = height
    this.addToScene()
    this.brt = new PIXI.BaseRenderTexture(width, height, PIXI.SCALE_MODES.LINEAR, 1)
    this.rt = new PIXI.RenderTexture(this.brt)
    
    this.sprite = new PIXI.Sprite(this.rt)
  }
  initSceneThree() {
    this.sceneThree = new Scene() 
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