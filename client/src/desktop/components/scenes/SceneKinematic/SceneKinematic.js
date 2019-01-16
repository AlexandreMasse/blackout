import * as PIXI from "pixi.js"
import {AssetsManager} from "../../../../managers"
import {setFullScreen} from '../utils'

import {setCurrentScene} from "../../../redux/actions/desktopAction"
import {wsEmitCurrentStep} from '../../../redux/actions/websockets/websocketsAction'
//scenes
import scenes from ".."
import stepsMobile from '../../../../mobile/components/steps'

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
        this.video = this.textureVid.baseTexture.source 
        this.video.muted = true
        this.container.addChild(this.bg)
        this.brt = new PIXI.BaseRenderTexture(this.textureVid.width, this.textureVid.height, PIXI.SCALE_MODES.LINEAR, 1)
        this.rt = new PIXI.RenderTexture(this.brt)

        this.sprite = new PIXI.Sprite(this.rt)
        setFullScreen(this.sprite, this.textureVid.width, this.textureVid.height)
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
                const currentStep = stepsMobile.CURSOR.name
                this.dispatch(setCurrentScene(scenes.SCENEFLASHLIGHT.name))
                this.dispatch(wsEmitCurrentStep({currentStep}))
            },500)    
        })
    }

    update() {
        // const currentTime = Math.round(this.video.currentTime)
        // if(this.isPlaying && currentTime === 3 && this.isStop === false) {
        //     this.pauseVideo()
        //     this.isStop = true
        // }
        // console.log("scene kinematic update");
    }

}