import {Power2, TimelineMax, TweenMax} from 'gsap'

//enter

export const onEnterDuration = 2
export const onEnterDelay = 4
export const onEnterTimeout = onEnterDuration + onEnterDelay

export const onEnter = (html) => {

  const tl = new TimelineMax({delay: onEnterDelay})

  tl.fromTo(html, 1.5, {
    opacity: 0
  }, {
    ease: Power2.easeInOut,
    opacity: 1
  }, "+=0")
}


//exit

export const onExitDuration = 1
export const onExitDelay = 0.2
export const onExitTimeout = onExitDuration + onExitDelay

export const onExit = (html) => {

  TweenMax.fromTo(html, onExitDuration, {
    opacity: 1,
  }, {
    delay: onExitDelay,
    opacity: 0
  })
}