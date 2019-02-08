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

    this.lapsNumber = 2
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
        //stop rotation if not hover target
        const hoveredElement = document.elementFromPoint(this.draggable.pointerX, this.draggable.pointerY);
        if (hoveredElement !== this.targetElement) {
          return this.draggable.rotation
        } else {
          return value
        }
      },
      onDrag: () => {
        const progression= this.draggable.rotation / (-360 * this.lapsNumber)
        this.props.wsEmitHandle(progression)
      }
    });
    this.draggable.enable()

    // this.ref.addEventListener("touchmove", this.handleTouchMove, false)

  }

  componentWillUnmount() {
    // this.ref.removeEventListener("touchmove", this.handleTouchMove, false)
    this.draggable.kill()
  }

  handleTouchMove = (e) => {
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