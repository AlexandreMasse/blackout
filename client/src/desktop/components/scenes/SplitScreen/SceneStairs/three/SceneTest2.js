import * as THREE from 'three'
import {AssetsManager} from '../../../../../../managers'
import {TweenMax} from 'gsap'

export default class SceneTest2 {
    constructor(status) {
        this.status = status
        this.getGltfScene()
        this.set()
        this.setAnimation()
        this.isArrived = false
        this.addToScene()
    }

    createTexture() {
        const canvas = document.createElement('canvas')
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        return canvas
    }

    set() {
        this.scene = new THREE.Scene()
        this.camera = this.status === 'superior' ? this.gltf.cameras[1] : this.gltf.cameras[0]
        this.scene.background = new THREE.Color('#0000FF')
        this.clock = new THREE.Clock()
        this.renderTarget = new THREE.WebGLRenderTarget(window.innerWidth * 1, window.innerHeight * 1)
    }

    setAnimation() {
        this.maxSpeed = this.status === 'superior' ? 1 : .6
        this.timing = this.status === 'superior' ? .8 : .6
        this.mixer = new THREE.AnimationMixer(this.gltf.scene)
        this.mixer.timeScale = .5
        var clips = this.gltf.animations        
        const clip = this.status === 'superior' ? clips[0] : clips[1]
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

    render(renderer) {
        renderer.render(this.scene, this.camera, this.renderTarget)
    }

    getGltfScene() {
        const gltf = AssetsManager.get('stairs2')
        this.gltf = gltf
    }

    addToScene() {
        this.scene.add(this.gltf.scene)
    }

    update() {
        const delta = this.clock.getDelta()
		if (this.mixer) {
            this.mixer.update(delta)
        } 
    }
}