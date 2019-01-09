import {TweenMax} from 'gsap'

export const onEnter = (html) => {

  TweenMax.fromTo(html, 3, {
    opacity: 0,
  },{
    delay: 1,
    opacity: 1
  })
}

export const onExit = (html) => {

  TweenMax.fromTo(html, 3, {
    opacity: 1,
  },{
    opacity: 0
  })
}