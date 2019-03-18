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
        const mouse = AssetsManager.get('cinematique')
        this.textureVid = PIXI.Texture.fromVideo(mouse)
        this.bg = new PIXI.Sprite(this.textureVid)
        this.video = this.textureVid.baseTexture.source 
        this.video.muted = false
        this.video.autoplay = true
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
            requestTimeout(() => {
                const currentStep = stepsMobile.CURSOR.name
                this.dispatch(setCurrentScene(scenes.SCENEFLASHLIGHT.name))
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
    }

    update() {
        // console.log("scene kinematic update");
    }

}