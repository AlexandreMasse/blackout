import * as THREE from 'three'
import {AssetsManager} from '../../../../../../managers'
import {TweenMax} from 'gsap'

export default class Scene {
    constructor(status) {
       this.status = status
       this.getGltfScene()
       this.set() 
       this.setAnimation()
    //    this.initEvent()
       this.isArrived = false
       this.addToScene()
    }
    debug() {
        document.body.appendChild(this.renderer.domElement)
    }

    getGltfScene() {
        const gltf = AssetsManager.get('stairs')
        this.gltf = gltf
    }

    set() {
        this.scene = new THREE.Scene()
        this.camera = this.status === 'superior' ? this.gltf.cameras[0] : this.gltf.cameras[1]
        this.scene.background = new THREE.Color('#000000')
        this.renderer = new THREE.WebGLRenderer( { antialias: false } )
        this.renderer.setPixelRatio( window.devicePixelRatio )
        this.renderer.setSize( window.innerWidth, window.innerHeight )
        this.clock = new THREE.Clock()
        this.renderer.setAnimationLoop( this.update.bind(this) )
    }

    setAnimation() {
        this.maxSpeed = this.status === 'superior' ? 1 : .6
        this.timing = this.status === 'superior' ? .8 : .6
        this.mixer = new THREE.AnimationMixer(this.gltf.scene)
        this.mixer.timeScale = 0
        var clips = this.gltf.animations        
        const clip = this.status === 'superior' ? clips[1] : clips[0]
        const action = this.mixer.clipAction(clip)
        action.loop = THREE.LoopOnce
        action.clampWhenFinished = true
        action.play()
    }
    
    addToScene() {
        this.scene.add(this.gltf.scene)
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

    resize() {
        this.size = new THREE.Vector2(window.innerWidth, window.innerHeight)
        this.camera.aspect = this.size.x/this.size.y
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(this.size.x, this.size.y)
    }
    update() {
        const delta = this.clock.getDelta()
		if (this.mixer) {
            this.mixer.update(delta)
        } 
        this.renderer.render(this.scene, this.camera)
    }

}