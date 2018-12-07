import React, {Component} from 'react';
import {connect} from 'react-redux';

//css
import './Keyboard.scss'

class Keyboard extends Component {

  handleKeyPress = (key) => {
    this.props.handleKeyPress(key)
  }

  render() {

    const {handleDelete, handleSubmit} = this.props

    return (
      <div className="keyboard">
        <div className="board">
          <div className="key" onClick={() => this.handleKeyPress("1")}>
            <p>1</p>
          </div>
          <div className="key" onClick={() => this.handleKeyPress("2")}>
            <p>2</p>
          </div>
          <div className="key" onClick={() => this.handleKeyPress("3")}>
            <p>3</p>
          </div>
          <div className="key" onClick={() => this.handleKeyPress("4")}>
            <p>4</p>
          </div>
          <div className="key" onClick={() => this.handleKeyPress("5")}>
            <p>5</p>
          </div>
          <div className="key" onClick={() => this.handleKeyPress("6")}>
            <p>6</p>
          </div>
          <div className="key" onClick={() => this.handleKeyPress("7")}>
            <p>7</p>
          </div>
          <div className="key" onClick={() => this.handleKeyPress("8")}>
            <p>8</p>
          </div>
          <div className="key" onClick={() => this.handleKeyPress("9")}>
            <p>9</p>
          </div>
          <div className="key" onClick={handleDelete}>
            <p>X</p>
          </div>
          <div className="key" onClick={() => this.handleKeyPress("0")}>
            <p>0</p>
          </div>
           <div className="key" onClick={handleSubmit}>
            <p>></p>
          </div>

        </div>
      </div>
    );
  }
}

export default Keyboard
