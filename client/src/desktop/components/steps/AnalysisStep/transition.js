import {TweenMax} from 'gsap'

export const onEnter = (html) => {

  TweenMax.fromTo(html, 3, {
    opacity: 0,
  },{
    opacity: 1
  })
}

export const onExit = (html) => {

  TweenMax.fromTo(html, 2, {
    opacity: 1,
  },{
    opacity: 0
  })
}