import * as THREE from 'three'
import {Texture, RGBFormat} from 'three'
import {Howl} from 'howler'
import {assetsToLoad} from '../../assets/asset-list'

export default class AssetsManager {
    constructor(assets) {
        this._assets = []
        this.assetsLoaded = assets
        this.init()
    }   
    
    getAsset = (id) => {
        return this.assetsLoaded.find( (a) => a.id === id).file
    }

    getExtension = (mFile)  => {
	    const ary = mFile.split('.')
	    return ary[ary.length - 1]
    }

    init = () => {
        this._assets = assetsToLoad.map((o) => {
            console.log(o)
            const ext = this.getExtension(o.url)
            const file = this.getAsset(o.id)
            // console.log(ext)
            // console.log(file)
            let texture;
            let sound;
            let video;

            switch(ext) {
                case 'jpg':
                case 'png':
                    texture = new Texture( file )
                    texture.needsUpdate = true
                    texture.format = RGBFormat

                return {
                    id:o.id,
                    file:texture
                }

                case 'mp3':
                    sound = new Howl({
                        src: [file]
                    })

                return {
                    id:o.id,
                    file:sound
                }

                case 'mp4':
                    video = file
                return {
                    id:o.id,
                    file:video
                }

                default:
                    console.log('plus d asset à loader')
            }
        })

        // let loaderObj = {
        //     "jpg" : new THREE.TextureLoader()
        // }

        // console.log(Object.keys(loaderObj))

        if(this._assets.length > 0) {
		    console.debug('ASSETS:')
		    console.table(this._assets)
	    }
    }

    get = (mId) => {
        return this._assets.find((a) => {
            return a.id === mId
        }).file
    }
}