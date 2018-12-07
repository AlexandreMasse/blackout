import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as PIXI from 'pixi.js'
import {TweenMax, Back, RoughEase} from 'gsap'
import bureau from '../../../../assets/desktop/img/bureau.png'
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

    var app = new PIXI.Application(width, height, {transparent:true, resolution: 1})
    ref.appendChild(app.view)
  
    let bg2 = PIXI.Sprite.fromImage(bureau)
    bg.width  = 1920
    bg.height = 1080
    
    bg2.width  = 1920
    bg2.height = 1080

    let imageRatio = bg.width / bg.height
    let containerRatio = width / height
    if(containerRatio > imageRatio) {
        bg.height = bg.height / (bg.width / width)
        bg2.height = bg2.height / (bg2.width / width)
        bg.width = width
        bg2.width = width
        bg.position.x = 0
        bg2.position.x = 0
        bg.position.y = (height - bg.height) / 2
        bg2.position.y = (height - bg2.height) / 2
    }else{
        bg.width = bg.width / (bg.height / height)
        bg2.width = bg2.width / (bg2.height / height)
        bg.height = height
        bg2.height = height
        bg.position.y = 0
        bg2.position.y = 0
        bg.position.x = (width - bg.width) / 2
        bg2.position.x = (width - bg2.width) / 2
    }

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
      x: width/2,
      y: height/2
    }
    this.mask2.position.x = this.mask2Position.x
    this.mask2.position.y = this.mask2Position.y
    
    this.mask1.visible = false
    this.mask2.visible = false

    bg.mask = this.mask1
    bg2.mask = this.mask2
  
    app.stage.addChild(this.mask1)
    app.stage.addChild(this.mask2)
    app.stage.addChild(bg)
    app.stage.addChild(bg2)

    this.setState({init:true})
  }

  showLight = () => {
    if(this.props.isPlayer1Connected) {
      console.log('player 1')
      this.mask1.visible = true
    }

    if(this.props.isPlayer2Connected) {
      console.log('player 2')
      this.mask2.visible = true
    }
  }

  moveFlashLight = () => {
     TweenMax.to(bg, 2, {alpha:(Math.random() - 0.1) * 1.2, ease:RoughEase.ease.config()})

    if (this.props.isPlayer1Connected) {
      const player1Position = {
        x:this.props.player1Position.x * (window.innerWidth * .5),
        y: this.props.player1Position.y * (window.innerHeight * .5)
      }
      let newPositionX = player1Position.x + (window.innerWidth / 2)
      let newPositionY = player1Position.y + (window.innerHeight / 2)

      TweenMax.to(this.mask1, 0.2, {x:newPositionX, y:newPositionY, ease:Back.easeOut.config(1.7)}, 0)
    }

    if (this.props.isPlayer2Connected) {
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
