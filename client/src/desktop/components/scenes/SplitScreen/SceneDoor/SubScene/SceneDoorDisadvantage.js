import {AssetsManager} from "../../../../../../managers";
import * as PIXI from "pixi.js";
import {TweenMax} from 'gsap'
import {map, setFullScreen} from '../../../utils'

export default class SceneDoorDisavantage {
    constructor(pct) {
        this.initialPct = pct
        this.init()
    }

    init() {
        let width = window.innerWidth
        let height = window.innerHeight
        this.container = new PIXI.Container()
        let outsideImg = AssetsManager.get('outsideTest')
        let baseTexture = new PIXI.BaseTexture(outsideImg)
        let texture = new PIXI.Texture(baseTexture)
        this.outsideSprite = new PIXI.Sprite(texture)
        this.marge = 5
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

    addToScene() {
        this.container.addChild(this.outsideSprite)
        this.container.addChild(this.empreinteAnim)
        this.container.addChild(this.alertOverlay)
    }
}