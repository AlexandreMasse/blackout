import {AssetsManager} from "../../../../../managers"
import {SceneDoorAdvantage, SceneDoorDisavantage, SceneDoorAdvantageInside} from './SubScene'
// libs
import * as PIXI from "pixi.js"
import { Howl } from 'howler'
import {TweenMax, TimelineMax, Expo} from 'gsap'
// utils
import {map, setFullScreen} from '../../utils'
// general utils
import {requestTimeout} from '../../../../../utils'
// redux
import {setUserIndicationTitle, setUserIndicationDescription, setUserIndicationActive, setUserIndicationOpen} from "../../../../redux/actions/desktopAction"

export default class SceneDoor {

  constructor({dispatch, store, player, renderer2D}) {
    this.dispatch = dispatch
    this.renderer2D = renderer2D
    this.player = player
    this.store = store
    this.needUpdate = true
    this.needResize = true
    let pct = this.store.users.find(user => user.id === "player1").splitScreenPercentage
    this.status = this.store.users.find(user => user.id === player).status
    this.initialPrct = player === 'player1' ? pct : 1 - pct 
    this.isSceneDoor = true 
    switch (this.status) {
      case 'inferior':
        this.setSoundDisadvantage()
        this.initSceneDisadvantage()
        this.isUserAdvantage = false
        break;
      case 'superior':
      this.setSceneSoundAdv()
      this.initBackgroundSound()
      this.initSceneAdvantage()
      this.initSceneAdvantageInside()
      this.isUserAdvantage = true
        break;
      default:
        console.log('Sorry, we are out of ' + this.status + '.')
    }
    this.initFingerPrintSound()
    this.init()

  }

  //required
  updateStore(newStore) {

    this.currentPlayerFingerprint = this.store.users.find(user => user.id === this.player).fingerprint
    this.newPlayerFingerprint = newStore.users.find(user => user.id === this.player).fingerprint

    if (this.currentPlayerFingerprint !== this.newPlayerFingerprint && this.newPlayerFingerprint === true) {
      if (this.status === 'superior') {
        this.fingerAdvantage.play()
        this.sceneAdvantage.playFingerPrintSpriteSheet()
        const timeline = new TimelineMax({delay: .8})
        // timeline.add('transition')
        timeline.to(this.sceneAdvantage.doorSprite, 2, { ease: Expo.easeOut, x: this.player === 'player1' ? 460:-460}, 0)
        timeline.to(this.spriteAdvantage, .3, {alpha:0}, .35)
        timeline.add(() => {this.doorOpen.play()}, .35)
        timeline.to(this.spriteAdvantageInside, .3, {alpha:1}, 1.2)
        timeline.add(() => {
          this.bgDoor2.play()
          this.bgDoor2.fade(0, 1, 2000)
        }, 1.2)
        // timeline.to(this.spriteAdvantageInside, .2, {alpha:1}, "transition+=2")

        this.dispatch(setUserIndicationTitle({userId: this.player, title: "Sécurisez votre abri"}))
        this.dispatch(setUserIndicationDescription({userId: this.player, description: "Tournez la manivelle pour condamner l’accès."}))
       
        requestTimeout(() => {
          this.dispatch(setUserIndicationOpen({
            userId: this.player,
            isOpen: false
          }))
        }, 3000)
     
      } else {
        this.fingerDisadvantage.play()
        this.sceneDisadvantage.playFingerPrintSpriteSheet()
        this.codeDesktop.play()

        this.dispatch(setUserIndicationTitle({userId: this.player, title: "Entrez le mot de passe"}))
        this.dispatch(setUserIndicationDescription({userId: this.player, description: "Tournez les roues jusqu’à trouver la bonne combinaison."}))
      
        requestTimeout(() => {
          this.dispatch(setUserIndicationOpen({
            userId: this.player,
            isOpen: false
          }))
        }, 3000)
      }
    }

    this.currentPlayerHandle = this.store.users.find(user => user.id === this.player).handle
    this.newPlayerHandle = newStore.users.find(user => user.id === this.player).handle
    
    if (this.currentPlayerHandle !== this.newPlayerHandle) {
      if (this.player === "player2") {
        var mapValue  = map(this.newPlayerHandle, 0, 1, 460, 0)
      } else {
        var mapValue  = map(this.newPlayerHandle, 0, 1, -460, 0)
      }
      TweenMax.to(this.sceneAdvantageInside.doorSprite, 2.3, {x:mapValue})
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
    this.marge = 1.5
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
        // console.log('PLAYER=====',this.player)
        this.dispatch(setUserIndicationTitle({userId: this.player, title: "Accédez au refuge"}))
        this.dispatch(setUserIndicationDescription({userId: this.player, description: "Apposez votre doigt sur l’écran pour vous identifier."}))
        requestTimeout(() => {
          this.dispatch(setUserIndicationActive({
            userId: this.player,
            isActive: true
          }))
        }, 2000)
        break;
      case 'inferior':
      setFullScreen(this.spriteDisadvantage, this.spriteDisadvantage.width, this.spriteDisadvantage.height, this.containerSize.width)
      // console.log('PLAYER YO=====',this.player)
      this.dispatch(setUserIndicationTitle({userId: this.player, title: "Accédez au refuge"}))
      this.dispatch(setUserIndicationDescription({userId: this.player, description: "Apposez votre doigt sur l’écran pour vous identifier."}))
      this.dispatch(setUserIndicationActive({
        userId: this.player,
        isActive: true
      }))
        break;
      default:
        console.log('Sorry, we are out of ' + this.player + '.')
    }
  }

  initFingerPrintSound() {
    const fingerAdvantageAsset = AssetsManager.get('fingerprintAdvandtage')
    const fingerDisadvantageAsset = AssetsManager.get('fingerprintDisadvandtage')
    this.fingerAdvantage = new Howl({
      src: fingerAdvantageAsset.src,
      volume: .5,
      html5: true,
      preload: true,
      autoplay: false,
      loop: false,
      format: ['mp3']
    })

    this.fingerDisadvantage = new Howl({
      src: fingerDisadvantageAsset.src,
      volume: .5,
      html5: true,
      preload: true,
      autoplay: false,
      loop: false,
      format: ['mp3']
    })
  }


  initBackgroundSound() {
    const loveAsset = AssetsManager.get('love')
    const bassesAsset = AssetsManager.get('basses')
    const wavedeepAsset = AssetsManager.get('wavedeep')
    const bgDoor1Asset = AssetsManager.get('bgDoor1')
    const bgDoor2Asset = AssetsManager.get('bgDoor2')
    const doorClosingAsset = AssetsManager.get('doorClosing')
    const doorClosedAsset = AssetsManager.get('doorClosed')

    this.loveSound = new Howl({
      src: loveAsset.src,
      volume: .5,
      html5: true,
      preload: true,
      autoplay: false,
      loop: true,
      format: ['mp3']
    })

    this.bassesSound = new Howl({
      src: bassesAsset.src,
      volume: .5,
      html5: true,
      preload: true,
      autoplay: false,
      loop: true,
      format: ['mp3']
    })

    this.wavedeepSound = new Howl({
      src: wavedeepAsset.src,
      volume: .5,
      html5: true,
      preload: true,
      autoplay: false,
      loop: true,
      format: ['mp3']
    })

    this.bgDoor1 = new Howl({
      src: bgDoor1Asset.src,
      volume: .5,
      html5: true,
      preload: true,
      autoplay: false,
      loop: true,
      format: ['mp3']
    })

    this.bgDoor2 = new Howl({
      src: bgDoor2Asset.src,
      volume: 1,
      html5: true,
      preload: true,
      autoplay: false,
      loop: true,
      format: ['mp3']
    })

    this.doorClosing = new Howl({
      src: doorClosingAsset.src,
      volume: .85,
      html5: true,
      preload: true,
      autoplay: false,
      loop: true,
      format: ['mp3']
    })

    this.doorClosed = new Howl({
      src: doorClosedAsset.src,
      volume: .65,
      html5: true,
      preload: true,
      autoplay: false,
      loop: false,
      format: ['mp3']
    })

    this.loveSound.play()
    this.loveSound.fade(0, .3, 4000)

    this.wavedeepSound.play()
    this.wavedeepSound.fade(0, .5, 4000)

    this.bassesSound.play()
    this.bassesSound.fade(0, .5, 4000)

    this.bgDoor1.play()
    this.bgDoor1.fade(0, .5, 4000)
  }

  playDoorClosing() {
    // console.log('CLOSING THE DOOR')
    this.doorClosing.play()
    this.doorClosing.fade(0, .85, 1000)
  }

  playDoorAlmostClose() {
    // console.log('THE DOOR IS CLOOOOSED')
    this.doorClosed.play()
    this.doorClosed.fade(0, .85, 500)

    this.loveSound.fade(.3, 0, 500)
    this.loveSound.once( 'fade', () => {this.loveSound.stop()})
 
    this.wavedeepSound.fade(.5, 0, 500)
    this.wavedeepSound.once( 'fade', () => {this.wavedeepSound.stop()})

    this.bassesSound.fade(.5, 0, 500)
    this.bassesSound.once( 'fade', () => {this.bassesSound.stop()})

    this.doorClosing.fade(.85, 0, 500)
    this.doorClosing.once( 'fade', () => {this.doorClosing.stop()})

    this.bgDoor2.fade(1, 0, 500)
    this.bgDoor2.once( 'fade', () => {this.bgDoor2.stop()})
  }

  stopSoundBgDoor1() {
    this.bgDoor1.fade(.5, 0, 500)
    this.bgDoor1.once( 'fade', () => {this.bgDoor1.stop()})
  }

  setSceneSoundAdv() {
    const doorOpenAsset = AssetsManager.get('doorOpen')

    this.doorOpen = new Howl({
      src: doorOpenAsset.src,
      volume: .8,
      html5: true,
      preload: true,
      autoplay: false,
      loop: false,
      format: ['mp3']
    })
  }

  setSoundDisadvantage() {
    const codeDesktopAsset = AssetsManager.get('codeDesktop')

    this.codeDesktop = new Howl({
      src: codeDesktopAsset.src,
      volume: .8,
      html5: true,
      preload: true,
      autoplay: false,
      loop: false,
      format: ['mp3']
    })
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
    this.sceneAdvantageInside = new SceneDoorAdvantageInside(this.initialPrct, this.player)
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

  resize() {
    switch (this.status) {
      case 'superior':
      this.containerSize.width = window.innerWidth * this.initialPrct
        setFullScreen(this.spriteAdvantage, this.spriteAdvantage.width, this.spriteAdvantage.height, this.containerSize.width)
        setFullScreen(this.spriteAdvantageInside, this.spriteAdvantageInside.width, this.spriteAdvantageInside.height, this.containerSize.width)
        break;
      case 'inferior':
        this.containerSize.width = window.innerWidth * this.initialPrct
        setFullScreen(this.spriteDisadvantage, this.spriteDisadvantage.width, this.spriteDisadvantage.height, this.containerSize.width)
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