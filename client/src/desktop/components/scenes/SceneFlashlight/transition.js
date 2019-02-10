import {TweenMax, TimelineMax, Power2} from 'gsap'

export const onEnterDelay = 1
export const onEnterDuration = .3
export const onEnterTimeout = onEnterDelay + onEnterDuration

export const onEnter = (instance) => (
  new Promise(resolve => {
    const bgSound = instance.flashSound
    bgSound.play()
    bgSound.fade(0, 1, 4000)

    const timeline = new TimelineMax({
      onComplete: () => {
        console.log("onComplete");
      
        resolve('resolved');
      }
    })

    timeline.fromTo(instance.sprite, onEnterDuration, {
      alpha: 0,
    }, {
      delay: onEnterDelay,
      alpha: 1,
      ease: Power2.easeInOut
    })
  })
  
)

export const onExit = (instance) => (
  new Promise(resolve => {
    const bgSound = instance.flashSound
    bgSound.fade(1, 0, 2000)
    bgSound.once( 'fade', () => {bgSound.stop()})
    const timeline = new TimelineMax({
      onComplete: () => {
        console.log("onComplete flash");
        resolve('resolved');
      }
    })

    timeline.to(instance.sprite, 1, {
      alpha: 0,
    })
  })
)