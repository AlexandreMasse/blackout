import * as PIXI from "pixi.js"
import {AssetsManager} from "../../../../managers"
// scene utils
import {setFullScreen} from '../utils'
// general utils
import {requestTimeout} from '../../../../utils'
import {setCurrentScene} from "../../../redux/actions/desktopAction"
import {wsEmitCurrentStep, wsEmitShowDanger} from '../../../redux/actions/websockets/websocketsAction'
//scenes
import scenes from ".."
import stepsMobile from '../../../../mobile/components/steps'

export default class SceneKinematic2 {

    constructor({dispatch, store}) {
        this.dispatch = dispatch
        this.store = store
        this.needUpdate = true

        this.init()
        // this.endVideo()
        // this.showDanger()
    }

    //required
    updateStore(newStore) {
        //update store
        this.store = newStore
    }

    init() {
        this.container = new PIXI.Container()
        const mouse = AssetsManager.get('porte')
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
            if(this.video.currentTime > 19) {
                const showDanger = true
                if(!this.isDanger) {
                    this.dispatch(wsEmitShowDanger({showDanger}))
                    this.isDanger = true
                }
            }
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