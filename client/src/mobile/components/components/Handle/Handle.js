import React, {Component} from 'react'
// redux
import {connect} from 'react-redux'
import {wsEmitHandle} from "../../../redux/actions/websockets/websocketsAction";
//css
import './Handle.scss'
//lib
import classNames from "classnames"
import PropTypes from 'prop-types'
import {Draggable} from 'gsap/all'
import {LottieAnimation} from "../../../../desktop/components/components";
import animations from "../../../../desktop/components/components/LottieAnimation/animations"

class Handle extends Component {

  constructor(props) {
    super(props);

    this.isDragging = false

    this.lapsNumber = 20

    this.state = {
      progression: 0
    }

  }

  componentDidMount() {

    const dragElement = this.ref.querySelector(".handle__drag")
    this.targetElement = this.ref.querySelector(".handle__drag__target")

    this.draggable = new Draggable(dragElement, {
      type: "rotation",
      throwProps: false,
      trigger: this.targetElement,
      bounds: {minRotation: 0, maxRotation: -360 * this.lapsNumber},
      liveSnap: (value) => {
        // //stop rotation if not hover target
        // const hoveredElement = document.elementFromPoint(this.draggable.pointerX, this.draggable.pointerY);
        // if (hoveredElement !== this.targetElement) {
        //   return this.draggable.rotation
        // } else {
        //   return value
        // }
        const progression = this.draggable.rotation / (-360 * this.lapsNumber)
        this.setState({progression})
        if (progression === 1) {
          this.props.wsEmitHandle(progression)
        }
        return value
      },
      onDrag: this.throttle(this.onDragThrottled, 80)
    });
    this.draggable.enable()

  }

  onDragThrottled = () => {
    const progression = this.draggable.rotation / (-360 * this.lapsNumber)
    this.props.wsEmitHandle(progression)
  }


  throttle = (fn, delay) => {
    let lastCall = 0;
    return function (...args) {
      const now = (new Date).getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return fn(...args);
    }
  }

  componentWillUnmount() {
    this.draggable.kill()
  }

  render() {
    const {className} = this.props
    return (
      <div className={classNames("handle", className)} ref={ref => this.ref = ref}>

        <div className="handle__lottie-container">
          <LottieAnimation
          animationData={animations.MobileHandle}
          autoplay={false}
          progression={this.state.progression}
          progressionTweenDuration={0.1}
          clampLastFrames={1}
          className={"handle__lottie"}
        />

          <div className="handle__drag">
            <div className="handle__drag__target"/>
          </div>

          <svg className="mobile-handle-center" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 700" width="700" height="700"
               preserveAspectRatio="xMidYMid meet">
            <g className="center" transform="matrix(1,0,0,1,345,213)" opacity="1">
              <path fill="rgb(0,0,0)" fillOpacity="1"
                    d=" M3.575000047683716,1.75 C39.43199920654297,1.75 73.14399719238281,15.71399974822998 98.4990005493164,41.069000244140625 C123.85399627685547,66.42400360107422 137.8179931640625,100.13600158691406 137.8179931640625,135.99400329589844 C137.8179931640625,171.8509979248047 123.85399627685547,205.56300354003906 98.4990005493164,230.91799926757812 C73.14399719238281,256.27301025390625 39.43199920654297,270.23699951171875 3.575000047683716,270.23699951171875 C-32.28300094604492,270.23699951171875 -65.99400329589844,256.27301025390625 -91.3489990234375,230.91799926757812 C-116.70500183105469,205.56300354003906 -130.66900634765625,171.8509979248047 -130.66900634765625,135.99400329589844 C-130.66900634765625,100.13600158691406 -116.70500183105469,66.42400360107422 -91.3489990234375,41.069000244140625 C-65.99400329589844,15.71399974822998 -32.28300094604492,1.75 3.575000047683716,1.75z"></path>
              <g opacity="1" transform="matrix(1,0,0,1,0,0)"></g>
            </g>
          </svg>
        </div>


      </div>
    )
  }
}

Handle.propTypes = {
  className: PropTypes.string,
}

Handle.defaultProps = {
  className: null
}

const mapStateToProps = (state, props) => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    wsEmitHandle: (handle) => dispatch(wsEmitHandle({handle})),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Handle)