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

class Handle extends Component {

  constructor(props) {
    super(props);

    this.isDragging = false

    this.lapsNumber = 6
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

        <div className="handle__progression"/>

        <div className="handle__drag">
          <div className="handle__drag__target"/>
        </div>

        <div className="handle__mask"/>
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