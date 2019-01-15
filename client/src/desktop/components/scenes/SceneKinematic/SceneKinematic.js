import * as PIXI from "pixi.js"
import {AssetsManager} from "../../../../managers"
import {setFullScreen} from '../utils'

import {setCurrentScene} from "../../../redux/actions/desktopAction"
//scenes
import scenes from ".."

export default class SceneKinematic {

    constructor({dispatch, store}) {
        this.dispatch = dispatch
        this.store = store
        this.needUpdate = true

        this.init()
        this.endVideo()
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
        this.isPlaying = false
        this.isStop = false
    }

    pauseVideo() {
        this.video.pause()
    }

    playVideo() {
        this.isPlaying = true
        this.video.play()
    }

    endVideo = () => {
        this.video.addEventListener('ended',() => {

        setTimeout(() => {
            this.dispatch(setCurrentScene(scenes.SCENEFLASHLIGHT.name))
        },500)    
        //   this.video.style.opacity = 0


        //   setTimeout(() => {
        //     // this.props.setCurrentStep(steps.SCENE.name)
        //     // this.props.wsEmitCurrentStep(stepsMobile.NOTIFICATION.name)
        //   }, 500)
        })
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