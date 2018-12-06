import * as THREE from 'three'
<<<<<<< HEAD
import GLTFLoader from 'three-gltf-loader'

let _assets = []
=======
import {Texture, RGBFormat} from 'three'
import {assetsToLoad} from '../../assets/asset-list'
>>>>>>> loader manager

export default class AssetsManager {
    constructor() {
        this._assets = []
        this.init()
    }   
    
    getAsset = (id) => {
        return window.assets.find( (a) => a.id === id).file
    }

    getExtension = (mFile)  => {
	    const ary = mFile.split('.')
	    return ary[ary.length - 1]
    }

    init = () => {
<<<<<<< HEAD
        let hdrCubemaps = {}
        _assets = assetsToLoad.map((o) => {
            const ext = getExtension(o.url)
            const file = getAsset(o.id)
            let texture

        switch(ext) {
			case 'jpg':
			case 'png':
				// texture = new GLTexture(file);
				return {
					id:o.id,
					file:texture
				};
                break;
            }
        })

        if(_assets.length > 0) {
            console.debug('ASSETS:')
            console.table(_assets)	
        }
=======
        // let hdrCubemaps = {}
        this._assets = assetsToLoad.map((o) => {
            console.log(o)
            const ext = this.getExtension(o.url)
            const file = this.getAsset(o.id)

            console.log(ext)
            console.log(file)
            // let texture;
            const texture = new Texture( file )
            texture.needsUpdate = true;
            texture.format = RGBFormat;
            return {
                id:o.id,
                file:texture
            }
        })

        let loaderObj = {
            "jpg" : new THREE.TextureLoader()
        }

        console.log(Object.keys(loaderObj))
        console.log('salut')

        if(this._assets.length > 0) {
		    console.debug('ASSETS:')
		    console.table(this._assets)
	    }
    }

    get = (mId) => {
        return this._assets.find((a) => {
            return a.id === mId
        }).file
>>>>>>> loader manager
    }

    get = (mId) => {
        return _assets.find((a) => {
            return a.id === mId
        }).file
    }

}

// const Assets = {};
// let _assets = [];

// const getAsset = function(id) {
// 	return assets.find( (a) => a.id === id).file;
// }

// const getExtension = function(mFile) {
// 	const ary = mFile.split('.');
// 	return ary[ary.length - 1];
// }

// Assets.init = function() {
// 	let hdrCubemaps = {};
// 	_assets = assetsToLoad.map((o) => {
// 		const ext = getExtension(o.url);
// 		const file = getAsset(o.id);
// 		let texture;

// 		switch(ext) {
// 			case 'jpg':
// 			case 'png':
// 				texture = new GLTexture(file);
// 				return {
// 					id:o.id,
// 					file:texture
// 				};
// 				break;

// 			case 'hdr':
// 				let cubemapName = o.id.split('_')[0];
// 				texture = alfrid.HDRLoader.parse(file);

// 				const oAsset = {
// 					id:o.id,
// 					file:texture
// 				};

// 				if(!hdrCubemaps[cubemapName]) {
// 					hdrCubemaps[cubemapName] = [];
// 				}

// 				hdrCubemaps[cubemapName].push(oAsset);
// 				return oAsset;

// 				break;
// 			case 'dds':
// 				texture = GLCubeTexture.parseDDS(file);
// 				return {
// 					id:o.id,
// 					file:texture
// 				};
// 				break;

// 			case 'obj':
// 				const mesh = ObjLoader.parse(file);
// 				return {
// 					id:o.id,
// 					file:mesh
// 				}
// 				break;
// 		}

// 	});

// 	for(let s in hdrCubemaps) {
// 		if(hdrCubemaps[s].length == 6) {
// 			console.log('Generate Cubemap :', s);

// 			const ary = [
// 				Assets.get(`${s}_posx`),
// 				Assets.get(`${s}_negx`),
// 				Assets.get(`${s}_posy`),
// 				Assets.get(`${s}_negy`),
// 				Assets.get(`${s}_posz`),
// 				Assets.get(`${s}_negz`)
// 			];

// 			const texture = new alfrid.GLCubeTexture(ary);
// 			_assets.push({
// 				id:s,
// 				file:texture
// 			})
// 		}
// 	}

// 	if(_assets.length > 0) {
// 		console.debug('ASSETS:');
// 		console.table(_assets);	
// 	}
	
// }

// Assets.get = function(mId) {
// 	return _assets.find((a) => {
// 		return a.id === mId;
// 	}).file;
// }

// export default Assets;