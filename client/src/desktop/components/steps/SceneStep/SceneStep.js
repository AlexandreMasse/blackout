import React, {Component} from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'
// style
import './SceneStep.scss'
import {SceneManager} from "../../managers";
import {setCurrentScene, setSplitScreen, setUserCurrentScene} from "../../../redux/actions/desktopAction";
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
    const {dispatch, store, currentScene, isSplitScreen, player1CurrentScene, player2CurrentScene } = this.props
    const {isMounted} = this.state

    // const currentScenesArray = [currentScene,"SCENEKINEMATIC"]
    const currentScenesArray = []

    if(isSplitScreen) {
      currentScenesArray.push(player1CurrentScene)
      currentScenesArray.push(player2CurrentScene)
    } else {
      currentScenesArray.push(currentScene)
    }

    return (
      <div className="scene-step step" ref={(ref) => this.ref = ref}>
        <canvas className="canvas"/>
        {currentScenesArray.length > 0 && isMounted && <SceneManager currentScene={currentScenesArray} parentRef={this.ref} dispatch={dispatch} store={store}/>}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    store: state.desktop,
    currentScene: state.desktop.currentScene,
    isSplitScreen: state.desktop.isSplitScreen,
    player1CurrentScene: state.desktop.users.find(user => user.id === "player1").currentScene,
    player2CurrentScene: state.desktop.users.find(user => user.id === "player2").currentScene
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    setCurrentScene: (currentScene) => dispatch(setCurrentScene(currentScene)),
    setSplitScreen: (isSplitScreen) => dispatch(setSplitScreen(isSplitScreen)),
    setUserCurrentScene: (userId, currentScene) => dispatch(setUserCurrentScene({userId, currentScene})),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SceneStep)