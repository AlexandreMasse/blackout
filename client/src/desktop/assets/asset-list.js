
import bureauItem from './img/bureauItem.jpg'
import cinematique from './videos/cinematique.mp4'
import cinematiquePorte from './videos/porte.mp4'
import analyse from './videos/analyse.mp4'
import bureauLight from './img/bureau_light.png'
import bureau1 from './img/bureau_1.png'
import bureau2 from './img/bureau_2.png'
import bureau3 from './img/bureau_3.png'
import outline from './img/lueurgenerateur.png'
import flashoff from './img/flash-off.png'
import generator from './img/generator.png'
// import stairs from './obj/Escalier2801.glb'
// import stairs2 from './obj/Escalier2801-new.glb'
import stairs from './obj/Escalier-v2.glb'
import stairs2 from './obj/Escalier-newnew.glb'
import outside from './img/outside.png'
import outsideTest from './img/outside-test.png'
import outsideVoyant from './img/outside_voyant.png'
import insideWall from './img/inside_mur.png'
import insideDoor from './img/inside_porte.png'

// SPRITE SHEET GENERATOR 2FPS
import button1 from './spritesheet/generator/2fps/gen-01.json'
import button1Img from './spritesheet/generator/2fps/gen-01.png'
import button2 from './spritesheet/generator/2fps/gen-02.json'
import button2Img from './spritesheet/generator/2fps/gen-02.png'

// SPRITE SHEET GENERATOR 5FPS
import trait1 from './spritesheet/generator/5fps/gen-01.json'
import trait1Img from './spritesheet/generator/5fps/gen-01.png'
import trait2 from './spritesheet/generator/5fps/gen-02.json'
import trait2Img from './spritesheet/generator/5fps/gen-02.png'
import trait3 from './spritesheet/generator/5fps/gen-03.json'
import trait3Img from './spritesheet/generator/5fps/gen-03.png'
import topNumber from './spritesheet/generator/5fps/gen-04.json'
import topNumberImg from './spritesheet/generator/5fps/gen-04.png'
import rightNumber from './spritesheet/generator/5fps/gen-05.json'
import rightNumberImg from './spritesheet/generator/5fps/gen-05.png'
import button3 from './spritesheet/generator/5fps/gen-06.json'
import button3Img from './spritesheet/generator/5fps/gen-06.png'

// SPRITE SHEET GENERATOR 6FPS
import sinAnim from './spritesheet/generator/6fps/gen-01.json'
import sinAnimImg from './spritesheet/generator/6fps/gen-01.png'

// SPRITE SHEET GENERATOR 24FPS
import topPoint from './spritesheet/generator/24fps/gen-01.json'
import topPointImg from './spritesheet/generator/24fps/gen-01.png'
import circle from './spritesheet/generator/24fps/gen-02.json'
import circleImg from './spritesheet/generator/24fps/gen-02.png'
import middlePoint from './spritesheet/generator/24fps/gen-03.json'
import middlePointImg from './spritesheet/generator/24fps/gen-03.png'

// SPRITE SHEET DOOR
import empreinte from './spritesheet/door/24fps/empreinte.json'
import empreinteImg from './spritesheet/door/24fps/empreinte.png'
import bidules from './spritesheet/door/24fps/bidules.json'
import bidulesImg from './spritesheet/door/24fps/bidules.png'

// MP3
import introductionSound from './sounds/introduction.mp3'
import flashSound from './sounds/flashSound.mp3'
import gresillement from './sounds/gresillement.mp3'

export const assetsToLoad = {
    stairs: { url: stairs, type: 'gltf'},
    stairs2: { url: stairs2, type: 'gltf'},
    bureauItem: { url: bureauItem,  type: 'image'},
    cinematique: { url: cinematique, name:'cinematique', type:'video'},
    cinematiquePorte: { url: cinematiquePorte, name:'cinematiquePorte', type:'video'},
    analyse: { url: analyse, name:'analyse' ,type:'video'},
    bureauLight: { url: bureauLight, name:'bureauLight', type: 'image'},
    bureau1: { url: bureau1, name:'bureau2', type: 'image'},
    bureau2: { url: bureau2, name:'bureau1', type: 'image'},
    bureau3: { url: bureau3, name:'bureau3', type: 'image'},
    outline: { url: outline, name:'outline', type: 'image'},
    flashoff: { url: flashoff, name:'flashoff', type: 'image'},
    generator: { url: generator, name:'generator', type: 'image'},
    trait1: { url: trait1Img, spritesheet: trait1, name:'spritesheet', type: 'spritesheet'},
    trait2: { url: trait2Img, spritesheet: trait2, name:'spritesheet', type: 'spritesheet'},
    trait3: { url: trait3Img, spritesheet: trait3, name:'spritesheet', type: 'spritesheet'},
    topNumber: { url: topNumberImg, spritesheet: topNumber, name:'spritesheet', type: 'spritesheet'},
    rightNumber: { url: rightNumberImg, spritesheet: rightNumber, name:'spritesheet', type: 'spritesheet'},
    topPoint: { url: topPointImg, spritesheet: topPoint, name:'spritesheet', type: 'spritesheet'},
    sinAnim: { url: sinAnimImg, spritesheet: sinAnim, name:'spritesheet', type: 'spritesheet'},
    circle: { url: circleImg, spritesheet: circle, name:'spritesheet', type: 'spritesheet'},
    middlePoint: { url: middlePointImg, spritesheet: middlePoint, name:'spritesheet', type: 'spritesheet'},
    button1: { url: button1Img, spritesheet: button1, name:'spritesheet', type: 'spritesheet'},
    button2: { url: button2Img, spritesheet: button2, name:'spritesheet', type: 'spritesheet'},
    button3: { url: button3Img, spritesheet: button3, name:'spritesheet', type: 'spritesheet'},
    empreinte: { url: empreinteImg, spritesheet: empreinte, name:'spritesheet', type: 'spritesheet'},
    bidules: { url: bidulesImg, spritesheet: bidules, name:'spritesheet', type: 'spritesheet'},
    outside: { url: outside, name:'outside', type: 'image'},
    outsideTest: { url: outsideTest, name:'outsideTest', type: 'image'},
    outsideVoyant: { url: outsideVoyant, name:'outsideVoyant', type: 'image'},
    insideWall: { url: insideWall, name:'insideWall', type: 'image'},
    insideDoor: { url: insideDoor, name:'insideDoor', type: 'image'},
    introductionSound: {url: introductionSound, name :'introductionSound', type:'sound'},
    flashSound: {url: flashSound, name :'flashSound', type:'sound'},
    gresillement: {url: gresillement, name :'gresillement', type:'sound'},
}
