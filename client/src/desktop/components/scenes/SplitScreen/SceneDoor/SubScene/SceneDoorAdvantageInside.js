import {AssetsManager} from "../../../../../../managers";
import * as PIXI from "pixi.js";
import {TweenMax} from 'gsap'
import {map, setFullScreen} from '../../../utils'
import * as dat from 'dat.gui'

export default class SceneDoorAdvantageInside {
    constructor(pct, player) {
        this.initialPct = pct
        this.player = player
        this.init()
        // this.initGUI()
    }

    init() {
        let width = window.innerWidth
        let height = window.innerHeight
        this.container = new PIXI.Container()
        let insideImg = AssetsManager.get('insideWall')
        let baseTexture = new PIXI.BaseTexture(insideImg)
        let texture = new PIXI.Texture(baseTexture)
        this.insideSprite = new PIXI.Sprite(texture)
        
        let doorImg = AssetsManager.get('insideDoor')
        let baseTextureDoor = new PIXI.BaseTexture(doorImg)
        let textureDoor = new PIXI.Texture(baseTextureDoor)
        this.doorSprite = new PIXI.Sprite(textureDoor)
        this.doorSprite.x = this.player === "player2" ? 460 : -460
      
        this.containerSize = {width:width * this.initialPct, height:height}
        this.spriteSize = {
          width: this.insideSprite.width,
          height: this.insideSprite.height
        }

        this.initAlertOverlay()
        this.initBidulesSpriteSheet()
        this.addToScene()

        this.brt = new PIXI.BaseRenderTexture(this.spriteSize.width, this.spriteSize.height, PIXI.SCALE_MODES.LINEAR, 1)
        this.rt = new PIXI.RenderTexture(this.brt)
        this.spriteInside = new PIXI.Sprite(this.rt) 
        this.spriteInside.alpha = 0
    }

    initAlertOverlay() {
        this.alertOverlay = new PIXI.Graphics()
        this.alertOverlay.beginFill(0xE82E2E)
        this.alertOverlay.drawRect(0, 0, this.spriteSize.width, this.spriteSize.height)
        this.alertOverlay.endFill()
        this.alertOverlay.blendMode = PIXI.BLEND_MODES.MULTIPLY
        this.alertOverlay.alpha = 0
    }

    initBidulesSpriteSheet() {
        const bidules = AssetsManager.get('bidules')
        bidules.parse(() => {
          let textures = Object.keys(bidules.textures).map((t) => bidules.textures[t])
          this.bidulesAnim = new PIXI.extras.AnimatedSprite(textures)
          this.bidulesAnim.x = 227
          this.bidulesAnim.y = -80
          this.bidulesAnim.animationSpeed = (24/60)
          this.bidulesAnim.play()
        })
    }

    initGUI() {
        this.gui = new dat.GUI({ autoPlace: false })
        var customContainer = document.querySelector('.desktop-app')
        customContainer.appendChild(this.gui.domElement)
        const fillBoxPos = {
          x: this.doorSprite.x,
          y: this.doorSprite.y,
          width: this.doorSprite.width,
          height: this.doorSprite.height
        }
    
        let fillBoxChanger = () => {
            this.doorSprite.x = fillBoxPos.x
            this.doorSprite.y = fillBoxPos.y
            this.doorSprite.width = fillBoxPos.width
            this.doorSprite.height = fillBoxPos.height
        }
    
        let f1 = this.gui.addFolder('SPRITE POSITION')
        f1.add(fillBoxPos, 'x', 0, 1920, 0.1).onChange(fillBoxChanger)
        f1.add(fillBoxPos, 'y', -100, 900, 0.1).onChange(fillBoxChanger)
        f1.add(fillBoxPos, 'width', 0, 200, 0.1).onChange(fillBoxChanger)
        f1.add(fillBoxPos, 'height', 0, 2000, 0.1).onChange(fillBoxChanger)
    
    
        this.gui.close()
      }


    addToScene() {
        this.container.addChild(this.doorSprite)
        this.container.addChild(this.insideSprite)
        this.container.addChild(this.bidulesAnim)
        this.container.addChild(this.alertOverlay)
    }
}