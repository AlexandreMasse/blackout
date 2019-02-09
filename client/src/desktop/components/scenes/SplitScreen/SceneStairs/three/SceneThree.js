import * as THREE from 'three'
import {AssetsManager} from '../../../../../../managers'
import {TweenMax} from 'gsap'
// redux
import { setCurrentScene , setUserCurrentScene} from "../../../../../redux/actions/desktopAction"
import {wsEmitCurrentStep} from '../../../../../redux/actions/websockets/websocketsAction'

//scenes
import scenes from '../../..'
import stepsMobile from '../../../../../../mobile/components/steps'

export default class SceneTest {
    constructor(status, player, dispatch) {
        this.status = status
        this.player = player
        this.getGltfScene()
        this.set()
        this.setAnimation()
        this.detectAnimationEnd(status, player, dispatch)
        this.isArrived = false
        this.addToScene()
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
        console.log(this.gltf.cameras)
        // this.scene.background =  this.player === 'player1' ? new THREE.Color('#FF0000') : new THREE.Color('#FF00FF')
        this.scene.background = new THREE.Color('#000000')
        this.clock = new THREE.Clock()
        // this.renderTarget = new THREE.WebGLRenderTarget(window.innerWidth * 2, window.innerHeight * 2)

        this.renderer = new THREE.WebGLRenderer( { antialias: false } )
        this.renderer.setPixelRatio( window.devicePixelRatio )
        this.renderer.setSize( window.innerWidth, window.innerHeight )
    }

    setAnimation() {
        this.maxSpeed = this.status === 'superior' ? 1 : .6
        this.timing = this.status === 'superior' ? .8 : .6
        this.mixer = new THREE.AnimationMixer(this.gltf.scene)
        this.mixer.timeScale = this.player === 'player1' ? .7 : 1
        var clips = this.gltf.animations  
        console.log('CLIPS =====',clips)      
        const clip = this.status === 'superior' ? clips[1] : clips[0]
        const action = this.mixer.clipAction(clip)
        action.loop = THREE.LoopOnce
        action.clampWhenFinished = true
        action.play()
    }

    moveCamera() { 
        if (!this.isArrived) {
            TweenMax.fromTo(this.mixer, this.timing, {
                timeScale: this.maxSpeed,
            }, {
                timeScale: 0
            })
        } else {
            this.mixer.timeScale = this.maxSpeed
        }
        this.getProgression()

    }
    
    getProgression() {
        const maxTime = 12
        this.progression = this.mixer.time / maxTime
        // console.log(this.progression)
        if (this.mixer.time > maxTime) {
            this.isArrived = true
        }
    }

    detectAnimationEnd(status, player, dispatch) {
		this.mixer.addEventListener( 'finished',() => {
            console.log('le player ',player,' qui est ', status, 'a finito')
            dispatch(setUserCurrentScene({userId: player, currentScene:scenes.SCENEDOOR.name}))
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
    }
}