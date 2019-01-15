import {TweenMax} from 'gsap'

export const onEnter = (html) => {

  TweenMax.fromTo(html, 2, {
    opacity: 0,
  },{
    opacity: 1
  })
}

export const onExit = (html) => {

  TweenMax.fromTo(html, 3, {
    opacity: 1,
  },{
    opacity: 0
  })

  TweenMax.to(html, 2, {
    backgroundColor: "black"
  })
}