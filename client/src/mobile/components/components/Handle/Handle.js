import React, {Component} from 'react'
// redux
import {connect} from 'react-redux'
import {wsEmitCode} from "../../../redux/actions/websockets/websocketsAction";
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
  }

  componentDidMount() {

    const dragElement = this.ref.querySelector(".handle__drag")
    this.targetElement = this.ref.querySelector(".handle__drag__target")

    this.draggable = new Draggable(dragElement, {
      type: "rotation",
      throwProps: false,
      trigger: this.targetElement,
      onDrag: function () {
        console.log(this)
      }
    });
    this.draggable.enable()

    this.ref.addEventListener("touchmove", this.handleTouchMove, false)

  }

  componentWillReceiveProps(nextProps, nextContext) {

  }

  componentWillUnmount() {
    this.ref.removeEventListener("touchmove", this.handleTouchMove, false)
    this.draggable.kill()
  }

  handleTouchMove = (e) => {
    // TODO: use livesnap instead ?
    //stop drag if not hover target
    const hoveredElement = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
    if(hoveredElement !== this.targetElement) {
      this.draggable.endDrag()
    }
  }



  render() {
    const {className} = this.props
    return (
      <div className={classNames("handle", className)} ref={ref => this.ref = ref}>

        <div className="handle__progression"/>
        <div className="handle__drag">
          <div className="handle__drag__target"/>
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
    //wsEmitCode: (code) => dispatch(wsEmitCode({code})),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Handle)