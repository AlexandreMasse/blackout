
import bureauItem from './img/bureauItem.jpg'
import cinematique from './videos/cinematique.mp4'
import analyse from './videos/analyse.mp4'
import bureau1 from './img/bureau_1.png'
import bureau2 from './img/bureau_2.png'
import bureau3 from './img/bureau_3.png'
import outline from './img/lueurgenerateur.png'
import flashoff from './img/flash-off.png'
import generator from './img/generator.png'
import generator2 from './img/generator-transparent.png'
import spritesheet from './spritesheet/generator/generator_top-numbers.json'
import spritesheetImg from './spritesheet/generator/generator_top-numbers.png'

console.log(spritesheetImg)
export const assetsToLoad = {
    bureauItem: { url: bureauItem,  type: 'image'},
    cinematique: { url: cinematique, name:'cinematique', type:'video' },
    analyse: { url: analyse, name:'analyse' ,type:'video'},
    bureau1: { url: bureau1, name:'bureau2', type: 'image'},
    bureau2: { url: bureau2, name:'bureau1', type: 'image'},
    bureau3: { url: bureau3, name:'bureau3', type: 'image'},
    outline: { url: outline, name:'outline', type: 'image'},
    flashoff: { url: flashoff, name:'flashoff', type: 'image'},
    generator: { url: generator, name:'generator', type: 'image'},
    generator2: { url: generator2, name:'generator2', type: 'image'},
    spritesheet: { url: spritesheetImg, spritesheet: spritesheet, name:'spritesheet', type: 'spritesheet'},
}
