
export const setFullScreen = (bg, w, h, width = window.innerWidth) => {
    let height = window.innerHeight
    let imageRatio = w / h
    let containerRatio = width / height

    if(containerRatio > imageRatio) {
        console.log('ici')
        bg.height = bg.height / (bg.width / width)
        bg.width = width
        bg.position.x = 0
        bg.position.y = (height - bg.height) / 2
    } else {
        console.log('la')
        bg.width = bg.width / (bg.height / height)
        // console.log('BG WIDTH', bg.width)
        // console.log('BG H', bg.height)
        // console.log('H', height)
        bg.height = height
        bg.position.y = 0
        bg.position.x = (width - bg.width) / 2
    }
}