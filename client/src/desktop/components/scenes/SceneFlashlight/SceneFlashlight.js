import {AssetsManager} from "../../../../managers";
import * as PIXI from "pixi.js";
//redux
import {setCurrentScene} from "../../../redux/actions/desktopAction";
//scenes
import scenes from ".."

export default class SceneFlashlight {

  constructor({dispatch, store}) {
    this.dispatch = dispatch
    this.store = store
    this.needUpdate = true;
    this.init()
  }

  init() {
    console.log("scene flashlight init")

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

    // setTimeout(() => {
    //   this.dispatch(setCurrentScene(scenes.SCENE2.name))
    // },5000)
  }

  update() {
    //console.log("scene1 store.currentScene", this.store.currentScene);
    //console.log("update scene 1");
  }

}