import {AssetsManager} from "../../../../../../managers";
import * as PIXI from "pixi.js";
import {TweenMax} from 'gsap'
import {map, setFullScreen} from '../../../utils'
import * as dat from 'dat.gui'

export default class SceneDoorAdvantage {
    constructor(pct) {
        this.initialPct = pct
        this.init()
        // this.initGUI()
    }

    init() {
        let width = window.innerWidth
        let height = window.innerHeight
        this.container = new PIXI.Container()
        let outsideImg = AssetsManager.get('outsideTest')
        let baseTexture = new PIXI.BaseTexture(outsideImg)
        let texture = new PIXI.Texture(baseTexture)
        this.outsideSprite = new PIXI.Sprite(texture)
        this.containerSize = {width:width * this.initialPct, height:height}
        this.spriteSize = {
          width: this.outsideSprite.width,
          height: this.outsideSprite.height
        }

        this.initAlertOverlay()
        this.initFingerPrintSpriteSheet()
        this.addToScene()

        this.brt = new PIXI.BaseRenderTexture(this.spriteSize.width, this.spriteSize.height, PIXI.SCALE_MODES.LINEAR, 1)
        this.rt = new PIXI.RenderTexture(this.brt)
        this.spriteOutside = new PIXI.Sprite(this.rt) 
    }

    initAlertOverlay() {
        this.alertOverlay = new PIXI.Graphics()
        this.alertOverlay.beginFill(0xE82E2E)
        this.alertOverlay.drawRect(0, 0, this.spriteSize.width, this.spriteSize.height)
        this.alertOverlay.endFill()
        this.alertOverlay.blendMode = PIXI.BLEND_MODES.MULTIPLY
        this.alertOverlay.alpha = 0
    }

    initFingerPrintSpriteSheet() {
        const empreinte = AssetsManager.get('empreinte')
        empreinte.parse(() => {
          let textures = Object.keys(empreinte.textures).map((t) => empreinte.textures[t])
          this.empreinteAnim = new PIXI.extras.AnimatedSprite(textures)
          this.empreinteAnim.x = 220.5
          this.empreinteAnim.animationSpeed = (24/60)
        //   this.empreinteAnim.loop = false
          this.empreinteAnim.play()
        })
    }

    initGUI() {
        this.gui = new dat.GUI({ autoPlace: false })
        var customContainer = document.querySelector('.desktop-app')
        customContainer.appendChild(this.gui.domElement)
        const fillBoxPos = {
          x: this.empreinteAnim.x,
          y: this.empreinteAnim.y,
          width: this.empreinteAnim.width,
          height: this.empreinteAnim.height
        }
    
        let fillBoxChanger = () => {
            this.empreinteAnim.x = fillBoxPos.x
            this.empreinteAnim.y = fillBoxPos.y
            this.empreinteAnim.width = fillBoxPos.width
            this.empreinteAnim.height = fillBoxPos.height
        }
    
        let f1 = this.gui.addFolder('SPRITE POSITION')
        f1.add(fillBoxPos, 'x', 0, 1920, 0.1).onChange(fillBoxChanger)
        f1.add(fillBoxPos, 'y', 0, 900, 0.1).onChange(fillBoxChanger)
        f1.add(fillBoxPos, 'width', 0, 200, 0.1).onChange(fillBoxChanger)
        f1.add(fillBoxPos, 'height', 0, 2000, 0.1).onChange(fillBoxChanger)
    
    
        this.gui.close()
      }


    addToScene() {
        this.container.addChild(this.outsideSprite)
        this.container.addChild(this.empreinteAnim)
        this.container.addChild(this.alertOverlay)
    }
}