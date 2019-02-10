module.exports = function (opt) {
    return loadAudio(opt).then((audio) => {
        return audio
    })
}

var loadAudio = function (opt) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.open("GET", opt.url)

        xhr.onload = function() {
            if (this.status == 200) {
                var blob = this.response
                var audio = document.createElement('audio')
                audio.src = window.URL.createObjectURL(blob)
                resolve(audio)
            }
        }
        xhr.onerror = function(e) {
            reject("Error " + e.target.status + " occurred while receiving the document.")
        }

        xhr.send()
    })
}
