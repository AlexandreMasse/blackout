const createMediaLoader = require('./createMediaLoader');
const loadSpriteSheet = require('./loadSpriteSheet');
const createFileLoader = require('./createFileLoader');
const loadImage = require('./loadImage');
const loadGltf = require('./loadGltf');
const loadHDR = require('./loadHDR');
const loadVideo = require('./loadVideo');
const loadAudio = require('./loadAudio');

module.exports = [
  // json
  {
    key: 'json',
    match: /\.json$/i,
    load: createFileLoader('json')
  },
  // text
  {
    key: 'text',
    match: /\.txt$/i,
    load: createFileLoader('text')
  },
  // image
  {
    key: 'image',
    match: /\.(jpg|jpeg|svg|png|gif|webp|bmp|tga|tif|apng|wbpm|ico)$/i,
    load: loadImage
  },
  // binary
  {
    key: 'binary',
    match: /\.bin$/i,
    load: createFileLoader('binary')
  },
  // blob
  {
    key: 'blob',
    load: createFileLoader('blob')
  },
  // GLTF
  {
    key: 'gltf',
    match: /\.(gltf|glb)$/i,
    load: loadGltf
  },

  // HDR
  {
    key: 'hdr',
    match: /\.hdr$/i,
    load: loadHDR
  },

  // SPRITE SHEET
  {
    key: 'spritesheet',
    load: loadSpriteSheet
  },
  
  // VIDEO
  {
    key: 'video',
    // match: /\.mp4$/i,
    load: loadVideo
  },
  // Audio
  {
    key: 'sound',
    // match: /\.mp3$/i,
    load: loadAudio
  }
];
