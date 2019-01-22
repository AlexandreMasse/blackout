var PIXI = require('pixi.js')
const loader = PIXI.loader

module.exports = function (opt) {
console.log('OUIUUU',opt)
  return loadVideo(opt).then((vid) => {
      return vid
  })
};

var loadVideo = function (opt) {
    console.log('OUIUUU',opt)

    return new Promise(function (resolve, reject) {
        loader.add(opt.name, opt.url)
        .load((loader, resources) => {
            // console.log(resources[opt.name].data)
            resolve(resources[opt.name].data)
        })
    })
}