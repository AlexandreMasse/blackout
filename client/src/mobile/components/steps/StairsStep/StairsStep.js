import React, {Component} from 'react'
import {connect} from 'react-redux'
import {wsEmitTapValue} from '../../../redux/actions/websockets/websocketsAction'
import {TweenMax} from 'gsap'

//css
import './StairsStep.scss'

class StairsStep extends Component {

  constructor(props) {
    super(props)

    this.state = {
      tap: "tapRight",
    }

    this.containerActiveScale = 1.37
    this.containerNotActiveScale = 2 - this.containerActiveScale
  }

  componentDidMount() {
    this.left = this.ref.querySelector(".stairs-step__left")
    this.right = this.ref.querySelector(".stairs-step__right")
    this.leftCircle = this.ref.querySelector(".stairs-step__left__circle")
    this.rightCircle = this.ref.querySelector(".stairs-step__right__circle")
    this.separator = this.ref.querySelector(".stairs-step__separator")

    this.animate(this.state.tap)

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.tap !== prevState.tap) {
      this.props.wsEmitTapValue(this.state.tap)
      this.animate(this.state.tap)
    }
  }

  animate = currentTap => {
    if (currentTap === "tapRight") {
      TweenMax.to(this.left, 0.2, {
        scaleX: this.containerActiveScale,
        opacity: 0.7
      })
      TweenMax.to(this.right, 0.2, {
        scaleX: this.containerNotActiveScale,
        opacity: 0
      })
      TweenMax.to(this.leftCircle, 0.1, {
        scale: 1,
        delay: 0.1,
      })
      TweenMax.to(this.rightCircle, 0.1, {
        scale: 0,
        overwrite: "all"
      })
      TweenMax.to(this.separator, 0.2, {
        x: this.left.clientWidth * this.containerActiveScale
      })
    }

    if (currentTap === "tapLeft") {
      TweenMax.to(this.left, 0.2, {
        scaleX: this.containerNotActiveScale,
        opacity: 0
      })
      TweenMax.to(this.right, 0.2, {
        scaleX: this.containerActiveScale,
        opacity: 0.7,
      })
      TweenMax.to(this.leftCircle, 0.1, {
        scale: 0,
        overwrite: "all"
      })
      TweenMax.to(this.rightCircle, 0.1, {
        scale: 1,
        delay: 0.1,
      })
      TweenMax.to(this.separator, 0.2, {
        x: this.left.clientWidth * this.containerNotActiveScale
      })
    }

  }

  handleClickLeft = () => {
    this.setState({tap: "tapLeft"})
  }

  handleClickRight = () => {
    this.setState({tap: "tapRight"})
  }

  render() {

    return (
      <div className="stairs-step" ref={(ref) => this.ref = ref}>
        <div className="stairs-step__left" onClick={this.handleClickLeft}/>
        <div className="stairs-step__right" onClick={this.handleClickRight}/>
        <div className="stairs-step__left__circle"/>
        <div className="stairs-step__right__circle"/>
        <div className="stairs-step__separator"/>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    wsEmitTapValue: (tapValue) => dispatch(wsEmitTapValue({tapValue}))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(StairsStep)
