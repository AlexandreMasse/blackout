import {Power2, TimelineMax, TweenMax} from 'gsap'


export const onEnterDuration = 2
export const onEnterDelay = 1
export const onEnterTimeout = onEnterDuration + onEnterDelay

export const onEnter = (html) => {

  const tl = new TimelineMax({delay: onEnterDelay})

  tl.fromTo(html.querySelector(".lunch-step__substep1__text1"), 1.5, {
    opacity: 0
  }, {
    ease: Power2.easeInOut,
    opacity: 1
  }, "+=0")
  tl.fromTo(html.querySelector(".lunch-step__substep1__text2"), 1.5, {
    opacity: 0
  }, {
    ease: Power2.easeInOut,
    opacity: 1
  }, "-=1.25")
  tl.fromTo(html.querySelector(".lunch-step__substep1__button"), 1.5, {
    opacity: 0
  }, {
    ease: Power2.easeInOut,
    opacity: 1
  }, "-=1.25")

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
