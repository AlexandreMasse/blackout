import {AssetsManager} from "../../../../managers";
import * as PIXI from "pixi.js";
import * as dat from 'dat.gui'
import {TweenMax} from 'gsap'
import {map, setFullScreen} from '../utils'
import spritesheet from '../../../assets/spritesheet/generator/generator_top-numbers.json'


export default class SceneGenerator {

  constructor({dispatch, store}) {
    this.store = store
    this.needUpdate = true;

    this.init()
  }

  //required
  updateStore(newStore) {
    this.currentPlayer1SliderValue = this.store.users.find(user => user.id === "player1").sliderValue
    this.newPlayer1SliderValue = newStore.users.find(user => user.id === "player1").sliderValue

    if (this.newPlayer1SliderValue) {
      let value = parseInt(this.newPlayer1SliderValue, 10)
      let mapValue  = map(value, 0, 100, 0, 648)
      TweenMax.to(this.fillbox, .1, {height:mapValue})
    }

    this.currentPlayer2SliderValue = this.store.users.find(user => user.id === "player2").sliderValue
    this.newPlayer2SliderValue = newStore.users.find(user => user.id === "player2").sliderValue

    if (this.newPlayer2SliderValue) {
      let value2 = parseInt(this.newPlayer2SliderValue, 10)
      let mapValue2  = map(value2, 0, 100, 0, 648)
      // console.log(mapValue2)
      TweenMax.to(this.fillbox2, .1, {height:mapValue2})
    }
    //update store
    this.store = newStore
  }

  init() {
    console.log("scene generator init")

    this.width = window.innerWidth
    this.height = window.innerHeight
    this.container = new PIXI.Container()
    let generatorImg = AssetsManager.get('generator')
    let baseTexture = new PIXI.BaseTexture(generatorImg)
    let texture = new PIXI.Texture(baseTexture)
    this.generatorSprite = new PIXI.Sprite(texture)
    
    this.spriteSize = {
      width:this.generatorSprite.width,
      height: this.generatorSprite.height
    }

    this.initFillBox()
    this.initFillBox2()
    // this.initGenerator()
    this.initNumberSpriteSheet()
    this.addToScene()
    // this.initGUI()
    this.brt = new PIXI.BaseRenderTexture(this.spriteSize.width, this.spriteSize.height, PIXI.SCALE_MODES.LINEAR, 1)
    this.rt = new PIXI.RenderTexture(this.brt)
    this.sprite = new PIXI.Sprite(this.rt)
    setFullScreen(this.sprite, this.spriteSize.width, this.spriteSize.height)
  }

  initGenerator() {
    this.generatorSprite.y = this.generatorSprite.height / 2
    this.generatorSprite.x = this.width / 2 - (this.generatorSprite.width / 2)
  }

  initNumberSpriteSheet() {
    PIXI.loader
    .add(spritesheet)
    .load((t) => {
      console.log(t)
      // let sheet = PIXI.loader.resources["images/spritesheet.json"]; 
      // console.log(sheet)
    })
  }

  initFillBox() {
    this.fillbox = new PIXI.Graphics()
    this.fillbox.beginFill(0xE82E2E)
    this.fillbox.drawRect(0, 0, 140, 400)
    this.fillbox.endFill()
    this.fillbox.x = 785
    this.fillbox.y = 648
    this.fillbox.height = 0
    this.fillbox.pivot.y = 400
  }

  initFillBox2() {
    this.fillbox2 = new PIXI.Graphics()
    this.fillbox2.beginFill(0xE82E2E)
    this.fillbox2.drawRect(0, 0, 140, 400)
    this.fillbox2.endFill()
    this.fillbox2.x = 985
    this.fillbox2.y = 648
    this.fillbox2.height = 0
    this.fillbox2.pivot.y = 400
  }

  initGUI() {
    this.gui = new dat.GUI({ autoPlace: false })
    var customContainer = document.querySelector('.desktop-app')
    customContainer.appendChild(this.gui.domElement)
    const fillBoxPos = {
      x: this.fillbox.x,
      y: this.fillbox.y,
      width: this.fillbox.width,
      height: this.fillbox.height
    }

    let fillBoxChanger = () => {
        this.fillbox.x = fillBoxPos.x
        this.fillbox.y = fillBoxPos.y
        this.fillbox.width = fillBoxPos.width
        this.fillbox.height = fillBoxPos.height
    }

    let f1 = this.gui.addFolder('Fill Box')
    f1.add(fillBoxPos, 'x', 0, 1920, 0.1).onChange(fillBoxChanger)
    f1.add(fillBoxPos, 'y', 0, 900, 0.1).onChange(fillBoxChanger)
    f1.add(fillBoxPos, 'width', 0, 200, 0.1).onChange(fillBoxChanger)
    f1.add(fillBoxPos, 'height', 0, 2000, 0.1).onChange(fillBoxChanger)

    this.gui.close()
  }

  addToScene() {
    this.container.addChild(this.fillbox)
    this.container.addChild(this.fillbox2)
    this.container.addChild(this.generatorSprite)
  }

  update() {
    //console.log("scene2 update");
    //console.log("update scene 2");
  }

}