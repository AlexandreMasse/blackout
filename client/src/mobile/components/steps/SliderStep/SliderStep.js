import React, {Component} from 'react'
// assets
// import {AssetsManager} from "./../../../../managers"
// import {assetsToLoad} from "../../../assets/asset-list"
import {connect} from 'react-redux'
import {wsEmitSliderValue} from '../../../redux/actions/websockets/websocketsAction'
// lib 
import {TweenMax} from 'gsap'
// assets
import {AssetsManager} from "./../../../../managers"
import {assetsToLoad} from "../../../assets/asset-list"
import { Howl } from 'howler'
// utils
import {map, clamp} from '../../../../utils'
//css
import './SliderStep.scss'

class SliderStep extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: 0
          }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.value !== prevState.value) {
            this.props.wsEmitSliderValue(this.state.value)
        }
    }

    componentDidMount() {
      this.initSoundSliderEnd()
    }

    handleRef = (ref) => {
      if (ref) {
        this.initSlider(ref)
      }
    }

    initSoundSliderEnd = () => {
      const sliderEndAsset = AssetsManager.get('sliderEnd')
      this.sliderEnd = new Howl({
        src: sliderEndAsset.src,
        volume: 1,
        html5: true,
        preload: true,
        autoplay: false,
        loop: false,
        format: ['mp3']
      })
    }

    initSlider = (ref) => {
      let outer = ref
      let outerRect = outer.getBoundingClientRect()
      let lock = document.getElementById('lock')
      let isTouch = 'ontouchstart' in document.documentElement
      let lockRect = null
      let  dragProps = null
      let posBottom = null
      let mask = ref.querySelector('.mask')
      let raf = null
      let maxY = null
      let isDecrease = false 
      let self = this 

      function dragStart(e) {
        lockRect = lock.getBoundingClientRect()
        var y = getY(e)
        
        dragProps = {
          start: lockRect.bottom - outerRect.bottom,
          mouseStart: y,
          newX: 0
        }

        lock.classList.add('dragging')
        
        if (raf) {
          cancelAnimationFrame(raf)
        }
        
        document.addEventListener('mousemove', dragLock, false)
        document.addEventListener('touchmove', dragLock, false)
        document.addEventListener('mouseup', dragStop)
        document.addEventListener('touchend', dragStop)
      }

      function dragStop(reset) {
        lock.classList.remove('dragging')

        if (reset !== false) {
          
          posBottom = posBottom - 5

          if (posBottom <= 0) {
            posBottom = 0
            isDecrease = false
          } else {
            isDecrease = true
          }

          let newY = clamp(posBottom, 0, maxY)
          let value = map(newY, 0, maxY, 0, 100)
          let maskInsetValue = (100 - value)
          self.setState({value: value})
          TweenMax.to(mask, .1, {
            webkitClipPath: `inset(${maskInsetValue}% 0% 0% 0%)`,
            clipPath: `inset(${maskInsetValue}% 0% 0% 0%)`
          })

          lock.style.bottom = `${posBottom}px`
          // lock.style.webkitTransform=`translate3d(0 , ${maskInsetValue}%, 0)`
          // lock.style.transform=`translate3d(0 , ${maskInsetValue}%, 0)`

          if (isDecrease) {
            raf = requestAnimationFrame(dragStop)
          }
        }
        document.removeEventListener('mousemove', dragLock, false)
        document.removeEventListener('touchmove', dragLock, false)
        document.removeEventListener('mouseup', dragStop)
        document.removeEventListener('touchend', dragStop)
      }

      function unlock() {
        self.sliderEnd.play()
        outer.classList.add('unlocked')
        dragStop(false)
        lock.removeEventListener('mousedown', dragStart)
        lock.removeEventListener('touchstart', dragStart)
      }

      function dragLock(e) {
        if (raf) {
          cancelAnimationFrame(raf)
        }
        var posY = getY(e)
        var mouseDiff = dragProps.mouseStart - posY
        maxY = outerRect.height - lockRect.height
        posBottom = dragProps.start + mouseDiff
        var newY = clamp(posBottom, 0, maxY)
        let value = map(newY, 0, maxY, 0, 100)
        let maskInsetValue = (100 - value)
        self.setState({value: value})

        TweenMax.to(mask, .1, {
          webkitClipPath: `inset(${maskInsetValue}% 0% 0% 0%)`,
          clipPath: `inset(${maskInsetValue}% 0% 0% 0%)`
        })
        
        lock.style.bottom = newY + 'px';
        
        // lock.style.webkitTransform=`translate3d(0 , -${maskInsetValue}%, 0)`
        // lock.style.transform=`translate3d(0 , -${maskInsetValue}%, 0)`

        if (newY >= maxY) {
          unlock()
          if (raf) {
            cancelAnimationFrame(raf)
          }
        }
    }
        
    function getY(event) {
      if (isTouch === true) {
        return event.touches[0].pageY;
      } else {
        return event.clientY;
      }
    }
    
    lock.addEventListener('mousedown', dragStart);
    lock.addEventListener('touchstart', dragStart);
    }


    render() {
        return (
            <div className="slider-step">
                <div className="slider-step__wrapper">
                     <div className="slider-step__outer outer" id="outer" ref={this.handleRef}>
                        <div className="slider-step__lock lock" id="lock"></div>
                        <div className="slider-step__mask mask"   style={ { backgroundImage: `url(${ AssetsManager.get(assetsToLoad.trame.name).src})` } }  /> 
                    </div>
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
        wsEmitSliderValue: (sliderValue) => dispatch(wsEmitSliderValue({sliderValue}))
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(SliderStep)
