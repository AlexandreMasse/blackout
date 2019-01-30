import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {wsEmitPosition} from '../../../redux/actions/websockets/websocketsAction'

//css
import './StairsStep.scss'

class StairsStep extends Component {

  render() {

    return (
      <div className="stairs-step" ref={(ref) => this.ref = ref}>
        <div className="left">

        </div>
        <div className="right">

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
    //wsEmitPosition: (position) => dispatch(wsEmitPosition({position}))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(StairsStep)
