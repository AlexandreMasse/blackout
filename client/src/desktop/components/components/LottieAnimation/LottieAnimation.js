import React, {Component} from 'react'
import {connect} from 'react-redux';
import classNames from "classnames"
import Lottie from 'lottie-web'
import PropTypes from 'prop-types'
import {TweenMax, Power2} from 'gsap'

//css
import './LottieAnimation.scss'


class LottieAnimation extends Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.animation = null
    this.progression = props.progression

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
    const {animationData, path, renderer, loop, autoplay, aspectRatio, assetsPath} = this.props
    this.animation = Lottie.loadAnimation({
      container: this.ref,
      animationData,
      path,
      renderer,
      loop,
      autoplay,
      rendererSettings: {
        preserveAspectRatio: this.aspectRatio[aspectRatio],
      },
      assetsPath
    })

    this.totalFrames = this.animation.totalFrames

    // console.log(this.animation);

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

    if (prevProps.speed !== this.props.speed) {
      this.setSpeed()
    }

    if(prevProps.progression !== this.props.progression) {

      TweenMax.to(this, this.props.progressionTweenDuration, {
        progression: this.props.progression,
        ease: Power2.easeInOut,
        onUpdate: () => {
          if (this.animation) {
            this.animation.goToAndStop(Math.round(this.progression * this.totalFrames),true)
          }
        }
      })
    }
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
  progressionTweenDuration: PropTypes.number,
  assetsPath: PropTypes.string
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
  progression: null,
  progressionTweenDuration: 1,
  assetsPath: null
}


const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(LottieAnimation)
