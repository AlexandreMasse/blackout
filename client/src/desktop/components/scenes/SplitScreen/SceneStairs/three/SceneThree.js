import * as THREE from 'three'
// import fxaa from 'three-shader-fxaa'
// import EffectComposer, { RenderPass, ShaderPass } from 'three-effectcomposer-es6'
import {AssetsManager} from '../../../../../../managers'
import {TweenMax} from 'gsap'

// redux
import {setUserCurrentScene, setStairsProgression, setUserIndicationOpen, setUserIndicationActive} from "../../../../../redux/actions/desktopAction"
import {wsEmitUserCurrentStep} from '../../../../../redux/actions/websockets/websocketsAction'

//scenes
import scenes from '../../..'
import stepsMobile from '../../../../../../mobile/components/steps'
// scene utils 

import {map} from '../../../utils'

export default class SceneTest {
    constructor(status, player, dispatch, bgSound) {
        this.bgSound = bgSound
        this.status = status
        this.player = player
        this.dispatch = dispatch
        this.getGltfScene()
        this.set()
        this.setAnimation()
        this.detectAnimationEnd(status, player, dispatch)
        this.isArrived = false
        this.stairDone = false
        this.addToScene()
        // this.initPostProcess()
        this.stairDone = false
        
        this.firstTouchPL1 = true 
        this.firstTouchPL2 = true
    }
    
    getGltfScene() {
        const gltf = this.player === 'player1' ? AssetsManager.get('stairs') : AssetsManager.get('stairs2')
        this.gltf = gltf
    }

    createTexture() {
        const canvas = document.createElement('canvas')
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        return canvas
    }

    set() {
        this.scene = new THREE.Scene()
        this.camera = this.status === 'superior' ? this.gltf.cameras[0] : this.gltf.cameras[1]
        // console.log(this.gltf.cameras)
        this.scene.background = new THREE.Color('#000000')
        this.clock = new THREE.Clock()
        this.renderer = new THREE.WebGLRenderer( { antialias: false } )
        this.renderer.setPixelRatio( window.devicePixelRatio )
        this.renderer.setSize( window.innerWidth, window.innerHeight )
    }

    setAnimation() {
        this.maxSpeed = this.status === 'superior' ? 1.2 : .65
        this.timing = this.status === 'superior' ? .5 : 1.5
        this.mixer = new THREE.AnimationMixer(this.gltf.scene)
        // this.mixer.timeScale = this.player === 'player1' ? .5 : .8 
        this.mixer.timeScale = this.player === 'player1' ? 0 : 0
        var clips = this.gltf.animations  
        // console.log('CLIPS =====',clips)      
        const clip = this.status === 'superior' ? clips[3] : clips[0]
        const action = this.mixer.clipAction(clip)
        action.loop = THREE.LoopOnce
        action.clampWhenFinished = true
        action.play()
    }

    moveCamera() {
        if (this.player === "player1" && this.firstTouchPL1) {
            this.dispatch(setUserIndicationOpen({
                userId: "player1",
                isOpen: false
              }))
        }
        this.firstTouchPL1 = false

        if (this.player === "player2" && this.firstTouchPL2) {
            this.dispatch(setUserIndicationOpen({
                userId: "player2",
                isOpen: false
              }))
        }
        this.firstTouchPL2 = false

        if (!this.isArrived) {
            TweenMax.fromTo(this.mixer, this.timing, {
                timeScale: this.maxSpeed,
            }, {
                timeScale: 0
            })
        } else {
            this.mixer.timeScale = (this.maxSpeed / 2)
        }
        this.getProgression()

    }
    
    getProgression() {
        const maxTime = 7.8
        this.progression = this.mixer.time / maxTime
        if (this.progression < 1) {
            var mapProgression = map(this.progression,0, 1, 0, 0.3)
            this.dispatch(setStairsProgression({userId: this.player, stairsProgression: mapProgression}))
        }
    
        if (this.mixer.time > maxTime) {
            if (!this.stairDone) {
                this.bgSound.fade(.5, 0, 1000)
                this.bgSound.once( 'fade', () => {this.bgSound.stop()})     
            }
            this.stairDone = true
            this.isArrived = true
        }
    }

    detectAnimationEnd(status, player, dispatch) {
		this.mixer.addEventListener( 'finished',() => {
            console.log('le player ',player,' qui est ', status, 'a finito')
            dispatch(setUserIndicationActive({
                userId: player,
                isActive: false
            }))
            dispatch(setUserCurrentScene({userId: player, currentScene:scenes.SCENEDOOR.name}))
            dispatch(wsEmitUserCurrentStep({userId: player, currentStep:stepsMobile.FINGERPRINT.name}))
		})
	}

    resize(renderer) {
        this.size = new THREE.Vector2(window.innerWidth, window.innerHeight)
        this.camera.aspect = this.size.x/this.size.y
        this.camera.updateProjectionMatrix()
        renderer.setSize(this.size.x, this.size.y)
    }

    addToScene() {
        this.scene.add(this.gltf.scene)
    }

    // render(renderer) {
    //     renderer.render(this.scene, this.camera, this.renderTarget)
    // }

    // update() {
    //     const delta = this.clock.getDelta()
	// 	if (this.mixer) {
    //         this.mixer.update(delta)
    //     } 
    // }

    update() {
        // console.log('yo') 
        const delta = this.clock.getDelta()
		if (this.mixer) {
            this.mixer.update(delta)
        } 
        this.renderer.render(this.scene, this.camera)
        // this.composer.render()
    }

    // initPostProcess() {
    //     // Setup bare-bones composer
    //     this.composer =  new EffectComposer(this.renderer)
	// 	let shaderPass = new ShaderPass(fxaa())
	// 	shaderPass.renderToScreen = true
	// 	shaderPass.uniforms.resolution.value.set(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio)
	// 	this.renderPass = new RenderPass(this.scene, this.camera)

    //     this.composer.addPass(this.renderPass)
	// 	this.composer.addPass(shaderPass)
	// }

}