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
    console.log(this.newPlayer1SliderValue)
    if (this.newPlayer1SliderValue) {
      let value = parseInt(this.newPlayer1SliderValue, 10)
      let mapValue  = map(value, 0, 100, 0, 469)
      TweenMax.to(this.fillbox, .1, {height:mapValue})
    }
    //update store
    console.log("updateStore", newStore)
    this.store = newStore
  }

  init() {
    console.log("scene generator init")

    let width = window.innerWidth
    let height = window.innerHeight
    this.container = new PIXI.Container()
    let generatorImg = AssetsManager.get('generator')
    let baseTexture = new PIXI.BaseTexture(generatorImg)
    let texture = new PIXI.Texture(baseTexture)
    this.generatorSprite = new PIXI.Sprite(texture)
    this.generatorSprite.x = width / 2 - (this.generatorSprite.width / 2)
    this.generatorSprite.y = height / 2 - (this.generatorSprite.height / 2)
    this.initFillBox()
    this.addToScene()
    this.initGUI()
    this.brt = new PIXI.BaseRenderTexture(width, height, PIXI.SCALE_MODES.LINEAR, 1)
    this.rt = new PIXI.RenderTexture(this.brt)
    this.sprite = new PIXI.Sprite(this.rt)
  }

  initFillBox() {
    this.fillbox = new PIXI.Graphics()
    this.fillbox.beginFill(0xE82E2E)
    this.fillbox.drawRect(0, 0, 43.8, 469)
    this.fillbox.endFill()
    this.fillbox.x = 869
    this.fillbox.y = 200

    this.fillbox.scale.y = -1
    this.fillbox.height = 0

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
    f1.add(fillBoxPos, 'height', 0, 200, 0.1).onChange(fillBoxChanger)

    this.gui.close()
  }

  addToScene() {
    this.container.addChild(this.generatorSprite)
    this.container.addChild(this.fillbox)
  }

  update() {
    //console.log("scene2 update");
    //console.log("update scene 2");
  }

}