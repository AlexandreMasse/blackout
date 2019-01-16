import {AssetsManager} from "../../../../managers";
import * as PIXI from "pixi.js";

export default class Scene2 {

  constructor({dispatch, store}) {
    this.store = store
    this.needUpdate = true;

    this.init()
  }

  //required
  updateStore(newStore) {
    //update store
    console.log("updateStore", newStore);
    this.store = newStore
  }

  init() {
    console.log("scene2 init");

    let width = window.innerWidth
    let height = window.innerHeight
    this.container = new PIXI.Container()
    let bureauItemImg = AssetsManager.get('bureauItem')
    let baseTexture = new PIXI.BaseTexture(bureauItemImg)
    let texture = new PIXI.Texture(baseTexture)
    let bureauItemSprite = new PIXI.Sprite(texture)
    bureauItemSprite.x = 100
    bureauItemSprite.y = 100
    this.container.addChild(bureauItemSprite)
    this.brt = new PIXI.BaseRenderTexture(width, height, PIXI.SCALE_MODES.LINEAR, 1)
    this.rt = new PIXI.RenderTexture(this.brt)
    this.sprite = new PIXI.Sprite(this.rt)
  }

  update() {
    //console.log("scene2 update");
    //console.log("update scene 2");
  }

}