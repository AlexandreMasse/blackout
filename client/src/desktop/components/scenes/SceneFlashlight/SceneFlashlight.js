import * as PIXI from "pixi.js"
import * as dat from 'dat.gui'

import {AssetsManager} from "../../../../managers"
import {TweenMax, RoughEase} from 'gsap'
//redux
import {setCurrentScene} from "../../../redux/actions/desktopAction"
import {wsEmitCurrentStep} from '../../../redux/actions/websockets/websocketsAction'
//scenes
import scenes from ".."
import stepsMobile from '../../../../mobile/components/steps'
// utils
import {setFullScreen, collisionDetection} from '../utils'

export default class SceneFlashlight {

  constructor({dispatch, store}) {
    this.dispatch = dispatch
    this.store = store
    this.needUpdate = true;
    this.isOff = true
    this.isOff2 = true
    this.isMoving = false
    this.isMoving2 = false
    this.player1Collision = false
    this.player2Collision = false
    this.init()
  }

  // required
  updateStore(newStore) {
    this.currentPlayer1Position = this.store.users.find(user => user.id === "player1").position
    this.newPlayer1Position = newStore.users.find(user => user.id === "player1").position

    if (this.currentPlayer1Position !== this.newPlayer1Position) {
      // player1 position has changed
      if (this.isOff) {
        this.switchOnLight()
      }
      if (this.canMove) {
        this.moveFlashLight()
      }
    }

    this.currentPlayer2Position = this.store.users.find(user => user.id === "player2").position
    this.newPlayer2Position = newStore.users.find(user => user.id === "player2").position

    if (this.currentPlayer2Position !== this.newPlayer2Position) {
      // player2 position has changed
      if (this.isOff2) {
        this.switchOnLight2()
      }
      this.moveFlashLight2()
    }

    //update store
    this.store = newStore
  }


  init() {
    console.log("scene flashlight init")
    this.container = new PIXI.Container()
    this.initBackgroundUser()
    this.initBackgroundUser2()
    this.detectionBox()
    this.fillBox()
    this.player2Collision = true
    this.isDiscover = false
    this.addToScene()
    this.brt = new PIXI.BaseRenderTexture(this.sceneWH.width, this.sceneWH.height, PIXI.SCALE_MODES.LINEAR, 1)
    this.rt = new PIXI.RenderTexture(this.brt)
    this.sprite = new PIXI.Sprite(this.rt)
    setFullScreen(this.sprite, this.sceneWH.width, this.sceneWH.height)
    // this.initGUI()
  }

  switchOnLight() {
    this.canMove = false
    TweenMax.to(this.spriteFlashOff, .3, {alpha:0})
    TweenMax.to(this.spriteBureau1, 1.2, {alpha:1, ease:RoughEase.ease.config({points:6, strength:5, clamp:true})})
    TweenMax.to(this.spriteBureau2, 1.2, {alpha:1, ease:RoughEase.ease.config({points:6, strength:5, clamp:true})})
    TweenMax.to(this.spriteBureau3, 1.2, {alpha:1, ease:RoughEase.ease.config({points:6, strength:5, clamp:true}), onComplete: () => {
      this.canMove = true
    }})
    this.isOff = false
  }

  switchOffLight() {
    TweenMax.to(this.spriteFlashOff, .3, {alpha:1 , delay:1, onComplete:() => {
      this.isOff = true
    }})
    TweenMax.to(this.spriteBureau1, 1, {alpha:0, ease:RoughEase.ease.config({points:10, strength:2, clamp:true}), delay:1})
    TweenMax.to(this.spriteBureau2, 1, {alpha:0, ease:RoughEase.ease.config({points:10, strength:2, clamp:true}), delay:1})
    TweenMax.to(this.spriteBureau3, 1, {alpha:0, ease:RoughEase.ease.config({points:10, strength:2, clamp:true}), delay:1})
  }

  switchOnLight2() {
    TweenMax.to(this.spriteFlashOff_2, .3, {alpha:0})
    TweenMax.to(this.spriteBureau1_2, 1.2, {alpha:1, ease:RoughEase.ease.config({points:6, strength:5, clamp:true})})
    TweenMax.to(this.spriteBureau2_2, 1.2, {alpha:1, ease:RoughEase.ease.config({points:6, strength:5, clamp:true})})
    TweenMax.to(this.spriteBureau3_2, 1.2, {alpha:1, ease:RoughEase.ease.config({points:6, strength:5, clamp:true}), onComplete: () => {
      console.log('finito 2')
      this.canMove2 = true
    }})
    this.isOff2 = false
  }

  switchOffLight2() {
    TweenMax.to(this.spriteFlashOff_2, 1, {alpha:1 , delay:1, onComplete:() => {
      this.isOff = true
    }})
    TweenMax.to(this.spriteBureau1_2, 1, {alpha:1, ease:RoughEase.ease.config({points:10, strength:2, clamp:true}), delay:1})
    TweenMax.to(this.spriteBureau2_2, 1, {alpha:1, ease:RoughEase.ease.config({points:10, strength:2, clamp:true}), delay:1})
    TweenMax.to(this.spriteBureau3_2, 1, {alpha:1, ease:RoughEase.ease.config({points:10, strength:2, clamp:true}), delay:1})
  }

  fillBox() {
    this.fillbox = new PIXI.Graphics()
    this.fillbox.beginFill(0xE82E2E)
    this.fillbox.drawRect(0, 0, 102, 54)
    this.fillbox.endFill()
    this.fillbox.x = 1169
    this.fillbox.y = 773 + 54
    this.fillbox.alpha = .95

    this.fillbox.height = 0
    this.fillbox.pivot.y = 54
    this.fillbox.mask = this.mask1

  }

  discoverAnimation() {
    TweenMax.to(this.fillbox, 2, {height:54, onComplete: () => {
      this.nextScene()
    }})
    this.isDiscover = true
  }

  nextScene() {
    TweenMax.to(this.spriteBureau1, .8, {alpha:0, ease:RoughEase.ease.config({points:3, strength:5, clamp:true})})
    TweenMax.to(this.spriteBureau2, .8, {alpha:0, ease:RoughEase.ease.config({points:3, strength:5, clamp:true})})
    TweenMax.to(this.spriteBureau3, .8, {alpha:0, ease:RoughEase.ease.config({points:3, strength:5, clamp:true})})

    TweenMax.to(this.spriteBureau1_2, .8, {alpha:0, ease:RoughEase.ease.config({points:3, strength:5, clamp:true})})
    TweenMax.to(this.spriteBureau2_2, .8, {alpha:0, ease:RoughEase.ease.config({points:3, strength:5, clamp:true})})
    TweenMax.to(this.spriteBureau3_2, .8, {alpha:0, ease:RoughEase.ease.config({points:3, strength:5, clamp:true}),onComplete: () => {
        console.log('vers la scène suivante mané')
        const currentStep = stepsMobile.SLIDER.name
        this.dispatch(setCurrentScene(scenes.SCENEGENERATOR.name))
        this.dispatch(wsEmitCurrentStep({currentStep}))
    }})
  }

  detectionBox() {
    // CIRCLE DETECTION
    this.circleDetection = new PIXI.Graphics()
    this.circleDetection.beginFill('0xff0000')
    this.circleDetection.drawCircle(0, 0, 120)
    this.circleDetection.endFill()

    this.circleDetection.x = this.sceneWH.width / 2
    this.circleDetection.y = this.sceneWH.height / 2
    
    this.circleDetection.alpha = 0


    // CIRCLE DETECTION 2
    this.circleDetection_2 = new PIXI.Graphics()
    this.circleDetection_2.beginFill('0xff0000')
    this.circleDetection_2.drawCircle(0, 0, 120)
    this.circleDetection_2.endFill()

    this.circleDetection_2.x = this.sceneWH.width / 2
    this.circleDetection_2.y = this.sceneWH.height / 2
    
    this.circleDetection_2.alpha = 0

    // BOX DETECTION
    this.box = new PIXI.Graphics()
    this.box.beginFill(0x000000)
    this.box.drawRect(0, 0, 150, 150)
    this.box.endFill()
    this.box.x = 1300
    this.box.y = 855
    this.box.alpha = 0
  }

  moveFlashLight() {
    this.isMoving = true
    const player1Position = {
      x: this.currentPlayer1Position.x * (this.sceneWH.width * .5),
      y: this.currentPlayer1Position.y * (this.sceneWH.height * .5)
    }
    // const mulplicator = 1
    // const mulplicatorY = 1
      let newPositionX = (player1Position.x) + (this.sceneWH.width / 2) 
      let newPositionY = (player1Position.y) + (this.sceneWH.height / 2)
      TweenMax.to(this.maskUSer[0], 0.1, {x:newPositionX, y:newPositionY})
      TweenMax.to(this.maskUSer[1], 0.1, {x:newPositionX, y:newPositionY})
      TweenMax.to(this.maskUSer[2], 0.1, {x:newPositionX, y:newPositionY})
      
      TweenMax.to(this.spriteFlashOff, 0.1, {x:newPositionX - (this.spriteFlashOff.width / 2), y:newPositionY - (this.spriteFlashOff.height / 2) })
      TweenMax.to(this.circleDetection, 0.1, {x:newPositionX, y:newPositionY ,onComplete: () => {
        this.isMoving = false 
      }})
   
  }

  moveFlashLight2() {
    this.isMoving2 = true
    const player2Position = {
      x: this.currentPlayer2Position.x * (this.sceneWH.width * .5),
      y: this.currentPlayer2Position.y * (this.sceneWH.height * .5)
    }
    // const mulplicator = 1
    // const mulplicatorY = 1
    let newPositionX = (player2Position.x) + (this.sceneWH.width / 2)
    let newPositionY = (player2Position.y) + (this.sceneWH.height / 2)

    TweenMax.to(this.maskUSer2[0], 0.1, {x:newPositionX, y:newPositionY})
    TweenMax.to(this.maskUSer2[1], 0.1, {x:newPositionX, y:newPositionY})
    TweenMax.to(this.maskUSer2[2], 0.1, {x:newPositionX, y:newPositionY})

    TweenMax.to(this.spriteFlashOff_2, 0.1, {x:newPositionX - (this.spriteFlashOff_2.width / 2), y:newPositionY - (this.spriteFlashOff_2.height / 2) })
    TweenMax.to(this.circleDetection_2, 0.1, {x:newPositionX, y:newPositionY ,onComplete: () => {
      this.isMoving2 = false
    }})
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
    this.spriteOutline = new PIXI.Sprite(tOutline)

    this.spriteBureau1.alpha = 0
    this.spriteBureau2.alpha = 0
    this.spriteBureau3.alpha = 0
    this.spriteOutline.alpha = .2

    this.sceneWH = {
      width: this.spriteBureau1.width,
      height: this.spriteBureau1.height
    }

    this.initMaskUser()
    this.initFlashOff()
    this.outlineAnimation()
    // this.container.addChild(spriteOutline)
  }

  initBackgroundUser2() {
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

    this.spriteBureau1_2 = new PIXI.Sprite(tBureau1)
    this.spriteBureau2_2 = new PIXI.Sprite(tBureau2)
    this.spriteBureau3_2 = new PIXI.Sprite(tBureau3)
    this.spriteOutline_2 = new PIXI.Sprite(tOutline)

    this.spriteBureau1_2.alpha = 0
    this.spriteBureau2_2.alpha = 0
    this.spriteBureau3_2.alpha = 0
    this.spriteOutline_2.alpha = 0

    this.initMaskUser2()
    this.initFlashOff2()
    this.outlineAnimation2()
  }

  initFlashOff() {
    const flashoff = AssetsManager.get('flashoff')
    const baseTextureFlashOff = new PIXI.BaseTexture(flashoff)
    const tFlashOff = new PIXI.Texture(baseTextureFlashOff)
    this.spriteFlashOff = new PIXI.Sprite(tFlashOff)

    this.spriteFlashOff.x = (this.sceneWH.width / 2) - (this.spriteFlashOff.width / 2) - (this.sceneWH.width / 4)
    this.spriteFlashOff.y = this.sceneWH.height / 2 - (this.spriteFlashOff.height / 2)
  }

  initFlashOff2() {
    const flashoff = AssetsManager.get('flashoff')
    const baseTextureFlashOff = new PIXI.BaseTexture(flashoff)
    const tFlashOff = new PIXI.Texture(baseTextureFlashOff)
    this.spriteFlashOff_2 = new PIXI.Sprite(tFlashOff)

    this.spriteFlashOff_2.x = (this.sceneWH.width / 2) - (this.spriteFlashOff_2.width / 2) + (this.sceneWH.width / 4)
    this.spriteFlashOff_2.y = this.sceneWH.height / 2 - (this.spriteFlashOff_2.height / 2)
  }

  initMaskUser() {
    this.maskUSer = []
    const maskRadius1 = 240
    const maskRadius2 = 200
    const maskRadius3 = 160
    
    // CIRCLE MASK 1
    this.mask1 = new PIXI.Graphics()
    this.mask1.beginFill('0xffffff')
    this.mask1.drawCircle(0, 0, maskRadius1)
    this.mask1.endFill()

    this.mask1.x = this.sceneWH.width / 2 - (this.sceneWH.width / 4)
    this.mask1.y = this.sceneWH.height / 2

    this.maskUSer.push(this.mask1)
    // CIRCLE MASK 2
    this.mask2 = new PIXI.Graphics()
    this.mask2.beginFill('0xffffff')
    this.mask2.drawCircle(0, 0, maskRadius2)
    this.mask2.endFill()

    this.mask2.x = this.sceneWH.width / 2 - (this.sceneWH.width / 4)
    this.mask2.y = this.sceneWH.height / 2
    
    this.maskUSer.push(this.mask2)

    // CIRCLE MASK 3
    this.mask3 = new PIXI.Graphics()
    this.mask3.beginFill('0xffffff')
    this.mask3.drawCircle(0, 0, maskRadius3)
    this.mask3.endFill()

    this.mask3.x = this.sceneWH.width / 2 - (this.sceneWH.width / 4)
    this.mask3.y = this.sceneWH.height / 2 
    this.maskUSer.push(this.mask3)
    
    // SET MASK TO SPRITE
    this.spriteBureau1.mask = this.mask1
    this.spriteBureau2.mask = this.mask2
    this.spriteBureau3.mask = this.mask3
    this.spriteOutline.mask = this.mask1
  }

  initMaskUser2() {
    this.maskUSer2 = []
    const maskRadius1 = 240
    const maskRadius2 = 200
    const maskRadius3 = 160
    
    // CIRCLE MASK 1
    this.mask1_2 = new PIXI.Graphics()
    this.mask1_2.beginFill('0xffffff')
    this.mask1_2.drawCircle(0, 0, maskRadius1)
    this.mask1_2.endFill()

    this.mask1_2.x = this.sceneWH.width / 2 
    this.mask1_2.y = this.sceneWH.height / 2

    this.maskUSer2.push(this.mask1_2)
    // CIRCLE MASK 2
    this.mask2_2 = new PIXI.Graphics()
    this.mask2_2.beginFill('0xffffff')
    this.mask2_2.drawCircle(0, 0, maskRadius2)
    this.mask2_2.endFill()

    this.mask2_2.x = this.sceneWH.width / 2 
    this.mask2_2.y = this.sceneWH.height / 2
    
    this.maskUSer2.push(this.mask2_2)

    // CIRCLE MASK 3
    this.mask3_2 = new PIXI.Graphics()
    this.mask3_2.beginFill('0xffffff')
    this.mask3_2.drawCircle(0, 0, maskRadius3)
    this.mask3_2.endFill()

    this.mask3_2.x = this.sceneWH.width / 2
    this.mask3_2.y = this.sceneWH.height / 2

    this.maskUSer2.push(this.mask3_2)
    
    // SET MASK TO SPRITE
    this.spriteBureau1_2.mask = this.mask1_2
    this.spriteBureau2_2.mask = this.mask2_2
    this.spriteBureau3_2.mask = this.mask3_2
    this.spriteOutline_2.mask = this.mask1_2
  }

  outlineAnimation() {
    TweenMax.to(this.spriteOutline, .3, {alpha:1, repeat: -1, repeatDelay: 1, yoyo:true})
  }

  outlineAnimation2() {
    TweenMax.to(this.spriteOutline_2, .3, {alpha:1, repeat: -1, repeatDelay: 1, yoyo:true})
  }

  addToScene() {
    // user 1 
    this.container.addChild(this.mask3)
    this.container.addChild(this.mask2)
    this.container.addChild(this.mask1)
    this.container.addChild(this.spriteBureau3)
    this.container.addChild(this.spriteBureau2)
    this.container.addChild(this.spriteBureau1)
    this.container.addChild(this.box)
    this.container.addChild(this.circleDetection)
    this.container.addChild(this.spriteFlashOff)
    this.container.addChild(this.spriteOutline)
    
    // user 2
    this.container.addChild(this.mask3_2)
    this.container.addChild(this.mask2_2)
    this.container.addChild(this.mask1_2)
    this.container.addChild(this.spriteBureau3_2)
    this.container.addChild(this.spriteBureau2_2)
    this.container.addChild(this.spriteBureau1_2)
    this.container.addChild(this.circleDetection_2)
    this.container.addChild(this.spriteFlashOff_2)
    this.container.addChild(this.spriteOutline_2)
    
    this.container.addChild(this.fillbox)
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
    f1.add(fillBoxPos, 'height', 0, 200, 0.1).onChange(fillBoxChanger)

    this.gui.close()
  }
  update() {
    // console.log("update scene flashlight");
    if (this.isMoving) {
      if (collisionDetection(this.circleDetection, this.box)) {
        this.player1Collision = true
        // console.log('COLLISIIIIIOOON 1')
      } else {
        this.player1Collision = false
      }
    }

    if (this.isMoving2) {
      if (collisionDetection(this.circleDetection_2, this.box)) {
        // console.log('COLLISIIIIIOOON 2')
        this.player2Collision = true
      } else {
        this.player2Collision = false
      }
    }

    if (this.player1Collision && this.player2Collision) {
      if (!this.isDiscover) {
        console.log('ok go go go')
        this.discoverAnimation()
      }
    } 
  }
}
