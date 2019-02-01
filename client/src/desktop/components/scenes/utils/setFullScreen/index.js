
export const setFullScreen = (bg, w, h, width = window.innerWidth) => {
    let height = window.innerHeight
    let imageRatio = w / h
    console.log(imageRatio)
    console.log(w)
    console.log(h)
    let containerRatio = width / height
    console.log('container ratio', containerRatio)
    console.log('width', width)

    if(containerRatio > imageRatio) {
        console.log('ici')
        bg.height = bg.height / (bg.width / width)
        bg.width = width
        bg.position.x = 0
        bg.position.y = (height - bg.height) / 2
    } else {
        console.log('la')
        bg.width = bg.width / (bg.height / height)
        bg.height = height
        bg.position.y = 0
        bg.position.x = (width - bg.width) / 2
    }
}