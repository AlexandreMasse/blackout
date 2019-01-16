import * as PIXI from "pixi.js"
import {AssetsManager} from "../../../../managers"
//redux
import {setCurrentScene} from "../../../redux/actions/desktopAction"
// scenes
import scenes from ".."
// utils
import {setFullScreen, collisionDetection} from '../utils'

export default class SceneFlashlight {

  constructor({dispatch, store}) {
    this.dispatch = dispatch
    this.store = store
    this.needUpdate = true;
    console.log(this.store)
    this.init()
  }

  init() {
    console.log("scene flashlight init")
    this.container = new PIXI.Container()
    this.initBackgroundUser()
    this.addToScene()
    this.brt = new PIXI.BaseRenderTexture(this.sceneWH.width, this.sceneWH.height, PIXI.SCALE_MODES.LINEAR, 1)
    this.rt = new PIXI.RenderTexture(this.brt)
    this.sprite = new PIXI.Sprite(this.rt)
    
    // this.sprite.x = -600
    // this.sprite.y = -80
    setFullScreen(this.sprite, this.sceneWH.width, this.sceneWH.height)
  }

  initBackgroundUser() {
    // get image from assets 
    const bureau1 = AssetsManager.get('bureau1')
    const bureau2 = AssetsManager.get('bureau2')
    const bureau3 = AssetsManager.get('bureau3')
    const outline = AssetsManager.get('outline')

    const baseTextureBureau1 = new PIXI.BaseTexture(bureau1)
    const baseTextureBureau2 = new PIXI.BaseTexture(bureau2)
    const baseTextureBureau3 = new PIXI.BaseTexture(bureau3)
    const baseTextureOutline = new PIXI.BaseTexture(outline)

    const tBureau1 = new PIXI.Texture(baseTextureBureau1)
    const tBureau2 = new PIXI.Texture(baseTextureBureau2)
    const tBureau3 = new PIXI.Texture(baseTextureBureau3)
    const tOutline = new PIXI.Texture(baseTextureOutline)

    this.spriteBureau1 = new PIXI.Sprite(tBureau1)
    this.spriteBureau2 = new PIXI.Sprite(tBureau2)
    this.spriteBureau3 = new PIXI.Sprite(tBureau3)

    this.spriteBureau1.alpha = 0
    this.spriteBureau2.alpha = 0
    this.spriteBureau3.alpha = 0

    this.sceneWH = {
      width: this.spriteBureau1.width,
      height: this.spriteBureau1.height
    }
    // const spriteOutline = new PIXI.Sprite(tOutline)

    this.initMaskUser()
    this.initFlashOff()
    // this.container.addChild(spriteOutline)
  }

  initFlashOff() {
    const flashoff = AssetsManager.get('flashoff')
    const baseTextureFlashOff = new PIXI.BaseTexture(flashoff)
    const tFlashOff = new PIXI.Texture(baseTextureFlashOff)
    this.spriteFlashOff = new PIXI.Sprite(tFlashOff)

    this.spriteFlashOff.x = (this.sceneWH.width / 2) - (this.spriteFlashOff.width / 2)
    this.spriteFlashOff.y = this.sceneWH.height / 2
  }

  initMaskUser() {
    this.maskUSer = []
    const maskRadius1 = 380
    const maskRadius2 = 320
    const maskRadius3 = 260
    // const maskRadius1 = 180
    // const maskRadius2 = 140
    // const maskRadius3 = 100
    
    // CIRCLE MASK 1
    this.mask1 = new PIXI.Graphics()
    this.mask1.beginFill('0xffffff')
    this.mask1.drawCircle(0, 0, maskRadius1)
    this.mask1.endFill()

    this.mask1.x = this.sceneWH.width / 2 
    this.mask1.y = this.sceneWH.height / 2

    this.maskUSer.push(this.mask1)
    // CIRCLE MASK 2
    this.mask2 = new PIXI.Graphics()
    this.mask2.beginFill('0xffffff')
    this.mask2.drawCircle(0, 0, maskRadius2)
    this.mask2.endFill()

    this.mask2.x = this.sceneWH.width / 2 
    this.mask2.y = this.sceneWH.height / 2
    
    this.maskUSer.push(this.mask2)

    // CIRCLE MASK 3
    this.mask3 = new PIXI.Graphics()
    this.mask3.beginFill('0xffffff')
    this.mask3.drawCircle(0, 0, maskRadius3)
    this.mask3.endFill()

    this.mask3.x = this.sceneWH.width / 2
    this.mask3.y = this.sceneWH.height / 2

    this.maskUSer.push(this.mask3)
    
    // SET MASK TO SPRITE
    this.spriteBureau1.mask = this.mask1
    this.spriteBureau2.mask = this.mask2
    this.spriteBureau3.mask = this.mask3
  }

  addToScene() {
    this.container.addChild(this.mask1)
    this.container.addChild(this.mask2)
    this.container.addChild(this.mask3)
    this.container.addChild(this.spriteBureau1)
    this.container.addChild(this.spriteBureau2)
    this.container.addChild(this.spriteBureau3)
    this.container.addChild(this.spriteFlashOff)
  }
  update() {
    // console.log("update scene flashlight");
  }

}