import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as PIXI from 'pixi.js'

import bureau from '../../../../assets/desktop/img/bureau.png'
// import light from '../../../../assets/desktop/img/rond_flou.png'

//css
import './Cursor.scss'

class Cursor extends Component {
  componentWillMount() {
    this.initApp()
  }

  initApp = () => {
    let width = window.innerWidth
    let height = window.innerHeight
    let maskRadius = 120
    var app = new PIXI.Application(width, height, {transparent:true, resolution: 1})
    document.body.appendChild(app.view)
  
    let bg = PIXI.Sprite.fromImage(bureau)
    // let flashLight = PIXI.Sprite.fromImage(light)
    bg.width  = 1920
    bg.height = 1080

    let imageRatio = bg.width / bg.height
    let containerRatio = width / height
    if(containerRatio > imageRatio) {
        bg.height = bg.height / (bg.width / width)
        bg.width = width
        bg.position.x = 0
        bg.position.y = (height - bg.height) / 2
    }else{
        bg.width = bg.width / (bg.height / height)
        bg.height = height
        bg.position.y = 0
        bg.position.x = (width - bg.width) / 2
    }

    // CIRCLE MASK
    var mask = new PIXI.Graphics()
    mask.beginFill('0xffffff')
    mask.drawCircle(0, 0, maskRadius)
    mask.endFill()

    mask.position.x = width/2
    mask.position.y = height/2

    bg.mask = mask
    app.stage.addChild(mask)
    app.stage.addChild(bg)
  } 

  render() {
    const {isPlayer1Connected, isPlayer2Connected} = this.props

    const player1Position = {
      x:this.props.player1Position.x * (window.innerWidth * .5),
      y: this.props.player1Position.y * (window.innerHeight * .5)
    }
    const player2Position = {
      x:this.props.player2Position.x * (window.innerWidth * .5),
      y: this.props.player2Position.y * (window.innerHeight * .5)
    }

    return (
      <div className="cursor">
        {isPlayer1Connected &&
          <div className="cursor-pointer player-1" style={{
            transform: `translate3d(${player1Position.x}px,${player1Position.y}px,0)`
          }}/>
        }
        {isPlayer2Connected &&
          <div className="cursor-pointer player-2" style={{
            transform: `translate3d(${player2Position.x}px,${player2Position.y}px,0)`
          }}/>
        }
      </div>
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
