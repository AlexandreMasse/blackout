import React, {Component} from 'react'
// redux
import {connect} from 'react-redux'
//css
import './RollingNumber.scss'
import { Howl } from 'howler'
import {AssetsManager} from "./../../../../managers"
//lib
import classNames from "classnames"
import PropTypes from 'prop-types'
import {wsEmitCode} from "../../../redux/actions/websockets/websocketsAction";

class RollingNumber extends Component {

  constructor(props) {
    super(props);


    this.carousels = {
      0: {
        currentPosition: props.numbers[0]
      },
      1: {
        currentPosition: props.numbers[1]
      },
      2: {
        currentPosition: props.numbers[2]
      }
    }

    this.code = props.code

    this.xDown = {};
    this.yDown = {};

    this.touchStartListeners = []
    this.touchMoveListeners = []
    this.resizeListeners = []

    this.itemsPerCarousel = 10

    if (this.props.isMobile) {
      this.initSoundRolling()
    }

  }

  componentDidMount() {
    this.carouselsElements = this.ref.querySelectorAll(".carousel")
    this.initCarousels()


  }

  componentWillReceiveProps(nextProps, nextContext) {
    for(let i = 0; i < this.props.numbers.length; i++) {
      if(nextProps.numbers[i] !== this.props.numbers[i]) {
        console.log("update ", this.props.numbers);
        this.changeCarouselCurrentImage(i, nextProps.numbers[i])
      }
    }
  }

  componentWillUnmount() {
    if (this.props.isMobile) {
      for (let i = 0; i < this.carouselsElements.length; i++) {
        this.carouselsElements[i].removeEventListener('touchstart', this.touchStartListeners[i], false);
        this.carouselsElements[i].removeEventListener('touchmove', this.touchMoveListeners[i], false);
        window.removeEventListener("resize", this.resizeListeners[i])
      }
    }
  }

  getIndexFromPosition = (position) => {
    if (position > 0) {
      return position % this.itemsPerCarousel
    } else if (position < 0) {
      return this.itemsPerCarousel - Math.abs(position % this.itemsPerCarousel)
    } else {
      return 0
    }
  }
  
  initSoundRolling = () => {
    const codeAsset = AssetsManager.get('codeSound')
    this.codeSound = new Howl({
      src: codeAsset.src,
      volume: 1,
      html5: true,
      preload: true,
      autoplay: false,
      loop: false,
      format: ['mp3']
    })
  }

  initCarousels = () => {
    for (let i = 0; i < this.carouselsElements.length; i++) {
      const root = this.carouselsElements[i]
      const index = i


      if (this.props.isMobile) {
        root.addEventListener('touchstart', this.touchStartListeners[index] = (e) => this.handleTouchStart(e, index), false);
        root.addEventListener('touchmove', this.touchMoveListeners[index] = (e) => this.handleTouchMove(e, index), false);
      }

      const
        carouselItemsContainer = root.querySelector('.items-container'),
        carouselItems = carouselItemsContainer.children,
        n = carouselItems.length,
        theta = 2 * Math.PI / n
      ;

      this.carousels = {
        ...this.carousels,
        [index]: {
          ...this.carousels[index],
          carouselItemsContainer,
          carouselItems,
          n,
          theta
        }
      }
      this.setupCarousel(index)
      window.addEventListener("resize", this.resizeListeners[index] = () => this.setupCarousel(index))

    }
  }

  setupCarousel = (carouselIndex) => {

    const {n, carouselItemsContainer, currentPosition, carouselItems, theta} = this.carousels[carouselIndex]

    const s = parseFloat(getComputedStyle(carouselItems[0]).height)

    const apothem = s / (2 * Math.tan(Math.PI / n));

    carouselItemsContainer.style.transformOrigin = `50% 50% ${-apothem}px`;

    for (let i = 1; i < n; i++) {
      carouselItems[i].style.transformOrigin = `50% 50% ${-apothem}px`;
      carouselItems[i].style.transform = `rotateX(${i * theta}rad)`;
      carouselItems[i].style.backfaceVisibility = 'hidden';
    }

    this.changeCarouselCurrentImage(carouselIndex, currentPosition)

  }

  changeCarouselCurrentImage = (carouselIndex, newPosition) => {
    const {carouselItems, currentPosition} = this.carousels[carouselIndex]

    const currentIndex = this.getIndexFromPosition(currentPosition)
    const newIndex = this.getIndexFromPosition(newPosition)

    // Remove class to current item
    carouselItems[currentIndex].classList.remove('current');
    carouselItems[currentIndex].classList.remove('good');

    // add class to new item
    if(this.code[carouselIndex] === newIndex) {
      carouselItems[newIndex].classList.add('good');
    } else {
      carouselItems[newIndex].classList.add('current');
    }


    // update currentPosition
    this.carousels = {
      ...this.carousels,
      [carouselIndex]: {
        ...this.carousels[carouselIndex],
        currentPosition: newPosition,
      }
    }

    this.rotateCarousel(newPosition, carouselIndex)


    if (this.props.isMobile) {

      // Emit code position to desktop
      const code = []
      for (let carousel in this.carousels) {
        code[carousel] = this.carousels[carousel].currentPosition;
      }
      console.log("emit code ", code.map(i => this.getIndexFromPosition(i)));
      this.props.wsEmitCode(code)

      //check if good code
      if(
        this.code[0] === this.getIndexFromPosition(code[0]) &&
        this.code[1] === this.getIndexFromPosition(code[1]) &&
        this.code[2] === this.getIndexFromPosition(code[2])
      ) {
        // change other numbers randomly
        const otherIndexs = [0,1,2]
        otherIndexs.splice(carouselIndex, 1)
        setTimeout(() => {
          otherIndexs.forEach(otherIndex => {
            this.changeCarouselCurrentImage(otherIndex, this.carousels[otherIndex].currentPosition + Math.floor(Math.random() * 9) + 1)
          })
        }, 500)
      }
    }

  }

  rotateCarousel = (imageIndex, carouselIndex) => {
    const {carouselItemsContainer, theta} = this.carousels[carouselIndex];
    carouselItemsContainer.style.transform = `rotateX(${imageIndex * -theta}rad)`;
  }


  // swipe logic


  handleTouchStart = (evt, index) => {
    const firstTouch = evt.touches[0];
    this.xDown[index] = firstTouch.clientX;
    this.yDown[index] = firstTouch.clientY;
  };

  handleTouchMove = (evt, index) => {
    if (typeof index == 'undefined' || !this.xDown[index] || !this.yDown[index]) {
      return;
    }

    if (this.props.isMobile) {
      this.codeSound.play()
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = this.xDown[index] - xUp;
    let yDiff = this.yDown[index] - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
      if (xDiff > 0) {
        /* left swipe */
      } else {
        /* right swipe */
      }
    } else {
      if (yDiff > 0) {
        /* up swipe */
        this.changeCarouselCurrentImage(index, this.carousels[index].currentPosition - 1)
      } else {
        /* down swipe */
        this.changeCarouselCurrentImage(index, this.carousels[index].currentPosition + 1)

      }
    }
    /* reset values */
    this.xDown[index] = null;
    this.yDown[index] = null;
  };

  render() {
    const {className} = this.props
    return (
      <div className={classNames("rolling-number .carousels", className)} ref={ref => this.ref = ref}>

        <div className="carousel carousel-1">
          <div className={"items-container"}>
            <div className="item">
              <p>0</p>
            </div>
            <div className="item">
              <p>1</p>
            </div>
            <div className="item">
              <p>2</p>
            </div>
            <div className="item">
              <p>3</p>
            </div>
            <div className="item">
              <p>4</p>
            </div>
            <div className="item">
              <p>5</p>
            </div>
            <div className="item">
              <p>6</p>
            </div>
            <div className="item">
              <p>7</p>
            </div>
            <div className="item">
              <p>8</p>
            </div>
            <div className="item">
              <p>9</p>
            </div>
          </div>
        </div>

        <div className="separator"/>

        <div className="carousel carousel-2">
          <div className={"items-container"}>
            <div className="item">
              <p>0</p>
            </div>
            <div className="item">
              <p>1</p>
            </div>
            <div className="item">
              <p>2</p>
            </div>
            <div className="item">
              <p>3</p>
            </div>
            <div className="item">
              <p>4</p>
            </div>
            <div className="item">
              <p>5</p>
            </div>
            <div className="item">
              <p>6</p>
            </div>
            <div className="item">
              <p>7</p>
            </div>
            <div className="item">
              <p>8</p>
            </div>
            <div className="item">
              <p>9</p>
            </div>
          </div>
        </div>

        <div className="separator"/>

        <div className="carousel carousel-3">
          <div className={"items-container"}>
            <div className="item">
              <p>0</p>
            </div>
            <div className="item">
              <p>1</p>
            </div>
            <div className="item">
              <p>2</p>
            </div>
            <div className="item">
              <p>3</p>
            </div>
            <div className="item">
              <p>4</p>
            </div>
            <div className="item">
              <p>5</p>
            </div>
            <div className="item">
              <p>6</p>
            </div>
            <div className="item">
              <p>7</p>
            </div>
            <div className="item">
              <p>8</p>
            </div>
            <div className="item">
              <p>9</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

RollingNumber.propTypes = {
  isMobile: PropTypes.bool,
  code: PropTypes.array,
  numbers: PropTypes.array,
  className: PropTypes.string,
}

RollingNumber.defaultProps = {
  isMobile: true,
  code: [1,2,1],
  numbers: [0,0,0],
  className: null
}

const mapStateToProps = (state, props) => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    wsEmitCode: (code) => dispatch(wsEmitCode({code})),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RollingNumber)