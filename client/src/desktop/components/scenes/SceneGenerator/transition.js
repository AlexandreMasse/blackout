import {TweenMax, TimelineMax, Power2} from 'gsap'


export const onEnter = (instance) => (
  new Promise(resolve => {
    
    const generator = instance.generatorSprite
    generator.alpha = 0

    const tl = new TimelineMax({
      onComplete: () => {
        console.log("onComplete : scene generator enter")
        resolve()
      }
    })
    tl.fromTo(instance.sprite, 1, {
      alpha: 0,
    },{
      delay: 1,
      alpha: 1,
      ease: Power2.easeInOut
    })
    tl.to(generator, 0, {alpha:0}, "+=0.2")
    tl.to(generator, 0, {alpha:1}, "+=0.2")
    tl.to(generator, 0, {alpha:0}, "+=0.2")
    tl.to(generator, 0, {alpha:1}, "+=0.2")
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
