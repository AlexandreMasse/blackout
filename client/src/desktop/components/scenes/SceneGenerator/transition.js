import {TweenMax, TimelineMax, Power2} from 'gsap'

// export const onEnterDelay = .5
// export const onEnterDuration = .3
export const onEnterTimeout = 2

export const onEnter = (instance) => (
  new Promise(resolve => {
    const bgSound = instance.generatorSound
    bgSound.play()
    bgSound.fade(0, .2, 4000)

    const sprite = instance.sprite
    sprite.alpha = 0
    
    const tl = new TimelineMax({
      onComplete: () => {
        console.log("onComplete : scene generator enter")
        resolve()
      }
    })
    tl.to(sprite, 0, {alpha:0}, "+=1.2")
    tl.to(sprite, 0, {alpha:1}, "+=0.2")
    tl.to(sprite, 0, {alpha:0}, "+=0.2")
    tl.to(sprite, 0, {alpha:1}, "+=0.2")
  })
)

export const onExit = (instance) => (
  new Promise(resolve => {
    // const bgSound = instance.generatorSound
    // bgSound.fade(.5, 0, 2000)
    // bgSound.once( 'fade', () => {bgSound.stop()})
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
