
import noise from './img/bureau.png'
import beer from './obj/beer.glb'
import kickGuitar from './sounds/guitar.mp3'
import deer from './obj/deer.obj'
import motor from './obj/motor.gltf'

export const assetsToLoad = {
    noise: { url: noise },
    beer: { url: beer, type: 'gltf' },
    // motor: { url: motor, type: 'gltf' },
    guitar: { url: kickGuitar }
}
