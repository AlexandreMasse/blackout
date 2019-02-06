import React, {Component} from 'react'
// redux
import {connect} from 'react-redux'
import {wsEmitFingerprint} from "../../../redux/actions/websockets/websocketsAction";
//import {setCurrentStep} from "../../../redux/actions/mobileAction";
//css
import './CodeStep.scss'
//lib
import {Power1, TweenMax} from 'gsap'

class CodeStep extends Component {


  constructor(props) {
    super(props);

    this.state = {
      code: 0,
      carousels: {
        0: {
          currImage: 0
        },
        1: {
          currImage: 0
        },
        2: {
          currImage: 0
        }
      }
    }

  }

  handleRef = (el) => {
    this.props.handleRef(el)
  }

  componentDidMount() {
    this.carousels = this.ref.querySelectorAll(".carousel")

    this.initCarousels()
  }

  initCarousels = () => {
    for (let i = 0; i < this.carousels.length; i++) {
      this.carousel(this.carousels[i], i);
    }
  }

  carousel = (root, index) => {


    root.addEventListener('touchstart', (e) => this.handleTouchStart(e, index), false);
    root.addEventListener('touchmove', (e) => this.handleTouchMove(e, index), false);

    this.ref.addEventListener('touchstart', this.handleTouchStart, false);
    this.ref.addEventListener('touchmove', this.handleTouchMove, false);

    this.xDown = {};
    this.yDown = {};
    const
      carouselItemsContainer = root.querySelector('.items-container'),
      nav = root.querySelector('nav'),
      carouselItems = carouselItemsContainer.children,
      n = carouselItems.length,
      gap = root.dataset.gap || 0,
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
          theta,
          nav
        }
      }
    }), () => {
      this.setupCarousel(index)
      this.setupNavigation(index)
      window.addEventListener("resize", () => this.setupCarousel(index))
    })

  }

  setupCarousel = (index) => {

    const {n, carouselItemsContainer, currImage, carouselItems, theta} = this.state.carousels[index]

    const s = parseFloat(getComputedStyle(carouselItems[0]).height)

    const apothem = s / (2 * Math.tan(Math.PI / n));

    carouselItemsContainer.style.transformOrigin = `50% 50% ${-apothem}px`;

    for (let i = 1; i < n; i++) {
      carouselItems[i].style.transformOrigin = `50% 50% ${-apothem}px`;
      carouselItems[i].style.transform = `rotateX(${i * theta}rad)`;
    }

    this.rotateCarousel(currImage, index)

  }

  setupNavigation = (carouselIndex) => {
    const {nav} = this.state.carousels[carouselIndex]

    const onClick = (e) => {
      e.stopPropagation();

      let t = e.target;
      if (t.tagName.toUpperCase() != 'BUTTON')
        return;

      let {currImage} = this.state.carousels[carouselIndex]
      //let currImageTemp = 0


      if (t.classList.contains('next')) {
        currImage++;
      } else {
        currImage--;
      }

      this.setState(prevState => ({
        carousels: {
          ...prevState.carousels,
          [carouselIndex]: {
            ...prevState.carousels[carouselIndex],
            currImage,
          }
        }
      }), () => {
        this.rotateCarousel(currImage, carouselIndex)
      })

    }

    nav.addEventListener('click', onClick, true);
  }

  changeCarouselCurrentImage = (carouselIndex, newImage) => {
    this.setState(prevState => ({
      carousels: {
        ...prevState.carousels,
        [carouselIndex]: {
          ...prevState.carousels[carouselIndex],
          currImage: newImage,
        }
      }
    }), () => {
      this.rotateCarousel(newImage, carouselIndex)
    })
  }

  rotateCarousel = (imageIndex, carouselIndex) => {
    const {carouselItemsContainer, theta} = this.state.carousels[carouselIndex];
    carouselItemsContainer.style.transform = `rotateX(${imageIndex * -theta}rad)`;
  }

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
        console.log("swipe up on :" + element);
        this.changeCarouselCurrentImage(element, this.state.carousels[element].currImage - 1)
      } else {
        /* down swipe */

        console.log("swipe down on :" + element);
        this.changeCarouselCurrentImage(element, this.state.carousels[element].currImage + 1)

      }
    }
    /* reset values */
    this.xDown[element] = null;
    this.yDown[element] = null;
  };

  render() {
    return (
      <div className="code-step" ref={ref => this.ref = ref}>

        <div className="carousels">
          {/*<div className="carousel carousel-1">*/}
          {/*<div className={"items-container"}>*/}
          {/*<img src="https://source.unsplash.com/nvzvOPQW0gc/800x533" alt="" className={"item"}/>*/}
          {/*<img src="https://source.unsplash.com/EbuaKnSm8Zw/800x533" alt="" className={"item"}/>*/}
          {/*<img src="https://source.unsplash.com/kG38b7CFzTY/800x533" alt="" className={"item"}/>*/}
          {/*<img src="https://source.unsplash.com/mCg0ZgD7BgU/800x533" alt="" className={"item"}/>*/}
          {/*<img src="https://source.unsplash.com/VkwRmha1_tI/800x533" alt="" className={"item"}/>*/}
          {/*<img src="https://source.unsplash.com/1FWICvPQdkY/800x533" alt="" className={"item"}/>*/}
          {/*<img src="https://source.unsplash.com/bjhrzvzZeq4/800x533" alt="" className={"item"}/>*/}
          {/*<img src="https://source.unsplash.com/7mUXaBBrhoA/800x533" alt="" className={"item"}/>*/}
          {/*<img src="https://source.unsplash.com/7mUXaBBrhoA/800x533" alt="" className={"item"}/>*/}
          {/*<img src="https://source.unsplash.com/7mUXaBBrhoA/800x533" alt="" className={"item"}/>*/}
          {/*</div>*/}
          {/*<nav>*/}
          {/*<button className="nav prev">Prev</button>*/}
          {/*<button className="nav next">Next</button>*/}
          {/*</nav>*/}
          {/*</div>*/}


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
            <nav>
              <button className="nav prev">Prev</button>
              <button className="nav next">Next</button>
            </nav>
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
            <nav>
              <button className="nav prev">Prev</button>
              <button className="nav next">Next</button>
            </nav>
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
            <nav>
              <button className="nav prev">Prev</button>
              <button className="nav next">Next</button>
            </nav>
          </div>

        </div>


      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    //playerStatus: state.mobile.users.find(user => user.id === state.mobile.userId).status,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    wsEmitFingerprint: () => dispatch(wsEmitFingerprint()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeStep)