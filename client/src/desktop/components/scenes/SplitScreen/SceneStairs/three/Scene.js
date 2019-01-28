import * as THREE from 'three'
import PlaneObj from '../three/objects/PlaneObj'

export default class Scene {
    constructor() {
       this.set() 
       this.initPlane()
    }

    set() {
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, .1, 1000 )
        this.camera.position.z = 50
        this.camera.position.y =  -200
        this.camera.lookAt(new THREE.Vector3(0,0,0))
        this.scene.background = new THREE.Color('#000000')
        this.scene.fog = new THREE.Fog('#000000', 50, 300)
        this.scene.add( new THREE.AmbientLight( 0xffffff ) )

        this.renderer = new THREE.WebGLRenderer( { antialias: false } )
        this.renderer.setPixelRatio( window.devicePixelRatio )
        this.renderer.setSize( window.innerWidth, window.innerHeight )
        this.renderer.toneMapping = THREE.LinearToneMapping
        this.renderer.toneMappingExposure = 1
        this.renderer.gammaOutput = true

        this.renderer.setAnimationLoop( this.update.bind(this) )
    }

    debug() {
        document.body.appendChild(this.renderer.domElement)
    }

    initPlane() {
        const planeObj = new PlaneObj()
        this.scene.add(planeObj.getMesh())
        console.log(planeObj.getMesh())
    }

    resize() {
        this.size = new THREE.Vector2(window.innerWidth, window.innerHeight)
        this.camera.aspect = this.size.x/this.size.y
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(this.size.x, this.size.y)
    }
    

    update() {
        // console.log('yo') 
        this.renderer.render(this.scene, this.camera)
    }

}