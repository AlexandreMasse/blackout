import {AssetsManager} from "../../../../managers";
import * as PIXI from "pixi.js";

export default class Scene1 {

  constructor() {
    this.needUpdate = true;

    this.init()
  }

  init() {
    console.log("scene1 init");

    let width = window.innerWidth
    let height = window.innerHeight
    this.container = new PIXI.Container()
    let bureauItemImg = AssetsManager.get('bureauItem')
    let baseTexture = new PIXI.BaseTexture(bureauItemImg)
    let texture = new PIXI.Texture(baseTexture)
    let bureauItemSprite = new PIXI.Sprite(texture)
    this.container.addChild(bureauItemSprite)
    this.brt = new PIXI.BaseRenderTexture(bureauItemImg.width, bureauItemImg.height, PIXI.SCALE_MODES.LINEAR, 1)
    this.rt = new PIXI.RenderTexture(this.brt)
    this.sprite = new PIXI.Sprite(this.rt)
  }

  update() {
    console.log("scene1 update");
  }

}