
import noise from '../desktop/img/bureau.png'
import beer from '../desktop/obj/beer.glb'
import kickGuitar from '../desktop/sounds/guitar.mp3'
import deer from '../desktop/obj/deer.obj'
import motor from '../desktop/obj/motor.gltf'

export const assetsToLoad = {
    noise: { url: noise },
    beer: { url: beer, type: 'gltf' },
    // motor: { url: motor, type: 'gltf' },
    guitar: { url: kickGuitar }
}
