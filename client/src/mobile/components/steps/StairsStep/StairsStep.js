import React, {Component} from 'react'
import {connect} from 'react-redux'
import {wsEmitTapValue} from '../../../redux/actions/websockets/websocketsAction'

//css
import './StairsStep.scss'

class StairsStep extends Component {

  constructor(props) {
    super(props)

    this.state = {
      tap: null
      }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.tap !== prevState.tap) {
      this.props.wsEmitTapValue(this.state.tap)
    }
  }

  handleClick = (value) => {
    // e.preventDefault()
    this.setState({tap: value})
  }

  render() {

    return (
      <div className="stairs-step" ref={(ref) => this.ref = ref}>
        <div className="left" onClick={() => this.handleClick('tapLeft')}>

        </div>
        <div className="right"  onClick={() => this.handleClick('tapRight')}>

        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    wsEmitTapValue: (tapValue) => dispatch(wsEmitTapValue({tapValue}))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(StairsStep)
