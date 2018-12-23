
var mimeTypes = {
    "audio/midi": ["mid", "midi", "kar", "rmi"],
    "audio/mp4": ["mp4a", "m4a"],
    "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"],
    "audio/ogg": ["oga", "ogg", "spx"],
    "audio/webm": ["weba"],
    "audio/x-matroska": ["mka"],
    "audio/x-mpegurl": ["m3u"],
    "audio/wav": ["wav"],
    "video/3gpp": ["3gp"],
    "video/3gpp2": ["3g2"],
    "video/mp4": ["mp4", "mp4v", "mpg4"],
    "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"],
    "video/ogg": ["ogv"],
    "video/quicktime": ["qt", "mov"],
    "video/webm": ["webm"],
    "video/x-f4v": ["f4v"],
    "video/x-fli": ["fli"],
    "video/x-flv": ["flv"],
    "video/x-m4v": ["m4v"],
    "video/x-matroska": ["mkv", "mk3d", "mks"]
  }

var mimeLookup = {}
Object.keys(mimeTypes).forEach(function (key) {
  var extensions = mimeTypes[key]
  extensions.forEach(function (ext) {
    mimeLookup[ext] = key
  })
})

module.exports = function lookup (ext) {
  if (!ext) throw new TypeError('must specify extension string')
  if (ext.indexOf('.') === 0) {
    ext = ext.substring(1)
  }
  return mimeLookup[ext.toLowerCase()]
}