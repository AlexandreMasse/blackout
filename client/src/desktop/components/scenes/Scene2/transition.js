import {TweenMax, TimelineMax, Power2} from 'gsap'


export const onEnter = (instance) => (
  new Promise(resolve => {
    const timeline = new TimelineMax({
      onComplete: () => {
        console.log("onComplete : scene2 enter");
        resolve();
      }
    })
    timeline.fromTo(instance.sprite, 3, {
      alpha: 0,
    },{
      delay: 1,
      alpha: 1,
      ease: Power2.easeInOut
    })
  })
)

export const onExit = (instance) => (
  new Promise(resolve => {
    const timeline = new TimelineMax({
      onComplete: () => {
        console.log("onComplete");
        resolve();
      }
    })

    timeline.to(instance.sprite, 1, {
      alpha: 0,
    })
  })
)
