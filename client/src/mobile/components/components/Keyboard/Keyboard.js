import React, {Component} from 'react';
import PropType from 'prop-types'
import Classnames from 'classnames'

//css
import './Keyboard.scss'

class Keyboard extends Component {

  handleKeyPress = (key) => {
    this.props.handleKeyPress(key)
  }

  handleSubmit = () => {
    const {handleSubmit, isSumitActived} = this.props
    if(isSumitActived) {
      handleSubmit()
    }
  }

  render() {

    const {handleDelete, isSumitActived} = this.props

    return (
      <div className="keyboard">
        <div className="keyboard__board">
          <div className="keyboard__board__key" onClick={() => this.handleKeyPress("1")}>
            <p>1</p>
          </div>
          <div className="keyboard__board__key" onClick={() => this.handleKeyPress("2")}>
            <p>2</p>
          </div>
          <div className="keyboard__board__key" onClick={() => this.handleKeyPress("3")}>
            <p>3</p>
          </div>
          <div className="keyboard__board__key" onClick={() => this.handleKeyPress("4")}>
            <p>4</p>
          </div>
          <div className="keyboard__board__key" onClick={() => this.handleKeyPress("5")}>
            <p>5</p>
          </div>
          <div className="keyboard__board__key" onClick={() => this.handleKeyPress("6")}>
            <p>6</p>
          </div>
          <div className="keyboard__board__key" onClick={() => this.handleKeyPress("7")}>
            <p>7</p>
          </div>
          <div className="keyboard__board__key" onClick={() => this.handleKeyPress("8")}>
            <p>8</p>
          </div>
          <div className="keyboard__board__key" onClick={() => this.handleKeyPress("9")}>
            <p>9</p>
          </div>
          <div className="keyboard__board__key"/>
          <div className="keyboard__board__key" onClick={() => this.handleKeyPress("0")}>
            <p>0</p>
          </div>
           <div className="keyboard__board__key keyboard__board__key_delete" onClick={handleDelete}>
              <svg  viewBox="0 0 47 32">
                <use xlinkHref="#icon-delete" />
              </svg>
          </div>
        </div>
        <button className={Classnames("keyboard__button", {'active' : isSumitActived})} onClick={this.handleSubmit}>
           <span>{'> Valider <'}</span>
        </button>
      </div>
    );
  }
}

Keyboard.propTypes = {
  handleSubmit: PropType.func,
  handleDelete: PropType.func,
  isSumitActived: PropType.bool
}

Keyboard.defaultProps = {
  isSumitActived: true
}

export default Keyboard
