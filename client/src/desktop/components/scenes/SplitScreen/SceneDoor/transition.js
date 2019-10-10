import {TimelineMax} from 'gsap'


export const onEnter = (instance) => (
  new Promise(resolve => {
    const timeline = new TimelineMax({
      onComplete: () => {
        // console.log("onComplete : scene door enter");
        resolve();
      }
    })
    timeline.fromTo(instance.sprite, 1, {
      alpha: 0,
    },{
      alpha: 1,
    })
  })
)

export const onExit = (instance) => (
  new Promise(resolve => {
    const timeline = new TimelineMax({
      onComplete: () => {
        // console.log("onComplete exit door stairs");
        resolve();
      }
    })

    timeline.to(instance.sprite, 1, {
      alpha: 0,
    })
  })
)
