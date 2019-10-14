import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as PIXI from 'pixi.js'
import {TweenMax, Back, RoughEase} from 'gsap'
import bureau from '../../../assets/img/bureau.png'
import {AssetsManager} from '../../../../managers'

//css
import './Cursor.scss'
let bg = PIXI.Sprite.fromImage(bureau)

class Cursor extends Component {

  constructor(props) {
    super(props)
    this.state = {
      init: false
    }
  }

  componentWillMount() {
    // this.initApp()
  }
  componentDidMount() {
    this.showLight()
  }

  handleRef = (ref) => {
    this.initApp(ref)
  }

  initApp = (ref) => {
    let width = ref.clientWidth
    let height = ref.clientHeight
    let maskRadius = 140
    let maskRadius2 = 160
    this.container = new PIXI.Container()
    this.app = new PIXI.Application(width, height, {transparent:true, resolution: 1})
    ref.appendChild(this.app.view)
   
    this.app.ticker.add( this.renderScene.bind(this) )

    let bg2 = PIXI.Sprite.fromImage(bureau)
    let bureauItemImg = AssetsManager.get('bureauItem')
    let baseTexture = new PIXI.BaseTexture(bureauItemImg)
    let texture = new PIXI.Texture(baseTexture)
    let bureauItemSprite = new PIXI.Sprite(texture) 
    bureauItemSprite.y = 476
    bureauItemSprite.x = 826

    // CIRCLE MASK
    this.mask1 = new PIXI.Graphics()
    this.mask1.beginFill('0xffffff')
    this.mask1.drawCircle(0, 0, maskRadius)
    this.mask1.endFill()

    this.mask1.position.x = width/2 
    this.mask1.position.y = height/2
 
    // CIRCLE MASK
    this.mask2 = new PIXI.Graphics()
    this.mask2.beginFill('0xffffff')
    this.mask2.drawCircle(0, 0, maskRadius2)
    this.mask2.endFill()

    this.mask2Position =  {
      x: bg2.width/2,
      y: bg2.height/2
    }
    this.mask2.position.x = this.mask2Position.x
    this.mask2.position.y = this.mask2Position.y
    
    // this.mask1.visible = false
    // this.mask2.visible = false

    
    bg.mask = this.mask1
    bg2.mask = this.mask2
    bureauItemSprite.mask = this.mask2

    this.brt = new PIXI.BaseRenderTexture(bg2.width, bg2.height, PIXI.SCALE_MODES.LINEAR, 1)
    this.rt = new PIXI.RenderTexture(this.brt)

    this.spriteScene = new PIXI.Sprite(this.rt)
  
    this.container.addChild(this.mask1)
    this.container.addChild(this.mask2)
    this.container.addChild(bg)
    this.container.addChild(bg2)
    this.container.addChild(bureauItemSprite)
    this.setFullScreen(this.spriteScene, this.spriteScene.width, this.spriteScene.height)
    this.app.stage.addChild(this.spriteScene)

    this.setState({init:true})
  }

  renderScene = () => {
    this.app.renderer.render(this.container, this.rt)
  }

  setFullScreen = (bg, spriteW, spriteH) => {
    let width = window.innerWidth
    let height = window.innerHeight

    let imageRatio = spriteW / spriteH
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

  showLight = () => { 
    if(this.props.isPlayer1Connected) {
      // console.log('player 1')
      this.mask1.visible = true
    }

    if(this.props.isPlayer2Connected) {
      // console.log('player 2')
      this.mask2.visible = true
    }
  }

  moveFlashLight = () => {
     TweenMax.to(bg, 2, {alpha:(Math.random() - 0.1) * 1.2, ease:RoughEase.ease.config()})

    if (this.props.isPlayer1Connected && this.props.player1Position) {
      const player1Position = {
        x:this.props.player1Position.x * (window.innerWidth * .5),
        y: this.props.player1Position.y * (window.innerHeight * .5)
      }
      let newPositionX = player1Position.x + (window.innerWidth / 2)
      let newPositionY = player1Position.y + (window.innerHeight / 2)

      TweenMax.to(this.mask1, 0.2, {x:newPositionX, y:newPositionY, ease:Back.easeOut.config(1.7)}, 0)
    }

    if (this.props.isPlayer2Connected && this.props.player2Position) {
      const player2Position = {
        x:this.props.player2Position.x * (window.innerWidth * .5),
        y: this.props.player2Position.y * (window.innerHeight * .5)
      }
      let newPositionX = player2Position.x + (window.innerWidth/2)
      let newPositionY = player2Position.y + (window.innerHeight/2)

      TweenMax.to(this.mask2, 0.2, {x:newPositionX, y:newPositionY, ease:Back.easeOut.config(1.7)}, 0)
      // console.log(bg2.alpha)
      // this.mask2Position = {
      //   x:this.mask2.x,
      //   y:this.mask2.y,
      // }
    }
  } 

  render() {

    {this.state.init && this.moveFlashLight()}

    return (
      <div className="cursor" ref={this.handleRef}/>
    )
  }
}


const mapStateToProps = state => {
  return {
    player1Position: state.desktop.users.find(user => user.id === "player1").position,
    player2Position: state.desktop.users.find(user => user.id === "player2").position,
    isPlayer1Connected: state.desktop.users.find(user => user.id === "player1").isConnected,
    isPlayer2Connected: state.desktop.users.find(user => user.id === "player2").isConnected

  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps,mapDispatchToProps)(Cursor)
