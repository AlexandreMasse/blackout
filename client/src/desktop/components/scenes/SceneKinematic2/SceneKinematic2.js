import * as PIXI from "pixi.js"
import {AssetsManager} from "../../../../managers"
// scene utils
import {setFullScreen} from '../utils'
// general utils
import {requestTimeout} from '../../../../utils'
import { setCurrentScene ,setSplitScreen, setUserCurrentScene} from "../../../redux/actions/desktopAction"
import {wsEmitCurrentStep} from '../../../redux/actions/websockets/websocketsAction'
//scenes
import scenes from ".."
import stepsMobile from '../../../../mobile/components/steps'

export default class SceneKinematic2 {

    constructor({dispatch, store}) {
        this.dispatch = dispatch
        this.store = store
        this.needUpdate = true

        this.init()
        this.endVideo()
    }

    //required
    updateStore(newStore) {
        //update store
        this.store = newStore
    }

    init() {
        this.container = new PIXI.Container()
        const porte = AssetsManager.get('cinematiquePorte')
        this.textureVid = PIXI.Texture.fromVideo(porte)
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
                const currentStep = stepsMobile.STAIRS.name
                // this.dispatch(setSplitScreen({isSplitScreen: true}))
                // this.dispatch(setUserCurrentScene({userId:'player2', currentScene:scenes.SCENESTAIRS.name}))
                this.dispatch(setCurrentScene(scenes.SCENESTAIRS.name))
                // this.dispatch(setUserCurrentScene({userId:'player1', currentScene:scenes.SCENESTAIRS1.name}))
                this.dispatch(wsEmitCurrentStep({currentStep}))
            },500)    
        })
    }

    update() {
        // console.log("scene kinematic update");
    }

}