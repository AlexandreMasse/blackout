import {AssetsManager} from "../../../../../managers";
import * as PIXI from "pixi.js";
import {TweenMax} from 'gsap'
import {map, setFullScreen} from '../../utils'

export default class SceneDoor {

  constructor({dispatch, store, player}) {
    this.player = player
    this.store = store
    this.needUpdate = true;

    this.init()
  }

  //required
  updateStore(newStore) {
    //update store
    // console.log("updateStore", newStore);
    this.store = newStore
  }

  init() {
    console.log("scene door init")

    let width = window.innerWidth
    let height = window.innerHeight
    this.container = new PIXI.Container()
    let outsideImg = AssetsManager.get('outside')
    let baseTexture = new PIXI.BaseTexture(outsideImg)
    let texture = new PIXI.Texture(baseTexture)
    this.outsideSprite = new PIXI.Sprite(texture)

    this.marge = 5
    this.containerSize = {width:width * .5, height:height}
    this.spriteSize = {
      width: this.outsideSprite.width,
      height: this.outsideSprite.height
    }
    this.addToScene()
    this.brt = new PIXI.BaseRenderTexture(width, height, PIXI.SCALE_MODES.LINEAR, 1)
    this.rt = new PIXI.RenderTexture(this.brt)
    this.sprite = new PIXI.Sprite(this.rt) 
    // this.setPosition()
    setFullScreen(this.outsideSprite, this.spriteSize.width, this.spriteSize.height, this.containerSize.width)
    this.sprite.x = this.player === 'player2' ? this.containerSize.width: 0 
    this.baseX = this.player === 'player2' ? this.containerSize.width + this.marge : 0

  }

  splitScreen(pct) {
    if (this.player === "player2") {
      // console.log('PLAYER 2',pct)
      let bgX = ((window.innerWidth * pct) - this.outsideSprite.width) / 2
      let diffX = this.baseX - (window.innerWidth * pct)
      let spriteX = this.baseX + diffX
      
      TweenMax.to(this.sprite, .5,{x: spriteX})
      TweenMax.to(this.outsideSprite.position, .5,{x: bgX})
    } else {
      // console.log('PLAYER 1',pct)
      let bgX = ((window.innerWidth * pct) - this.outsideSprite.width) / 2
      TweenMax.to(this.outsideSprite.position, .5,{x: bgX})
    }
  }

  addToScene() {
    this.container.addChild(this.outsideSprite)
  }

  update() {
    //console.log("scene2 update");
    //console.log("update scene 2");
  }

}