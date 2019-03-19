import {TweenMax, TimelineMax, Power2} from 'gsap'

//enter

export const onEnterDuration = 2
export const onEnterDelay = 0.5
export const onEnterTimeout = onEnterDuration + onEnterDelay

export const onEnter = (html) => {

  const tl = new TimelineMax({delay: onEnterDelay})

  // tl.fromTo(html.querySelector("video"), 1.5, {
  //   opacity: 0
  // }, {
  //   ease: Power2.easeInOut,
  //   opacity: 1
  // }, "+=0")
  // tl.staggerFromTo(html.querySelectorAll(".intro-step__infos__paragraph"), 1.5, {
  //   opacity: 0
  // }, {
  //   ease: Power2.easeInOut,
  //   opacity: 1
  // }, 0.25, "-=1.25")

  // tl.fromTo(html.querySelector(".intro-step__infos__viewmore"), 1.5, {
  //   opacity: 0
  // }, {
  //   ease: Power2.easeInOut,
  //   opacity: 1
  // }, "-=1.25")

  TweenMax.fromTo(html, onEnterDuration, {
    opacity: 0,
  },{
    delay: onEnterDelay,
    opacity: 1
  })
}


//exit

export const onExitDuration = 1
export const onExitDelay = 0.2
export const onExitTimeout = onExitDuration + onExitDelay

export const onExit = (html) => {

  TweenMax.fromTo(html, onExitDuration, {
    opacity: 1,
  },{
    delay: onExitDelay,
    opacity: 0
  })
}