import * as THREE from 'three'
import {AssetsManager} from '../../../../../../managers'
import {TweenMax} from 'gsap'

export default class SceneTest {
    constructor(status) {
        this.status = status
        this.getGltfScene()
        this.set()
        this.setAnimation()
        this.isArrived = false
        this.addToScene()
    }
    
    getGltfScene() {
        const gltf = AssetsManager.get('stairs')
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
        this.camera = this.status === 'superior' ? this.gltf.cameras[1] : this.gltf.cameras[0]
        this.scene.background = new THREE.Color('#FF0000')
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

    resize(renderer) {
        this.size = new THREE.Vector2(window.innerWidth, window.innerHeight)
        this.camera.aspect = this.size.x/this.size.y
        this.camera.updateProjectionMatrix()
        renderer.setSize(this.size.x, this.size.y)
    }

    addToScene() {
        this.scene.add(this.gltf.scene)
    }

    render(renderer) {
        renderer.render(this.scene, this.camera, this.renderTarget)
    }

    update() {
        const delta = this.clock.getDelta()
		if (this.mixer) {
            this.mixer.update(delta)
        } 
    }
}