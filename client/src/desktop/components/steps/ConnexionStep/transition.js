import {TweenMax} from 'gsap'

const onEnterDuration = 1
const onEnterDelay = 0
export const onEnterTimeout = onEnterDuration + onEnterDelay

export const onEnter = (html) => {

  TweenMax.fromTo(html, onEnterDuration, {
    opacity: 0,
  },{
    delay: onEnterDelay,
    opacity: 1
  })
}


const onExitDuration = 2
const onExitDelay = 2
export const onExitTimeout = onExitDuration + onExitDelay

export const onExit = (html) => {

  TweenMax.fromTo(html, onExitDuration, {
    opacity: 1,
  },{
    delay:onExitDelay,
    opacity: 0
  })

  TweenMax.fromTo(html.querySelector(".home-abstrait"), 2, {
    opacity: 1,
  },{
    delay:0,
    opacity: 0
  })
}