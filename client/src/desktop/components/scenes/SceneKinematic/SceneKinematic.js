import * as PIXI from "pixi.js"
import {AssetsManager} from "../../../../managers"
import {setFullScreen} from '../utils'

export default class SceneKinematic {

    constructor() {
        this.needUpdate = true

        this.init()
    }

    init() {
        this.container = new PIXI.Container()
        const mouse = AssetsManager.get('mouse')
        this.textureVid = PIXI.Texture.fromVideo(mouse)
        this.bg = new PIXI.Sprite(this.textureVid)
        this.textureVid.baseTexture.source.loop = true
        this.video = this.textureVid.baseTexture.source 
        this.container.addChild(this.bg)
        this.brt = new PIXI.BaseRenderTexture(this.textureVid.width, this.textureVid.height, PIXI.SCALE_MODES.LINEAR, 1)
        this.rt = new PIXI.RenderTexture(this.brt)

        this.sprite = new PIXI.Sprite(this.rt)
        setFullScreen(this.sprite)
        this.pauseVideo()
        this.isPlaying = false
        this.isStop = false
    }

    pauseVideo() {
        const video = this.textureVid.baseTexture.source
        video.pause()
    }

    playVideo() {
        const video = this.textureVid.baseTexture.source
        this.isPlaying = true
        video.play()
    }


    update() {
        const currentTime = Math.round(this.video.currentTime)
        if(this.isPlaying && currentTime === 3 && this.isStop === false) {
            this.pauseVideo()
            this.isStop = true
        }
        // console.log("scene kinematic update");
    }

}