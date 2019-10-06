import React, { Component, Fragment } from 'react';
//redux
import { connect } from 'react-redux';
import { wsEmitIntroProgression } from '../../../redux/actions/websockets/websocketsAction';
import { setCurrentStep } from '../../../redux/actions/mobileAction';
//lib
import GyroNorm from 'gyronorm';
import { TweenMax } from 'gsap';
import { Howl } from 'howler';
import { AssetsManager } from './../../../../managers';
import { Transition } from 'react-transition-group';
import { injectIntl } from 'react-intl';
//css
import './LunchStep.scss';
import { assetsToLoad } from '../../../assets/asset-list';

class LunchStep extends Component {
  constructor(props) {
    super(props);

    this.state = {
      finish: false,
      substep: 1
    };

    this.lastBeta = null;
    this.currentDirection = null;

    this.initSound();

    this.substep1ExitDuration = 1;
    this.substep2EnterDuration = 1.5;
    this.substep2EnterDelay = 0.3;
  }

  listenDeviceOrientation() {
    this.gn = new GyroNorm();

    const args = {
      frequency: 50,
      gravityNormalized: true,
      orientationBase: GyroNorm.GAME,
      decimalCount: 2,
      logger: null,
      screenAdjusted: false
    };

    this.gn
      .init(args)
      .then(() => {
        this.gn.start(data => {
          const minBeta = 20;
          const maxBeta = 83;
          const progression = (data.do.beta - minBeta) / (maxBeta - minBeta);
          const progressionClamped = Math.min(Math.max(progression, 0), 1);
          const progressionRounded = Number(progressionClamped.toPrecision(4));

          // this.soundMobileUp.volume(progressionRounded)

          // if(this.lastBeta) {
          //   if(this.lastBeta < data.do.beta) {
          //     if(this.currentDirection === "down" || this.currentDirection === null) {
          //       console.log("up");
          //       this.soundMobileUp.play()
          //       this.soundMobileUp.fade(this.soundMobileUp.volume(), 1, 200)
          //       //this.soundMobileDown.fade(this.soundMobileDown.volume(), 0, 200)
          //
          //       this.currentDirection = "up"
          //     }
          //   } else {
          //     if (this.currentDirection === "up" || this.currentDirection === null) {
          //       console.log("down");
          //       // this.soundMobileDown.play()
          //       // this.soundMobileDown.fade(this.soundMobileDown.volume(), 1, 200)
          //       this.soundMobileUp.fade(this.soundMobileUp.volume(), 0, 200)
          //       //
          //       this.currentDirection = "down"
          //     }
          //   }
          // }
          // this.lastBeta = data.do.beta

          if (this.state.substep === 2) {
            if (!this.state.finish) {
              this.updateProgression(progressionRounded);
              this.props.wsEmitIntroProgression(progressionRounded);
            } else {
              this.updateProgression(1);
              this.props.wsEmitIntroProgression(1);
              this.gn.stop();
            }
          }
        });
      })
      .catch(e => {
        console.error(e);
      });
  }

  updateProgression = progression => {
    if (this.progression && this.arrow) {
      TweenMax.to(this.progression, 0.1, { scaleY: progression });
      TweenMax.to(this.arrow, 0.1, { transform: `rotate(180deg) translateY(${progression * 14}rem)` });
      if (progression >= 1 && !this.state.finish) {
        this.setState({ finish: true });
      }
    }
  };

  initSound = () => {
    const soundMobileUp = AssetsManager.get('mobileUp');
    this.soundMobileUp = new Howl({
      src: soundMobileUp.src,
      volume: 0,
      html5: true,
      preload: true,
      autoplay: false,
      loop: true,
      format: ['mp3']
    });

    // this.soundMobileUp.play()

    const soundMobileDown = AssetsManager.get('mobileDown');
    this.soundMobileDown = new Howl({
      src: soundMobileDown.src,
      volume: 0,
      html5: true,
      preload: true,
      autoplay: false,
      loop: false,
      format: ['mp3']
    });
  };

  componentWillUnmount() {
    this.gn.end();
    this.soundMobileUp.stop();
  }

  componentDidMount() {}

  substep2OnEnter = el => {
    this.arrow = el.querySelector('.lunch-step__substep2__arrow');
    this.progression = el.querySelector('.lunch-step__substep2__box__progression');
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      // iOS 13+
      DeviceOrientationEvent.requestPermission()
      .then(response => {
        if (response == 'granted') {
          this.listenDeviceOrientation();
        }
      })
      .catch(console.error)
    } else {
      // non iOS 13+
      this.listenDeviceOrientation();
    }

    TweenMax.set(el, {
      opacity: 0
    });
    TweenMax.to(el, this.substep2EnterDuration, {
      opacity: 1,
      delay: 0.3
    });
  };

  substep1OnExit = el => {
    TweenMax.to(el, this.substep1ExitDuration, {
      opacity: 0
    });
  };

  onButtonClick = () => {
    this.setState({
      substep: 0
    });
  };

  render() {
    const {
      isConnected,
      intl: { formatMessage }
    } = this.props;
    const { substep } = this.state;

    return (
      <div
        className="lunch-step"
        ref={ref => {
          this.ref = ref;
        }}
      >
        <Transition
          in={substep === 1}
          timeout={this.substep1ExitDuration * 1000}
          appear={true}
          mountOnEnter={true}
          unmountOnExit={true}
          onExit={this.substep1OnExit}
          onExited={() => this.setState({ substep: 2 })}
        >
          <div className="lunch-step__substep1">
            <p className={'lunch-step__substep1__text1'}>
              {formatMessage({
                id: 'app.launch.1',
                defaultMessage: 'This smartphone will be your controller during the whole game.'
              })}
            </p>
            <p className={'lunch-step__substep1__text2'}>
              {formatMessage({
                id: 'app.launch.2',
                defaultMessage: 'Turn on the sound, don’t leave the site and don’t lock your phone.'
              })}
            </p>
            <button className="lunch-step__substep1__button" onClick={this.onButtonClick}>
              <span>{'> OK <'}</span>
            </button>
          </div>
        </Transition>

        <Transition
          in={substep === 2}
          timeout={(this.substep1ExitDuration + this.substep2EnterDuration + this.substep2EnterDelay) * 1000}
          appear={true}
          mountOnEnter={true}
          unmountOnExit={true}
          onEnter={this.substep2OnEnter}
        >
          <div className="lunch-step__substep2">
            <img
              className="lunch-step__substep2__arrow"
              src={AssetsManager.get(assetsToLoad.arrowDonwWhite.name).src}
              alt=""
            />
            <div className={'lunch-step__substep2__box'}>
              <div className="lunch-step__substep2__box__progression" />
              <p>
                {formatMessage({
                  id: 'app.launch.3',
                  defaultMessage: 'Maintain your phone vertically to begin.'
                })}
              </p>
            </div>
          </div>
        </Transition>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isConnected: state.mobile.isConnected
  };
};

const mapDispatchToProps = dispatch => {
  return {
    wsEmitIntroProgression: progression => dispatch(wsEmitIntroProgression({ progression })),
    setCurrentStep: currentStep => dispatch(setCurrentStep(currentStep))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(LunchStep));
