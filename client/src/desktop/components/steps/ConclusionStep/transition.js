import {Power2, TimelineMax, TweenMax} from 'gsap'

//enter

export const onEnterDuration = 0
export const onEnterDelay = 0
export const onEnterTimeout = onEnterDuration + onEnterDelay

export const onEnter = (html) => {

  const tl = new TimelineMax({delay: onEnterDelay})

  tl.fromTo(html, onEnterDuration, {
    opacity: 0
  }, {
    ease: Power2.easeInOut,
    opacity: 1
  }, "+=0")
}


//exit

export const onExitDuration = 3
export const onExitDelay = 0
export const onExitTimeout = onExitDuration + onExitDelay

export const onExit = (html) => {

  TweenMax.fromTo(html, onExitDuration, {
    opacity: 1,
  }, {
    delay: onExitDelay,
    opacity: 0
  })
}