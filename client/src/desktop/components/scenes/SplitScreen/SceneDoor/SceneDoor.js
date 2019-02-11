import {AssetsManager} from "../../../../../managers";
import * as PIXI from "pixi.js";
import {TweenMax, TimelineMax} from 'gsap'
import {map, setFullScreen} from '../../utils'
import {SceneDoorAdvantage, SceneDoorDisavantage, SceneDoorAdvantageInside} from './SubScene'

export default class SceneDoor {

  constructor({dispatch, store, player, renderer2D}) {
    this.renderer2D = renderer2D
    this.player = player
    this.store = store
    this.needUpdate = true;
    let pct = this.store.users.find(user => user.id === "player1").splitScreenPercentage
    this.status = this.store.users.find(user => user.id === player).status
    this.initialPrct = player === 'player1' ? pct : 1 - pct 

    switch (this.status) {
      case 'inferior':
        this.initSceneDisadvantage()
        break;
      case 'superior':
      this.initSceneAdvantage()
      this.initSceneAdvantageInside()
        break;
      default:
        console.log('Sorry, we are out of ' + this.status + '.')
    }

    this.init()

  }

  //required
  updateStore(newStore) {

    this.currentPlayerFingerprint = this.store.users.find(user => user.id === this.player).fingerprint
    this.newPlayerFingerprint = newStore.users.find(user => user.id === this.player).fingerprint

    if (this.currentPlayerFingerprint !== this.newPlayerFingerprint && this.newPlayerFingerprint === true) {
      if (this.status === 'superior') {
        this.sceneAdvantage.playFingerPrintSpriteSheet()
        const timeline = new TimelineMax({delay: .8})
        timeline.add('transition')
                .to(this.spriteAdvantage, .4, {alpha:0}, 'transition')
                .to(this.spriteAdvantageInside, .4, {alpha:1}, "transition+=0.4")
      } else {
        this.sceneDisadvantage.playFingerPrintSpriteSheet()
      }
    }

    this.currentPlayerHandle = this.store.users.find(user => user.id === this.player).handle
    this.newPlayerHandle = newStore.users.find(user => user.id === this.player).handle
    
    if (this.currentPlayerHandle !== this.newPlayerHandle) {
      let mapValue  = map(this.newPlayerHandle, 0, 1, 460, 0)
      TweenMax.to(this.sceneAdvantageInside.doorSprite, 2, {x:mapValue})
    }
    //update store
    // console.log("updateStore", newStore);
    this.store = newStore
  }

  init() {
    console.log("scene door init")

    let width = window.innerWidth
    let height = window.innerHeight
    this.container = new PIXI.Container()
    this.marge = 3
    this.containerSize = {width: width * this.initialPrct, height:height}
    this.mask = new PIXI.Graphics().beginFill(0x8bc5ff).drawRect(0,0, this.containerSize.width - this.marge, this.containerSize.height).endFill()
    this.addToScene()
    this.brt = new PIXI.BaseRenderTexture(width, height, PIXI.SCALE_MODES.LINEAR, 1)
    this.rt = new PIXI.RenderTexture(this.brt)
    this.sprite = new PIXI.Sprite(this.rt) 
    this.sprite.x = this.player === 'player2' ? width - this.containerSize.width: 0 
    this.baseX = this.player === 'player2' ? this.containerSize.width + this.marge : 0

    switch (this.status) {
      case 'superior':
        setFullScreen(this.spriteAdvantage, this.spriteAdvantage.width, this.spriteAdvantage.height, this.containerSize.width)
        setFullScreen(this.spriteAdvantageInside, this.spriteAdvantageInside.width, this.spriteAdvantageInside.height, this.containerSize.width)
        break;
      case 'inferior':
      setFullScreen(this.spriteDisadvantage, this.spriteDisadvantage.width, this.spriteDisadvantage.height, this.containerSize.width)
        break;
      default:
        console.log('Sorry, we are out of ' + this.player + '.')
    }

  }

  initSceneDisadvantage() {
    console.log('INIT SCENE DESAVANTAGE')
    this.sceneDisadvantage = new SceneDoorDisavantage(this.initialPrct)
    this.spriteDisadvantage = this.sceneDisadvantage.spriteOutside
    // console.log(this.spriteDisadvantage)
  }

  initSceneAdvantage() {
    console.log('INIT SCENE AVANTAGE')
    this.sceneAdvantage = new SceneDoorAdvantage(this.initialPrct)
    this.spriteAdvantage = this.sceneAdvantage.spriteOutside
    // console.log(this.spriteAdvantage)
  }

  initSceneAdvantageInside() {
    console.log('INIT SCENE AVANTAGE INSIDE')
    this.sceneAdvantageInside = new SceneDoorAdvantageInside(this.initialPrct)
    this.spriteAdvantageInside = this.sceneAdvantageInside.spriteInside
    // console.log(this.spriteAdvantageInside)
  }

  splitScreen(pct) {
    if (this.player === "player2") {
      let diffX = this.baseX - (window.innerWidth * pct)
      let spriteX = window.innerWidth - this.baseX + diffX
      TweenMax.to(this.sprite, 1,{x: spriteX})
      
      if (this.status === 'inferior') {
        let bgX = ((window.innerWidth * pct) - this.spriteDisadvantage.width) / 2
        TweenMax.to(this.spriteDisadvantage.position, 1,{x: bgX})
      } else {
        let bgX = ((window.innerWidth * pct) - this.spriteAdvantage.width) / 2
        TweenMax.to(this.spriteAdvantage.position, 1,{x: bgX})
        TweenMax.to(this.spriteAdvantageInside.position, 1,{x: bgX})
      }
    } else {
      let masxW = (window.innerWidth * pct) - this.marge
      TweenMax.to(this.mask, 1,{width:masxW})

      if (this.status === 'inferior') {
        let bgX = ((window.innerWidth * pct) - this.spriteDisadvantage.width) / 2
      TweenMax.to(this.spriteDisadvantage.position, 1,{x: bgX})
      } else {
        let bgX = ((window.innerWidth * pct) - this.spriteAdvantage.width) / 2
        TweenMax.to(this.spriteAdvantage.position, 1,{x: bgX})
        TweenMax.to(this.spriteAdvantageInside.position, 1,{x: bgX})
      }
    }
  }


  // JUST FOR DEBUG
  enterAnimation(pct) {
    if (this.player === "player2") {
      let diffX = this.baseX - (window.innerWidth * pct)
      let spriteX = window.innerWidth - this.baseX + diffX
      TweenMax.to(this.sprite, 2,{x: spriteX})


      if (this.status === 'inferior') {
        let bgX = ((window.innerWidth * pct) - this.spriteDisadvantage.width) / 2
        TweenMax.to(this.spriteDisadvantage.position, 1,{x: bgX})
      } else {
        let bgX = ((window.innerWidth * pct) - this.spriteAdvantage.width) / 2
        TweenMax.to(this.spriteAdvantage.position, 1,{x: bgX})
        TweenMax.to(this.spriteAdvantageInside.position, 1,{x: bgX})
      }

    } else {
      let masxW = (window.innerWidth * pct) - this.marge
      TweenMax.to(this.mask, 2,{width:masxW})

      if (this.status === 'inferior') {
        let bgX = ((window.innerWidth * pct) - this.spriteDisadvantage.width) / 2
      TweenMax.to(this.spriteDisadvantage.position, 1,{x: bgX})
      } else {
        let bgX = ((window.innerWidth * pct) - this.spriteAdvantage.width) / 2
        TweenMax.to(this.spriteAdvantage.position, 1,{x: bgX})
        TweenMax.to(this.spriteAdvantageInside.position, 1,{x: bgX})
      }

      // TweenMax.to(this.sprite, 2,{alpha: 1})
    }
  }

  addToScene() {
    switch (this.player) {
      case 'player1':
      this.container.mask = this.mask
      this.container.addChild(this.mask)
      if (this.status === 'superior') {
        this.container.addChild(this.spriteAdvantage)
        this.container.addChild(this.spriteAdvantageInside)
      } else {
        this.container.addChild(this.spriteDisadvantage)
      }
        break;
      case 'player2':
      if (this.status === 'superior') {
        this.container.addChild(this.spriteAdvantage)
        this.container.addChild(this.spriteAdvantageInside)
      } else {
        this.container.addChild(this.spriteDisadvantage)
      }
        break;
      default:
        console.log('Sorry, we are out of ' + this.player + '.')
    }
  }

  update() {
    if (this.sceneDisadvantage) {
      this.renderer2D.render(this.sceneDisadvantage.container, this.sceneDisadvantage.rt)
    }

    if (this.sceneAdvantage) {
      this.renderer2D.render(this.sceneAdvantage.container, this.sceneAdvantage.rt)
    }

    if (this.sceneAdvantageInside) {
      this.renderer2D.render(this.sceneAdvantageInside.container, this.sceneAdvantageInside.rt)
    }
    //console.log("scene2 update");
    //console.log("update scene 2");
  }

}