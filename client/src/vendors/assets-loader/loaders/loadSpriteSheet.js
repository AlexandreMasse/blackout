var PIXI = require('pixi.js')

module.exports = function (opt) {
    return loadImage(opt).then((img) => {
        let baseTexture = new PIXI.BaseTexture(img)
        var spritesheet = new PIXI.Spritesheet(baseTexture, opt.spritesheet)
       return spritesheet
    })
}

var loadImage = function (opt) {
    return new Promise(function (resolve, reject) {
        var finished = false;
        var image = new window.Image();
        image.onload = function onLoaded () {
          if (finished) return;
          finished = true;
          resolve(image);
        };
        image.onerror = function onError () {
          if (finished) return;
          finished = true;
          reject(new Error('Error while loading image at ' + opt.url));
        };
        if (opt.crossOrigin) image.crossOrigin = opt.crossOrigin;
        image.src = opt.url;
    })
}

