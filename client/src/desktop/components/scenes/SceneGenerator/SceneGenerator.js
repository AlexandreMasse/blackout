import {AssetsManager} from "../../../../managers"
import * as PIXI from "pixi.js"
import { Howl } from 'howler'
import * as dat from 'dat.gui'
import {TweenMax} from 'gsap'
import {map, setFullScreen} from '../utils'

// redux
import {setCurrentScene} from "../../../redux/actions/desktopAction"
import {wsEmitCurrentStep} from '../../../redux/actions/websockets/websocketsAction'
//scenes
import scenes from ".."

export default class SceneGenerator {

  constructor({dispatch, store}) {
    this.dispatch = dispatch
    this.store = store
    this.needUpdate = true;
    this.player1Ready = false
    // FOR DEBUG
    this.player2Ready = true
    // FOR DEBUG
    this.isReady = true
    this.initBackgroundSound()
    this.init()
  }

  //required
  updateStore(newStore) {
    this.currentPlayer1SliderValue = this.store.users.find(user => user.id === "player1").sliderValue
    this.newPlayer1SliderValue = newStore.users.find(user => user.id === "player1").sliderValue

    if (this.newPlayer1SliderValue) {
      let value = parseInt(this.newPlayer1SliderValue, 10)
      let mapValue  = map(value, 0, 100, 0, 648)
      TweenMax.to(this.fillbox, .1, {height:mapValue})
      this.player1Ready = value === 100 ? true : false 
    }

    this.currentPlayer2SliderValue = this.store.users.find(user => user.id === "player2").sliderValue
    this.newPlayer2SliderValue = newStore.users.find(user => user.id === "player2").sliderValue

    if (this.newPlayer2SliderValue) {
      let value2 = parseInt(this.newPlayer2SliderValue, 10)
      let mapValue2  = map(value2, 0, 100, 0, 648)
      TweenMax.to(this.fillbox2, .1, {height:mapValue2})
      this.player2Ready = value2 === 100 ? true : false 
    }

    if (this.player1Ready && this.player2Ready) {
      if (this.isReady) {
        this.nextScene()
      }
      this.isReady = false
    }
    //update store
    this.store = newStore
  }

  initBackgroundSound() {
    const generatorSoundAsset = AssetsManager.get('generatorSound')
    this.generatorSound = new Howl({
      src: generatorSoundAsset.src,
      volume: 0.2,
      html5: true,
      preload: true,
      autoplay: false,
      loop: true,
      format: ['mp3']
    })
  }

  init() {
    console.log("scene generator init")

    this.width = window.innerWidth
    this.height = window.innerHeight
    this.container = new PIXI.Container()
    let generatorImg = AssetsManager.get('generator')
    let baseTexture = new PIXI.BaseTexture(generatorImg)
    let texture = new PIXI.Texture(baseTexture)
    this.generatorSprite = new PIXI.Sprite(texture)
    
    this.spriteSize = {
      width:this.generatorSprite.width,
      height: this.generatorSprite.height
    }

    this.initFillBox()
    this.initFillBox2()
    this.initNumberSpriteSheet()
    this.initTraitSpriteSheet()
    this.initSinSpriteShet()
    this.initPointSpritesheet()
    this.initButtonSpritesheet()
    this.addToScene()
    // this.initGUI()
    this.brt = new PIXI.BaseRenderTexture(this.spriteSize.width, this.spriteSize.height, PIXI.SCALE_MODES.LINEAR, 1)
    this.rt = new PIXI.RenderTexture(this.brt)
    this.sprite = new PIXI.Sprite(this.rt)
    setFullScreen(this.sprite, this.spriteSize.width, this.spriteSize.height)
  }

  nextScene() {
    const currentStep = null
    this.dispatch(setCurrentScene(scenes.SCENEKINEMATIC2.name))
    this.dispatch(wsEmitCurrentStep({currentStep}))
  }

  initNumberSpriteSheet() {
    const topNumber = AssetsManager.get('topNumber')
    topNumber.parse(() => {
      let textures = Object.keys(topNumber.textures).map((t) => topNumber.textures[t])
      this.topNumberAnim = new PIXI.extras.AnimatedSprite(textures)
      this.topNumberAnim.animationSpeed = (5/60)
      this.topNumberAnim.play()
    })
    
    const rightNumber = AssetsManager.get('rightNumber')
    rightNumber.parse(() => {
      let textures = Object.keys(rightNumber.textures).map((t) => rightNumber.textures[t])
      this.rightNumberAnim = new PIXI.extras.AnimatedSprite(textures)
      this.rightNumberAnim.animationSpeed = (5/60)
      this.rightNumberAnim.play()
    })

  }

  initTraitSpriteSheet() {
    const trait1Spritesheet = AssetsManager.get('trait1')
    const trait2Spritesheet = AssetsManager.get('trait2')
    const trait3Spritesheet = AssetsManager.get('trait3')

    trait1Spritesheet.parse(() => {
      let textures = Object.keys(trait1Spritesheet.textures).map((t) => trait1Spritesheet.textures[t])
      this.trait1anim = new PIXI.extras.AnimatedSprite(textures)
      this.trait1anim.animationSpeed = (5/60)
      this.trait1anim.play()
    })

    trait2Spritesheet.parse(() => {
      let textures = Object.keys(trait2Spritesheet.textures).map((t) => trait2Spritesheet.textures[t])
      this.trait2anim = new PIXI.extras.AnimatedSprite(textures)
      this.trait2anim.animationSpeed = (5/60)
      this.trait2anim.play()
    })

    trait3Spritesheet.parse(() => {
      let textures = Object.keys(trait3Spritesheet.textures).map((t) => trait3Spritesheet.textures[t])
      this.trait3anim = new PIXI.extras.AnimatedSprite(textures)
      this.trait3anim.animationSpeed = (5/60)
      this.trait3anim.play()
    })
  }

  initSinSpriteShet() {
    const sinSpritesheet = AssetsManager.get('sinAnim')

    sinSpritesheet.parse(() => {
      let textures = Object.keys(sinSpritesheet.textures).map((t) => sinSpritesheet.textures[t])
      this.sinanim = new PIXI.extras.AnimatedSprite(textures)
      this.sinanim.animationSpeed = (6/60)
      this.sinanim.play()
    })
  }

  initPointSpritesheet() {
    const topPointSpritesheet = AssetsManager.get('topPoint')
    const circleSpritesheet = AssetsManager.get('circle')
    const middlePointSpritesheet = AssetsManager.get('middlePoint')

    topPointSpritesheet.parse(() => {
      let textures = Object.keys(topPointSpritesheet.textures).map((t) => topPointSpritesheet.textures[t])
      this.topPointanim = new PIXI.extras.AnimatedSprite(textures)
      this.topPointanim.animationSpeed = (24/60)
      this.topPointanim.play()
    })
    
    circleSpritesheet.parse(() => {
      let textures = Object.keys(circleSpritesheet.textures).map((t) => circleSpritesheet.textures[t])
      this.circleanim = new PIXI.extras.AnimatedSprite(textures)
      this.circleanim.animationSpeed = (24/60)
      this.circleanim.play()
    })

    middlePointSpritesheet.parse(() => {
      let textures = Object.keys(middlePointSpritesheet.textures).map((t) => middlePointSpritesheet.textures[t])
      this.middlePointanim = new PIXI.extras.AnimatedSprite(textures)
      this.middlePointanim.animationSpeed = (24/60)
      this.middlePointanim.play()
    })
  }

  initButtonSpritesheet() {
    const button1Spritesheet = AssetsManager.get('button1')
    const button2Spritesheet = AssetsManager.get('button2')
    const button3Spritesheet = AssetsManager.get('button3')

    button1Spritesheet.parse(() => {
      let textures = Object.keys(button1Spritesheet.textures).map((t) => button1Spritesheet.textures[t])
      this.button1anim = new PIXI.extras.AnimatedSprite(textures)
      this.button1anim.animationSpeed = (2/60)
      this.button1anim.play()
    })
    
    button2Spritesheet.parse(() => {
      let textures = Object.keys(button2Spritesheet.textures).map((t) => button2Spritesheet.textures[t])
      this.button2anim = new PIXI.extras.AnimatedSprite(textures)
      this.button2anim.animationSpeed = (2/60)
      this.button2anim.play()
    })

    button3Spritesheet.parse(() => {
      let textures = Object.keys(button3Spritesheet.textures).map((t) => button3Spritesheet.textures[t])
      this.button3anim = new PIXI.extras.AnimatedSprite(textures)
      this.button3anim.animationSpeed = (5/60)
      this.button3anim.play()
    })
  }

  initFillBox() {
    this.fillbox = new PIXI.Graphics()
    this.fillbox.beginFill(0xE82E2E)
    this.fillbox.drawRect(0, 0, 140, 400)
    this.fillbox.endFill()
    this.fillbox.x = 785
    this.fillbox.y = 648
    this.fillbox.height = 0
    this.fillbox.pivot.y = 400
  }

  initFillBox2() {
    this.fillbox2 = new PIXI.Graphics()
    this.fillbox2.beginFill(0xE82E2E)
    this.fillbox2.drawRect(0, 0, 140, 400)
    this.fillbox2.endFill()
    this.fillbox2.x = 985
    this.fillbox2.y = 648
    this.fillbox2.height = 0
    this.fillbox2.pivot.y = 400
  }

  initGUI() {
    this.gui = new dat.GUI({ autoPlace: false })
    var customContainer = document.querySelector('.desktop-app')
    customContainer.appendChild(this.gui.domElement)
    const fillBoxPos = {
      x: this.fillbox.x,
      y: this.fillbox.y,
      width: this.fillbox.width,
      height: this.fillbox.height
    }

    let fillBoxChanger = () => {
        this.fillbox.x = fillBoxPos.x
        this.fillbox.y = fillBoxPos.y
        this.fillbox.width = fillBoxPos.width
        this.fillbox.height = fillBoxPos.height
    }

    let f1 = this.gui.addFolder('Fill Box')
    f1.add(fillBoxPos, 'x', 0, 1920, 0.1).onChange(fillBoxChanger)
    f1.add(fillBoxPos, 'y', 0, 900, 0.1).onChange(fillBoxChanger)
    f1.add(fillBoxPos, 'width', 0, 200, 0.1).onChange(fillBoxChanger)
    f1.add(fillBoxPos, 'height', 0, 2000, 0.1).onChange(fillBoxChanger)


    const topNumber = {
      animationSpeed: this.topNumberAnim.animationSpeed,
    }

    let topNumberChanger = () => {
        this.topNumberAnim.animationSpeed = topNumber.speed      
    }

    let f2 = this.gui.addFolder('Top Number Animation')
    f2.add(topNumber, 'animationSpeed', 0, 1, 0.1).onChange(topNumberChanger)
    this.gui.close()
  }

  addToScene() {
    this.container.addChild(this.fillbox)
    this.container.addChild(this.fillbox2)
    this.container.addChild(this.generatorSprite)
    this.container.addChild(this.topNumberAnim)
    this.container.addChild(this.rightNumberAnim)
    this.container.addChild(this.trait1anim)
    this.container.addChild(this.trait2anim)
    this.container.addChild(this.trait3anim)
    this.container.addChild(this.sinanim)
    this.container.addChild(this.topPointanim)
    this.container.addChild(this.middlePointanim)
    this.container.addChild(this.circleanim)
    this.container.addChild(this.button1anim)
    this.container.addChild(this.button2anim)
    this.container.addChild(this.button3anim)
  }

  update() {
    //console.log("scene2 update");
    //console.log("update scene 2");
  }

}