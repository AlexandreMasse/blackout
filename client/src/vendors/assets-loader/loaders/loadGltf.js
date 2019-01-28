var GLTFLoader = require('./three/GLTFLoader')
var loader = new GLTFLoader()

module.exports = function (opt) {
  return loadObj(opt).then((gltf) => {
   return gltf;
  })
};

var loadObj = function(opt) {
  return new Promise(function (resolve, reject) {
    loader.load(opt.url, (gltf) => {
        resolve(gltf);
      })
  })
}