import {TweenMax, TimelineMax, Power1} from 'gsap'
export const onEnterDuration = 1
export const onEnterDelay = 0
export const onEnterTimeout = onEnterDuration + onEnterDelay

export const onEnter = (html) => {
  TweenMax.fromTo(html, onEnterDuration, {
    opacity: 0,
  },{
    delay: onEnterDelay,
    opacity: 1
  })
}


export const onExitDuration = 3
export const onExitDelay = 0
export const onExitTimeout = onExitDuration + onExitDelay

export const onExit = (html) => {

  const tl = new TimelineMax({
    delay: onExitDelay
  })

  const opacity = 1

  //tl.to(html, 1.5, {opacity:opacity, ease: Power1.easeIn}, "+=0")
  tl.to(html, 0, {opacity:0}, "+=1.5")
  tl.to(html, 0, {opacity:opacity}, "+=0.2")
  tl.to(html, 0, {opacity:0}, "+=0.2")
  tl.to(html, 0, {opacity:opacity}, "+=0.2")
  tl.to(html, 0, {opacity:0}, "+=0.2")
  tl.to(html, 0, {opacity:opacity}, "+=0.1")
  tl.to(html, 0, {opacity:0}, "+=0.1")
  tl.to(html, 0, {opacity:opacity}, "+=0.05")
  tl.to(html, 0, {opacity:0}, "+=0.05")

  // TweenMax.fromTo(html, onExitDuration, {
  //   opacity: 1,
  // },{
  //   delay:onExitDelay,
  //   opacity: 0
  // })

  TweenMax.fromTo(html.querySelector(".home-abstrait"), 2, {
    opacity: 1,
  },{
    delay:0,
    opacity: 0
  })
}