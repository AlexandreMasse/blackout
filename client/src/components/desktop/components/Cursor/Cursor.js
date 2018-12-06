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
    const x = this.props.x * (window.innerWidth * .5)
    const y = this.props.y * (window.innerHeight * .5)
    return (
      <div className="cursor">
        <div className="cursor-pointer" style={{
          transform: `translate3d(${x}px,${y}px,0)`
        }}/>
      </div>
    )
  }


}


const mapStateToProps = state => {
  return {
    x: state.desktop.position.x,
    y: state.desktop.position.y,
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps,mapDispatchToProps)(Cursor)
