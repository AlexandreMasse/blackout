import React from 'react';

const withDeviceOrientation = (WrappedComponent) => {

  class HOC extends React.Component {

    constructor(props) {
      super(props)

      // The angle at which we stop listening for input from the phone's gyro.
      this.MAX_X_ANGLE = 20;
      this.MAX_Y_ANGLE = 24;

      this.loopUpdateTimer = 0;
      this.position = {x:0,y:0};
      this.latestAlpha = 0;
      this.baseAlpha = null;
      this.touching = false;

      this.state = {
        positionListened: this.position
      }
    }


    // Convert the phone's gyro data into screen coordinates.
    handleDeviceOrientation = (data) => {
      let x,
        y,
        alpha = this.latestAlpha = data.alpha,
        beta = data.beta;

      if (this.baseAlpha !== null) {
        alpha = alpha - this.baseAlpha;
        alpha += 360;
        alpha %= 360;
      }

      // Left/right rotation.
      if (alpha > 360 - this.MAX_X_ANGLE) {

        // phone is rotating right:
        x = 100 / this.MAX_X_ANGLE * (360 - alpha);
      } else if (alpha < this.MAX_X_ANGLE) {

        // phone is rotating left:
        x = 100 / this.MAX_X_ANGLE * (0 - alpha);
      } else {

        // Stop rotation at max angle.
        if (alpha > this.MAX_X_ANGLE && alpha < 180) {
          x = -100;
        } else {
          x = 100;
        }
      }

      // Up/down rotation.
      if (beta > 0 && beta <= this.MAX_Y_ANGLE
        || beta < 0 && beta >= this.MAX_Y_ANGLE * -1) {
        y = 100 / this.MAX_Y_ANGLE * (beta * -1);
      } else {
        if (beta > 0) {
          y = -100;
        } else {
          y = 100;
        }
      }

      // Normalize percentages to from (0, 100) to (0, 1):
      x *= 0.01;
      y *= 0.01;

      this.position.x = x;
      this.position.y = y;
    }

    handleTouchStartEvent = (e) => {
      e.preventDefault();

      // Every time we touch and hold we calibrate to the center of the screen.
      this.baseAlpha = this.latestAlpha;
      this.touching = true;
      this.update();
    }


    handleTouchEndEvent = (e) => {
      e.preventDefault();
      this.touching = false;
    }

    update = () => {
      if (this.touching) {
        //send position
        // io.emit('position', this.position);
        this.setState({
          positionListened: {x: this.position.x, y: this.position.y},
        })
        this.loopUpdateTimer = setTimeout(this.update, 16);
      }
    }


    initEventListener = (wrappedComponentRef) => {
      const touchElement = wrappedComponentRef.querySelector('.power-button')
      if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', this.handleDeviceOrientation, false);

        touchElement.addEventListener('touchstart', this.handleTouchStartEvent, {
            capture: true,
            passive: false
          }
        );

        touchElement.addEventListener('mousedown', this.handleTouchStartEvent, {
            capture: true,
            passive: false
          }
        );

        touchElement.addEventListener('touchend', this.handleTouchEndEvent, {
            capture: true,
            passive: false
          }
        );

        touchElement.addEventListener('mouseup', this.handleTouchEndEvent, {
            capture: true,
            passive: false
          }
        );
      } else {
        alert('This device is not supported.');
      }
    }

    // We need to check for DeviceOrientation support because some devices do not
    // support it. For example, phones with no gyro.
    componentWillMount() {

    }

    shouldComponentUpdate() {
      return this.touching
    }

    render() {
      return (
        <WrappedComponent {...this.props} deviceOrientationPosition={this.state.positionListened} handleRef={this.initEventListener}/>
      );
    }
  }

  return HOC;
};

export default withDeviceOrientation;