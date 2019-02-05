import {AssetsManager} from "../../../../../managers";
import * as PIXI from "pixi.js";
import {TweenMax} from 'gsap'
import {map, setFullScreen} from '../../utils'
import {SceneDoorAdvantage, SceneDoorDisavantage} from './SubScene'

export default class SceneDoor {

  constructor({dispatch, store, player, app}) {
    this.app = app
    this.player = player
    this.store = store
    this.needUpdate = true;
    let pct = this.store.users.find(user => user.id === "player1").splitScreenPercentage
    this.initialPrct = player === 'player1' ? pct : 1 - pct 
    console.log(this.initialPrct)

    if (player == "player2") this.initSceneDisadvantage()
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
    let outsideImg = AssetsManager.get('outsideTest')
    let baseTexture = new PIXI.BaseTexture(outsideImg)
    let texture = new PIXI.Texture(baseTexture)
    this.outsideSprite = new PIXI.Sprite(texture)
    this.marge = 3
    this.containerSize = {width: width * this.initialPrct, height:height}
    this.mask = new PIXI.Graphics().beginFill(0x8bc5ff).drawRect(0,0, this.containerSize.width - this.marge, this.containerSize.height).endFill()
    this.spriteSize = {
      width: this.outsideSprite.width,
      height: this.outsideSprite.height
    }
    this.addToScene()
    this.brt = new PIXI.BaseRenderTexture(width, height, PIXI.SCALE_MODES.LINEAR, 1)
    this.rt = new PIXI.RenderTexture(this.brt)
    this.sprite = new PIXI.Sprite(this.rt) 
    this.sprite.x = this.player === 'player2' ? width - this.containerSize.width: 0 
    this.baseX = this.player === 'player2' ? this.containerSize.width + this.marge : 0

    switch (this.player) {
      case 'player1':
        setFullScreen(this.outsideSprite, this.spriteSize.width, this.spriteSize.height, this.containerSize.width)
        break;
      case 'player2':
      setFullScreen(this.spriteDisadvantage, this.spriteSize.width, this.spriteSize.height, this.containerSize.width)
        break;
      default:
        console.log('Sorry, we are out of ' + this.player + '.')
    }

  }

  initSceneDisadvantage() {
    console.log('INIT SCENE PLAYER 2 DESAVANTAGE')
    this.sceneDisadvantage = new SceneDoorDisavantage(this.initialPrct)
    this.spriteDisadvantage = this.sceneDisadvantage.spriteOutside
    console.log(this.spriteDisadvantage)
  }

  splitScreen(pct) {
    if (this.player === "player2") {
      let bgX = ((window.innerWidth * pct) - this.spriteDisadvantage.width) / 2
      let diffX = this.baseX - (window.innerWidth * pct)
      let spriteX = window.innerWidth - this.baseX + diffX
      
      TweenMax.to(this.sprite, .5,{x: spriteX})
      TweenMax.to(this.spriteDisadvantage.position, .5,{x: bgX})
    } else {
      let masxW = (window.innerWidth * pct) - this.marge
      TweenMax.to(this.mask, .5,{width:masxW})

      let bgX = ((window.innerWidth * pct) - this.outsideSprite.width) / 2
      TweenMax.to(this.outsideSprite.position, .5,{x: bgX})
    }
  }

  addToScene() {
    switch (this.player) {
      case 'player1':
      this.container.mask = this.mask
      this.container.addChild(this.mask)
      this.container.addChild(this.outsideSprite)
        break;
      case 'player2':
      console.log('SPRITE DISADVAAAANTAAAGE', this.spriteDisadvantage)
      this.container.addChild(this.spriteDisadvantage)
        break;
      default:
        console.log('Sorry, we are out of ' + this.player + '.')
    }
  }

  update() {
    if (this.sceneDisadvantage) {
      this.app.renderer.render(this.sceneDisadvantage.container, this.sceneDisadvantage.rt)
    }
    //console.log("scene2 update");
    //console.log("update scene 2");
  }

}