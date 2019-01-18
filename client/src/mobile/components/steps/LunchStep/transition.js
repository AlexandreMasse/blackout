import {Power2, TimelineMax, TweenMax} from 'gsap'


export const onEnterDuration = 2
export const onEnterDelay = 1
export const onEnterTimeout = onEnterDuration + onEnterDelay

export const onEnter = (html) => {

  const tl = new TimelineMax({delay: onEnterDelay})

  tl.fromTo(html.querySelector(".lunch-step__text"), 1.5, {
    opacity: 0
  }, {
    ease: Power2.easeInOut,
    opacity: 1
  }, "+=0")
  tl.fromTo(html.querySelector(".lunch-step__box"), 1.5, {
    opacity: 0
  }, {
    ease: Power2.easeInOut,
    opacity: 1
  }, "-=1.25")

}


export const onExit = (html) => {

  TweenMax.fromTo(html, 3, {
    opacity: 1,
  },{
    opacity: 0
  })
}