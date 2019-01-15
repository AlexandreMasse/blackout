import {TweenMax} from 'gsap'

export const onEnterDuration = 2
export const onEnterDelay = 4
export const onEnterTimeout = onEnterDuration + onEnterDelay

export const onEnter = (html) => {
  // step apparition
  TweenMax.fromTo(html, onEnterDuration, {
    opacity: 0,
  },{
    delay: onEnterDelay,
    opacity: 1
  })

  // video fade
  const video = html.querySelector('.analysis-step__video')
  TweenMax.to(video, .5, {opacity: 1, delay: onEnterDelay})
}


export const onExitDuration = 3
export const onExitDelay = 0
export const onExitTimeout = onExitDuration + onExitDelay

export const onExit = (html) => {

  TweenMax.fromTo(html, onExitDuration, {
    opacity: 1,
  },{
    delay: onExitDelay,
    opacity: 0
  })
}