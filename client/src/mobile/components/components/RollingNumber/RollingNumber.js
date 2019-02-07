import React, {Component} from 'react'
// redux
import {connect} from 'react-redux'
//css
import './RollingNumber.scss'
//lib
import {Power1, TweenMax} from 'gsap'
import PropTypes from 'prop-types'

class RollingNumber extends Component {

  constructor(props) {
    super(props);

    this.state = {
      carousels: {
        0: {
          currentItem: props.numbers[0]
        },
        1: {
          currentItem: props.numbers[1]
        },
        2: {
          currentItem: props.numbers[2]
        }
      }
    }

    this.xDown = {};
    this.yDown = {};

    this.touchStartListeners = []
    this.touchMoveListeners = []
    this.resizeListeners = []

  }

  componentDidMount() {
    this.carousels = this.ref.querySelectorAll(".carousel")

    this.initCarousels()
  }

  componentWillReceiveProps(nextProps, nextContext) {
    for(let i = 0; i < this.props.numbers.length; i++) {
      if(nextProps.numbers[i] !== this.props.numbers[i]) {
        this.changeCarouselCurrentImage(i, nextProps.numbers[i])
      }
    }
  }

  componentWillUnmount() {
    if (this.props.isMobile) {
      for (let i = 0; i < this.carousels.length; i++) {
        this.carousels[i].removeEventListener('touchstart', this.touchStartListeners[i], false);
        this.carousels[i].removeEventListener('touchmove', this.touchMoveListeners[i], false);
        window.removeEventListener("resize", this.resizeListeners[i])
      }
    }
  }

  handleRef = (el) => {
    this.props.handleRef(el)
  }

  initCarousels = () => {
    for (let i = 0; i < this.carousels.length; i++) {
      this.carousel(this.carousels[i], i);
    }
  }

  carousel = (root, index) => {

    if(this.props.isMobile) {
      root.addEventListener('touchstart', this.touchStartListeners[index] = (e) => this.handleTouchStart(e, index), false);
      root.addEventListener('touchmove', this.touchMoveListeners[index] = (e) => this.handleTouchMove(e, index), false);
    }

    const
      carouselItemsContainer = root.querySelector('.items-container'),
      carouselItems = carouselItemsContainer.children,
      n = carouselItems.length,
      //gap = root.dataset.gap || 0,
      //bfc = 'bfc' in root.dataset,
      theta = 2 * Math.PI / n
    ;

    this.setState(prevState => ({
      carousels: {
        ...prevState.carousels,
        [index]: {
          ...prevState.carousels[index],
          carouselItemsContainer,
          carouselItems,
          n,
          theta
        }
      }
    }), () => {
      this.setupCarousel(index)
      window.addEventListener("resize", this.resizeListeners[index] = () => this.setupCarousel(index))
    })

  }

  setupCarousel = (index) => {

    const {n, carouselItemsContainer, currentItem, carouselItems, theta} = this.state.carousels[index]

    const s = parseFloat(getComputedStyle(carouselItems[0]).height)

    const apothem = s / (2 * Math.tan(Math.PI / n));

    carouselItemsContainer.style.transformOrigin = `50% 50% ${-apothem}px`;

    for (let i = 1; i < n; i++) {
      carouselItems[i].style.transformOrigin = `50% 50% ${-apothem}px`;
      carouselItems[i].style.transform = `rotateX(${i * theta}rad)`;
      carouselItems[i].style.backfaceVisibility = 'hidden';
    }

    this.changeCarouselCurrentImage(index, currentItem)

  }

  changeCarouselCurrentImage = (carouselIndex, newItem) => {
    const {carouselItems, currentItem} = this.state.carousels[carouselIndex]

    const getItemIndex = (index) => {
      if (index % 10 > 0) {
        return index % 10
      } else if (index % 10 < 0) {
        return 10 - Math.abs(index % 10)
      } else {
        return 0
      }
    }

    const currentIndex = getItemIndex(currentItem)
    const newIndex = getItemIndex(newItem)

    //Todo: emit code : newIndex
    if(this.props.isMobile) {
      //this.props.
    }




    carouselItems[currentIndex].classList.remove('current');
    carouselItems[currentIndex].classList.remove('good');

    if(this.props.code[carouselIndex] === newIndex) {
      carouselItems[newIndex].classList.add('good');
    } else {
      carouselItems[newIndex].classList.add('current');
    }


    this.setState(prevState => ({
      carousels: {
        ...prevState.carousels,
        [carouselIndex]: {
          ...prevState.carousels[carouselIndex],
          currentItem: newItem,
        }
      }
    }), () => {
      this.rotateCarousel(newItem, carouselIndex)
    })
  }

  rotateCarousel = (imageIndex, carouselIndex) => {
    const {carouselItemsContainer, theta} = this.state.carousels[carouselIndex];
    carouselItemsContainer.style.transform = `rotateX(${imageIndex * -theta}rad)`;
  }


  // swipe logic


  handleTouchStart = (evt, element) => {
    const firstTouch = evt.touches[0];
    this.xDown[element] = firstTouch.clientX;
    this.yDown[element] = firstTouch.clientY;
  };

  handleTouchMove = (evt, element) => {
    if (typeof element == 'undefined' || !this.xDown[element] || !this.yDown[element]) {
      return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = this.xDown[element] - xUp;
    let yDiff = this.yDown[element] - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
      if (xDiff > 0) {
        /* left swipe */
      } else {
        /* right swipe */
      }
    } else {
      if (yDiff > 0) {
        /* up swipe */
        this.changeCarouselCurrentImage(element, this.state.carousels[element].currentItem - 1)
      } else {
        /* down swipe */
        this.changeCarouselCurrentImage(element, this.state.carousels[element].currentItem + 1)

      }
    }
    /* reset values */
    this.xDown[element] = null;
    this.yDown[element] = null;
  };

  render() {
    return (
      <div className="rolling-number .carousels" ref={ref => this.ref = ref}>

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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RollingNumber)