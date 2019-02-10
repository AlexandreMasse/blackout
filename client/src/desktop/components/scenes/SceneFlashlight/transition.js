import {TweenMax, TimelineMax, Power2} from 'gsap'
// Howl
import { Howl } from 'howler'
import {AssetsManager} from "../../../../managers"

export const onEnterDelay = 1
export const onEnterDuration = .3
export const onEnterTimeout = onEnterDelay + onEnterDuration

// sound
let flashSound = null

export const onEnter = (instance) => (
  new Promise(resolve => {
    const timeline = new TimelineMax({
      onComplete: () => {
        console.log("onComplete");
        // const flashSoundAsset = AssetsManager.get('flashSound')
        // flashSound = new Howl({
        //   src: flashSoundAsset.src,
        //   volume: 0.5,
        //   html5: true,
        //   preload: true,
        //   autoplay: false,
        //   loop:true,
        //   format: ['mp3']
        // })

        // flashSound.play()
        // flashSound.fade(0, 1, 4000)
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
    const timeline = new TimelineMax({
      onComplete: () => {
        console.log("onComplete flash");
        console.log(flashSound)
        // fadeOut and pause flashSound
        // flashSound.fade(1, 0, 2000)
        // flashSound.once( 'fade', () => {flashSound.stop()})
        resolve('resolved');
      }
    })

    timeline.to(instance.sprite, 1, {
      alpha: 0,
    })
  })
)