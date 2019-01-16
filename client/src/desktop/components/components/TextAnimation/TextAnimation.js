import React, { Component } from 'react'
import Word from './Word'
import PropTypes from "prop-types"
import classNames from "classnames"

import './TextAnimation.scss'


export default class TextAnimation extends Component {
  constructor(props) {
    super(props)
  }

  handleRef = (ref) => {
    this.initWord(ref)
  }

  initWord(ref) {
    const {text, handleWord, letterDuration, letterMinSpeed, letterMaxSpeed} = this.props
    this.word = new Word(ref, text, letterDuration, letterMinSpeed, letterMaxSpeed)

    if(handleWord) handleWord(this.word)
  }

  render() {
    const {className} = this.props
    return (
      <p className={classNames("textAnimation", className)} ref={this.handleRef} />
    )
  }
}

TextAnimation.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  handleWord: PropTypes.func,
  letterDuration: PropTypes.number,
  letterMinSpeed: PropTypes.number,
  letterMaxSpeed: PropTypes.number,
}

TextAnimation.defaultProps = {
  className: null,
  handleWord: null,
  letterDuration: 500,
  letterMinSpeed: 30,
  letterMaxSpeed: 500,
}