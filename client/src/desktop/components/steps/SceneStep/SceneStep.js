import React, {Component} from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'
// style
import './SceneStep.scss'
import {SceneManager} from "../../managers";
import {setCurrentScene} from "../../../redux/actions/desktopAction";
import scenes from './../../scenes'

class SceneStep extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isMounted: null
    }
  }

  componentDidMount() {
    this.setState({isMounted: true})
  }

  render() {
    const {currentScene} = this.props
    const {isMounted} = this.state

    return (
      <div className="scene-step step" ref={(ref) => this.ref = ref}>
          <button className={"scene-step__button"} onClick={() => this.props.setCurrentScene(scenes.SCENE2.name)}>SCENE 2 ></button>
        {currentScene && isMounted && <SceneManager currentScene={currentScene} parentRef={this.ref}/>}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentScene: state.desktop.currentScene,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentScene: (currentScene) => dispatch(setCurrentScene(currentScene))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SceneStep)