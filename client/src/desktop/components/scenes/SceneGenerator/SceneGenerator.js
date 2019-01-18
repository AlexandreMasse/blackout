import {AssetsManager} from "../../../../managers";
import * as PIXI from "pixi.js";
import * as dat from 'dat.gui'
import {TweenMax} from 'gsap'
import {map} from '../utils'

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
      let mapValue  = map(value, 0, 100, 0, window.innerHeight * .6)
      TweenMax.to(this.fillbox, .1, {height:mapValue})
    }

    this.currentPlayer2SliderValue = this.store.users.find(user => user.id === "player2").sliderValue
    this.newPlayer2SliderValue = newStore.users.find(user => user.id === "player2").sliderValue

    if (this.newPlayer2SliderValue) {
      let value2 = parseInt(this.newPlayer2SliderValue, 10)
      let mapValue2  = map(value2, 0, 100, 0, window.innerHeight * .6)
      console.log(mapValue2)
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
    this.initGenerator()
    this.addToScene()
    // this.initGUI()
    this.brt = new PIXI.BaseRenderTexture(this.width, this.height, PIXI.SCALE_MODES.LINEAR, 1)
    this.rt = new PIXI.RenderTexture(this.brt)
    this.sprite = new PIXI.Sprite(this.rt)
  }

  initGenerator() {
    this.generatorSprite.y = this.generatorSprite.height / 2
    this.setFullScreen(this.generatorSprite, this.generatorSprite.width, this.generatorSprite.height)
    this.generatorSprite.x = this.width / 2 - (this.generatorSprite.width / 2)
    }

  setFullScreen = (bg, w, h) => {
    let width = window.innerWidth * .78
    let height = window.innerHeight

    let imageRatio = w / h
    let containerRatio = width / height
    if(containerRatio > imageRatio) {
        bg.height = bg.height / (bg.width / width)
        bg.width = width
        bg.position.x = 0
        bg.position.y = (height - bg.height) / 2
    } else {
        bg.width = bg.width / (bg.height / height)
        bg.height = height
        bg.position.y = 0
        bg.position.x = (width - bg.width) / 2
    }
  }

  initFillBox() {
    this.fillbox = new PIXI.Graphics()
    this.fillbox.beginFill(0xE82E2E)
    this.fillbox.drawRect(0, 0, 140, 400)
    this.fillbox.endFill()
    this.fillbox.x = (window.innerWidth / 2) - 140
    this.fillbox.y = window.innerHeight * .6
    this.fillbox.height = 0
    this.fillbox.pivot.y = 400
  }

  initFillBox2() {
    this.fillbox2 = new PIXI.Graphics()
    this.fillbox2.beginFill(0xE82E2E)
    this.fillbox2.drawRect(0, 0, 140, 400)
    this.fillbox2.endFill()
    this.fillbox2.x = (window.innerWidth / 2) 
    this.fillbox2.y = window.innerHeight * .6
    this.fillbox2.height = 0
    this.fillbox2.pivot.y = 400
  }

  initGUI() {
    this.gui = new dat.GUI({ autoPlace: false })
    var customContainer = document.querySelector('.desktop-app')
    customContainer.appendChild(this.gui.domElement)
    const fillBoxPos = {
      x: this.fillbox2.x,
      y: this.fillbox2.y,
      width: this.fillbox2.width,
      height: this.fillbox2.height
    }

    let fillBoxChanger = () => {
        this.fillbox2.x = fillBoxPos.x
        this.fillbox2.y = fillBoxPos.y
        this.fillbox2.width = fillBoxPos.width
        this.fillbox2.height = fillBoxPos.height
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