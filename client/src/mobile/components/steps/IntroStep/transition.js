import {TweenMax} from 'gsap'

//enter

export const onEnterDuration = 0.01
export const onEnterDelay = 0.5
export const onEnterTimeout = onEnterDuration + onEnterDelay

export const onEnter = (html) => {

  // TweenMax.fromTo(html, onEnterDuration, {
  //   opacity: 0,
  // },{
  //   delay: onEnterDelay,
  //   opacity: 1
  // })
}


//exit

export const onExitDuration = 3
export const onExitDelay = 3
export const onExitTimeout = onExitDuration + onExitDelay

export const onExit = (html) => {

  TweenMax.fromTo(html, onExitDuration, {
    opacity: 1,
  },{
    delay: onExitDelay,
    opacity: 0
  })
}