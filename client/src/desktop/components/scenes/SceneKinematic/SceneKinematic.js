import * as PIXI from "pixi.js"
import {AssetsManager} from "../../../../managers"
import {assetsToLoad} from "../../../assets/asset-list"
// scene utils
import {setFullScreen} from '../utils'
// general utils
import {requestTimeout} from '../../../../utils'
import {setCurrentScene} from "../../../redux/actions/desktopAction"
import {wsEmitCurrentStep, wsEmitShowDanger} from '../../../redux/actions/websockets/websocketsAction'
//scenes
import scenes from ".."
import stepsMobile from '../../../../mobile/components/steps'

export default class SceneKinematic {

    constructor({dispatch, store}) {
        this.dispatch = dispatch
        this.store = store
        this.needUpdate = true
        this.needResize = true
        this.canStop = true

        this.init()
        this.endVideo()
        this.showDanger()

        this.superiorPlayer = this.store.users.find(user => user.status === "superior")
    }

    //required
    updateStore(newStore) {
        //update store
        this.store = newStore
    }

    init() {
        this.container = new PIXI.Container()
        const video =  document.createElement('video')
        video.crossOrigin = 'anonymous'
        video.preload = ''
        const mouse = AssetsManager.get('cinematique')
        video.src = mouse.src
        this.textureVid = PIXI.Texture.fromVideo(mouse)
        this.bg = new PIXI.Sprite(this.textureVid)
        this.video = this.textureVid.baseTexture.source 
        this.video.muted = false
        this.video.autoplay = true
        this.container.addChild(this.bg)
        this.brt = new PIXI.BaseRenderTexture(this.textureVid.width, this.textureVid.height, PIXI.SCALE_MODES.LINEAR, 1)
        this.rt = new PIXI.RenderTexture(this.brt)
        this.sprite = new PIXI.Sprite.from(video)
        this.sprite.width = 1920
        this.sprite.height = 1080
        setFullScreen(this.sprite, 1920, 1080)
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
            requestTimeout(() => {
                this.dispatch(setCurrentScene(scenes.SCENEFLASHLIGHT.name))
                const currentStep = stepsMobile.CURSOR.name
                this.dispatch(wsEmitCurrentStep({currentStep}))
            },500) 
        })
    }

    showDanger = () => {
        this.isDanger = false
        this.video.addEventListener('timeupdate', () => { 
            if (this.video.currentTime > 13) {
                if (!this.isDanger) {
                    this.dispatch(wsEmitShowDanger({
                        userId: this.superiorPlayer.id,
                        showDanger: true
                    }))
                    this.isDanger = true
                }
            }
        })
    }

    stopTicker = () => {
        this.pauseVideo()
        const video = this.sprite.texture.baseTexture.source 
        video.pause()
    }

    startTicker = () => {
        this.playVideo()
        const video = this.sprite.texture.baseTexture.source 
        video.play()
    }

    resize() {
        setFullScreen(this.sprite, this.textureVid.width, this.textureVid.height)
    }
    update() {
        // console.log("scene kinematic update");
    }

}