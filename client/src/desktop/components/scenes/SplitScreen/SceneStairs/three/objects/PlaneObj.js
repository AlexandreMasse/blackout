import * as THREE from 'three'

export default class PlaneObj {
    constructor() {
        this.set()
    }

    set() {
        let geometry = new THREE.PlaneGeometry( 700, 600, 60,60 )
        let material = new THREE.MeshStandardMaterial( {
            color: new THREE.Color(0xFFFFFF),
            roughness: .8,
            metalness: .1,
            // wireframe:true
        })

        this.mesh = new THREE.Mesh(geometry, material)
        this.mesh.castShadow = false
        this.mesh.receiveShadow = true
    }

    reset() {
        this.mesh = null
    }

    getMesh() {
        return this.mesh
    }
} 