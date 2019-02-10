import {TimelineMax} from 'gsap'


export const onEnter = (instance) => (
  new Promise(resolve => {
    const timeline = new TimelineMax({
      onComplete: () => {
        console.log("onComplete : scene stairs enter");
        resolve();
      }
    })
    
    if (instance.player === "player1") {
      instance.sprite.alpha = 0
      
      const bgSound = instance.stairsSound
      bgSound.play()
      bgSound.fade(0, .5, 4000)
    } else {
      timeline.fromTo(instance.sprite, 2, {
        alpha: 0,
      },{
        alpha: 1,
      })
      
    }
  })
)

export const onExit = (instance) => (
  new Promise(resolve => {
    const timeline = new TimelineMax({
      onComplete: () => {
        console.log("onComplete exit scene stairs");
        resolve();
      }
    })

    timeline.to(instance.sprite, 1, {
      alpha: 0,
    })
  })
)
