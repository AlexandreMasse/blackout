import React, { Component } from 'react';
import { connect } from 'react-redux';

//css
import './Cursor.scss'

class Cursor extends Component {
  render() {
    const x = this.props.x * (window.innerWidth * .5);
    const y = this.props.y * (window.innerHeight * .5);
    return (
      <div className="cursor">
        <div className="cursor-pointer" style={{
          transform: `translate3d(${x}px,${y}px,0)`
        }}/>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    x: state.desktop.position.x,
    y: state.desktop.position.y,
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps,mapDispatchToProps)(Cursor);
