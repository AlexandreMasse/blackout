module.exports = function (opt) {
    return loadVideo(opt).then((video) => {
        return video
    })
}

var loadVideo = function (opt) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.open("GET", opt.url)

        xhr.onload = function() {
            if (this.status == 200) {
                var blob = this.response
                var video = document.createElement('video')
                video.src = window.URL.createObjectURL(blob)
                resolve(video)
            }
        }
        xhr.onerror = function(e) {
            reject("Error " + e.target.status + " occurred while receiving the document.")
        }

        xhr.send()
    })
}
