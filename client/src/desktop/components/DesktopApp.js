import React, { Component } from 'react';
//redux
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import configureStore from '../redux/store';
import { wsEmitDeviceType } from '../redux/actions/websockets/websocketsAction';
import {
  setAppLoaded,
  setCurrentScene,
  setCurrentStep,
  setUserIndicationTitle,
  setUserIndicationDescription,
  setUserIndicationActive,
  setUserIndicationOpen,
  setSplitScreen,
  setUserCurrentScene,
  setPlayer1SplitScreenPercentage,
  setLang
} from '../redux/actions/desktopAction';
//assets
import load from '../../vendors/assets-loader';
import { assetsToLoad } from '../assets/asset-list';
import { Loading, Indication, Deconnection } from './components';
//steps
import { StepManager } from './managers';
import steps from './steps';
//utils
import { toggleFullscreen } from '../../utils';
import classNames from 'classnames';
// libs
import { injectIntl } from 'react-intl';
// style
import './DesktopApp.scss';
//scenes
import scenes from './scenes';

class DesktopApp extends Component {
  constructor(props) {
    super(props);

    this.props.wsEmitDeviceType('desktop');
    const language = navigator.language.split(/[-_]/)[0]; // language without region code
    // this.props.setLang(language);
    this.props.setLang('en');
    this.props.setCurrentStep(steps.CONNEXION.name);

    window.addEventListener('resize', this.handleWindowResize);
    window.addEventListener('keydown', this.handleWindowKeydown);
    this.handleWindowResize();

    this.state = {
      showDevButton: true,
      splitScreenPercentage: 50,
      isAssetsLoaded: false,
      isServerReady: false
    };
  }

  handleWindowKeydown = e => {
    if (e.key === 'f' || e.code === 'Space') {
      toggleFullscreen();
    }
  };

  handleWindowResize = e => {
    const ratio = window.innerWidth / 1920;
    document.querySelector('html').style.fontSize = 10 * ratio + 'px';
  };

  setfirstIndication = () => {
    this.props.setUserIndicationTitle(
      'player1',
      this.props.intl.formatMessage({ id: 'app.flash.on', defaultMessage: 'Turn on your flashlight' })
    );

    this.props.setUserIndicationDescription(
      'player1',
      this.props.intl.formatMessage({
        id: 'app.on.indication.1',
        defaultMessage: 'Aim at the left + and press the button.'
      })
    );

    this.props.setUserIndicationTitle(
      'player2',
      this.props.intl.formatMessage({ id: 'app.flash.on', defaultMessage: 'Turn on your flashlight' })
    );

    this.props.setUserIndicationDescription(
      'player2',
      this.props.intl.formatMessage({
        id: 'app.on.indication.2',
        defaultMessage: 'Aim at the right + and press the button.'
      })
    );
  };

  assetLoaded = () => {
    load
      .any(assetsToLoad, ev => {})
      .then(assets => {
        window.assets = assets;
        this.setState({
          isAssetsLoaded: true
        });
      });
  };

  componentWillMount() {
    this.assetLoaded();
    // Indication.initTimeline()
  }
  componentDidMount() {
    this.setfirstIndication();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // assets loaded + server ready = app loaded
    if (
      (!prevState.isAssetsLoaded || !prevState.isServerReady) &&
      (this.state.isAssetsLoaded && this.state.isServerReady)
    ) {
      this.props.setAppLoaded();
    }

    // receive roomId = server ready
    if (this.props.roomId !== null && prevProps.roomId !== this.props.roomId) {
      this.setState({
        isServerReady: true
      });
    }
  }

  render() {
    const {
      intl: { formatMessage },
      isLoaded,
      currentStep,
      isPlayer1Connected,
      isPlayer2Connected
    } = this.props;

    return (
      <div className="app desktop-app">
        {!isLoaded ? (
          <Loading />
        ) : (
          <>
            {/* {!isPlayer1Connected && currentStep === 'SCENE' &&
              <Deconnection player={"player 1"} />
            }

            {!isPlayer2Connected && currentStep === 'SCENE' &&
              <Deconnection player={"player 2"} />
            } */}

            <p
              className={'dev-toggle'}
              onClick={() => {
                this.setState({ showDevButton: !this.state.showDevButton });
              }}
            >
              TOGGLE DEV
            </p>
            <div
              className={classNames('dev-button', {
                show: this.state.showDevButton
              })}
            >
              <p onClick={() => this.props.setCurrentStep(steps.CONCLUSION.name)}>Step : Conclusion</p>
              <p onClick={() => this.props.setCurrentStep(steps.ANALYSIS.name)}>Step : analysis</p>
              <p onClick={() => this.props.setCurrentStep(steps.SCENE.name)}>Step : scene</p>
              <hr />
              <p onClick={() => this.props.setCurrentScene(scenes.SCENEFLASHLIGHT.name)}>Scene : flashlight</p>
              <p onClick={() => this.props.setCurrentScene(scenes.SCENEKINEMATIC2.name)}>Scene : kinematic 2</p>
              <hr />
              <p
                onClick={() => {
                  this.props.setSplitScreen(true);
                }}
              >
                SplitScreen : true
              </p>
              <p onClick={() => this.props.setUserCurrentScene('player1', scenes.SCENESTAIRS.name)}>
                Player 1 Scene : stair
              </p>
              <p onClick={() => this.props.setUserCurrentScene('player2', scenes.SCENESTAIRS.name)}>
                Player 2 Scene : stair
              </p>
              <p onClick={() => this.props.setUserCurrentScene('player1', scenes.SCENEDOOR.name)}>
                Player 1 Scene : Door
              </p>
              <p onClick={() => this.props.setUserCurrentScene('player2', scenes.SCENEDOOR.name)}>
                Player 2 Scene : Door
              </p>
              <hr />
              <p onClick={() => this.props.setUserIndicationActive('player1', true)}>Indication : player 1 active</p>
              <p onClick={() => this.props.setUserIndicationOpen('player1', false)}>Indication : player 1 not open</p>
              <p onClick={() => this.props.setUserIndicationOpen('player1', true)}>Indication : player 1 open</p>
              <p onClick={() => this.props.setUserIndicationActive('player1', false)}>
                Indication : player 1 not active
              </p>
              <hr />
              <h1 className="App-title">{formatMessage({ id: 'app.title' })}</h1>
              <input
                onChange={e => {
                  this.props.setPlayer1SplitScreenPercentage(Number(e.target.value) / 100);
                  this.setState({ splitScreenPercentage: e.target.value });
                }}
                className="range"
                type="range"
                value={this.state.splitScreenPercentage}
                // step="0.01"
                max="100"
                min="0"
              />

              <input
                onChange={e => {
                  this.setState({ durationOverlay: Number(e.target.value) });
                }}
                className="range"
                type="range"
                value={this.state.durationOverlay}
                step="0.01"
                max="2"
                min="0"
              />
            </div>
            <Indication player={'player1'} />
            <Indication player={'player2'} />
            <StepManager currentStep={currentStep} />
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoaded: state.desktop.app.isLoaded,
    roomId: state.desktop.roomId,
    currentStep: state.desktop.currentStep,
    isPlayer1Connected: state.desktop.users.find(user => user.id === 'player1').isConnected,
    isPlayer2Connected: state.desktop.users.find(user => user.id === 'player2').isConnected
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLang: lang => dispatch(setLang(lang)),
    wsEmitDeviceType: type => dispatch(wsEmitDeviceType({ type })),
    setAppLoaded: () => dispatch(setAppLoaded()),
    setUserIndicationTitle: (userId, title) => dispatch(setUserIndicationTitle({ userId, title })),
    setUserIndicationDescription: (userId, description) =>
      dispatch(setUserIndicationDescription({ userId, description })),
    setCurrentStep: currentStep => dispatch(setCurrentStep(currentStep)),
    setCurrentScene: currentScene => dispatch(setCurrentScene(currentScene)),
    setUserIndicationActive: (userId, isActive) => dispatch(setUserIndicationActive({ userId, isActive })),
    setUserIndicationOpen: (userId, isOpen) => dispatch(setUserIndicationOpen({ userId, isOpen })),
    setUserCurrentScene: (userId, currentScene) => dispatch(setUserCurrentScene({ userId, currentScene })),
    setSplitScreen: isSplitScreen => dispatch(setSplitScreen({ isSplitScreen })),
    setPlayer1SplitScreenPercentage: splitScreenPercentage =>
      dispatch(setPlayer1SplitScreenPercentage({ splitScreenPercentage }))
  };
};

const DesktopAppConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(DesktopApp));

export default () => (
  <Provider store={configureStore()}>
    <DesktopAppConnected />
  </Provider>
);
