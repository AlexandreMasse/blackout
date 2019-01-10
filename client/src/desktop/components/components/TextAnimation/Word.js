import Letter from './Letter'

export default class Word {
    constructor() {
        this.lettersDOM = null;
        this.active = null;
        this.letters = [];
        this.alphabet = ["a", "b", "c", "d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","i","u","v","w","x","y","z","~","&","|","^","ç","@","]","[","{","}","ù","*","µ","¤","$","£","€","°",")","(","+","-","/","<",">","²","`","é","è","1","2","3","4","5","6","7","8","9","0"
        ];
    }

    init(word) {
        this.lettersDOM = document.querySelectorAll('.letter');
        this.active = true;
        var i;
        var nextChar;
        var lettersMax = this.lettersDOM.length;

        for ( i = 0; i < this.lettersDOM.length; i++ ) {
          
          if ( word.charAt( i ) != "" )
            nextChar = word.charAt( i );
          else 
            nextChar = false;
          
          this.letters.push( new Letter( this.lettersDOM[ i ],  nextChar ) );
          
        }
    }

    animate() {
        var i;
        var random;
        var char;
        
        if ( this.active ) {
       
          window.requestAnimationFrame( this.animate.bind(this) );
          
          var indexes = [];
      
          for ( i = 0; i < this.letters.length; i++ ) {
          
            var current = this.letters[ i ];  
            
            if ( !current.isDead ) {     
              random = Math.floor(Math.random() * (this.alphabet.length - 0));
              char = this.alphabet[ random ]; 
              current.render( char );
            } else {
              indexes.push( i );
            }
          } 
          
          for ( i = 0; i < indexes.length; i++ ) {
            this.letters.splice( indexes[ i ], 1 );
          }
          
          if ( this.letters.length == 0 ) {
            this.stop();
          }
        }
    }

    start(word) {
        this.init(word)
    }

    stop() {
        this.active = false
    }


}
  
var letters = new Word()
letters.start('BLACK OUT')
  