var HDRCubeTextureLoader = require('./three/HDRCubeTextureLoader')
var loader = new HDRCubeTextureLoader()
var THREE = require('three')

module.exports = function (opt) {
    return loadHdr(opt)
};

var loadHdr = function(opt) {
    let urlArr = opt.url;
    if(urlArr.length !== 6) {
        throw "You have to use 6 hdrs to load a cubemap, please verify your url array"
    }
    return new Promise(function (resolve, reject) {
        loader.load(THREE.UnsignedByteType, opt.url, (hdrCubeMap) => {
            resolve(hdrCubeMap)
        })
    })
}