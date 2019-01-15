import React, {Component} from 'react'
import {connect} from 'react-redux';
import classNames from "classnames"
import Lottie from 'lottie-web'
import PropTypes from 'prop-types'

//css
import './LottieAnimation.scss'


class LottieAnimation extends Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.animation = null

    this.aspectRatio = {
      "cover": 'xMidYMid slice',
      "cover-left": 'xMinYMid slice',
      "cover-right": 'xMaxYMid slice',
      "contain": 'xMidYMid meet',
      "contain-left" : "xMinYMid meet",
      "contain-right" : "xMaxYMid meet",
      "contain-top" : "xMidYMin meet",
      "contain-bottom" : "xMidYMax meet",
    }
  }

  handleRef = (ref) => {
    this.ref = ref
  }

  componentDidMount() {
    const {animationData, path, renderer, loop, autoplay, aspectRatio} = this.props
    this.animation = Lottie.loadAnimation({
      container: this.ref,
      animationData,
      path,
      renderer,
      loop,
      autoplay,
      rendererSettings: {
        preserveAspectRatio: this.aspectRatio[aspectRatio],
      }
    })

    this.setSpeed()
  }

  setSpeed() {
    this.animation.setSpeed(this.props.speed)
  }

  componentWillUnmount() {
    this.animation.pause()
    this.animation.destroy()
    this.animation = null
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.play ? this.animation.play() : this.animation.pause()
    this.setSpeed()
  }

  render() {
    const {className} = this.props;

    return (
      <div className={classNames("lottie-animation", className)} ref={this.handleRef}/>
    )
  }
}

LottieAnimation.propTypes = {
  className: PropTypes.string,
  animationData: PropTypes.any,
  path: PropTypes.string,
  renderer: PropTypes.oneOf(["svg", "canvas", "html"]),
  loop: PropTypes.bool,
  autoplay: PropTypes.bool,
  aspectRatio: PropTypes.oneOf(["cover", "cover-left", "cover-right", "contain", "contain-left", "contain-right", "contain-top", "contain-bottom"]),
  play: PropTypes.bool,
  speed: PropTypes.number,
  progression: PropTypes.number,
}

LottieAnimation.defaultProps = {
  className: null,
  animationData: null,
  renderer: "svg",
  path: null,
  loop: true,
  autoplay: true,
  aspectRatio: "cover",
  play: false,
  speed: 1,

}


const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(LottieAnimation)