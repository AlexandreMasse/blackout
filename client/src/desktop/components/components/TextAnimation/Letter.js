export default class Letter {
    constructor(DOMElement, nextChar, duration = 500, minSpeed = 30, maxSpeed = 500) {
        this.DOMEl = DOMElement
        this.char = DOMElement.innerHTML
        this.next = nextChar
        this.speed = Math.floor(Math.random() * (maxSpeed - minSpeed + 1) + minSpeed);
        this.total = 0
        this.duration = duration
        this.animating = true
        this.isDead = false

        this.timer = setInterval(() => {
            if ( this.animating === true ) {
              this.total += this.speed
            } 
            this.animating = !this.animating;
        }, this.speed)
        
        this.animate()
    }

    animate() {
        
        if ( !this.isDead ) {
          window.requestAnimationFrame( this.animate.bind(this) )
        }
        
        
        if ( this.total < this.duration ) {
          
          if ( this.animating ) {
            this.DOMEl.innerHTML = this.char;
          }
            
        } else {
          this.isDead = true;
          
          if ( !this.next ) {
            var parent = document.getElementById('word');
            parent.removeChild( this.DOMEl );
            return;
          }
          
          this.DOMEl.innerHTML = this.next;
        }
    }

    render(char) {
        if ( !this.animating ) {
            this.char = char;
        }  
    }
}