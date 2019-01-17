
import bureau from './img/bureau.png'
import bureauItem from './img/bureauItem.jpg'
import mouse from './videos/mouse.mp4'
import analyse from './videos/analyse.mp4'
import bureau1 from './img/bureau_1.png'
import bureau2 from './img/bureau_2.png'
import bureau3 from './img/bureau_3.png'
import outline from './img/lueurgenerateur.png'
import flashoff from './img/flash-off.png'
import generator from './img/generator.png'

export const assetsToLoad = {
    bureau: { url: bureau },
    bureauItem: { url: bureauItem,  type: 'image' },
    mouse: { url: mouse },
    analyse: { url: analyse, },
    bureau1: { url: bureau1, name:'bureau2', type: 'image'},
    bureau2: { url: bureau2, name:'bureau1', type: 'image'},
    bureau3: { url: bureau3, name:'bureau3', type: 'image'},
    outline: { url: outline, name:'outline', type: 'image'},
    flashoff: { url: flashoff, name:'flashoff', type: 'image'},
    generator: { url: generator, name:'generator', type: 'image'},
}
