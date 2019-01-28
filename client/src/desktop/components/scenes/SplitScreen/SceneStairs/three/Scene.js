import * as THREE from 'three'
import {AssetsManager} from '../../../../../../managers'

export default class Scene {
    constructor() {
       this.getGltfScene()
       this.set() 
       this.setAnimation()
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
        this.camera = this.gltf.cameras[0]
        this.scene.background = new THREE.Color('#000000')
        this.renderer = new THREE.WebGLRenderer( { antialias: true } )
        this.renderer.setPixelRatio( window.devicePixelRatio )
        this.renderer.setSize( window.innerWidth, window.innerHeight )
        this.clock = new THREE.Clock()
        // this.renderer.toneMapping = THREE.LinearToneMapping
        // this.renderer.toneMappingExposure = 1
        // this.renderer.gammaOutput = true

        this.renderer.setAnimationLoop( this.update.bind(this) )
    }

    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.gltf.scene)
		var clips = this.gltf.animations
		clips.forEach((clip) => {
			const action = this.mixer.clipAction(clip)
			action.loop = THREE.LoopOnce
			action.clampWhenFinished = true
			action.play()
		})
    }
    
    addToScene() {
        this.scene.add(this.gltf.scene)
    }
    
    resize() {
        this.size = new THREE.Vector2(window.innerWidth, window.innerHeight)
        this.camera.aspect = this.size.x/this.size.y
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(this.size.x, this.size.y)
    }
    update() {
        // console.log('yo') 
        const delta = this.clock.getDelta()
		if (this.mixer){
            this.mixer.update(delta)
        } 
        this.renderer.render(this.scene, this.camera)
    }

}