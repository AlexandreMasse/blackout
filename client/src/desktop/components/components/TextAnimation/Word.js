import Letter from './Letter'

export default class Word {
  constructor(parent, word, letterDuration = 500, letterMinSpeed = 30, letterMaxSpeed = 500) {
    this.parent = parent
    this.lettersDOM = null
    this.active = null
    this.letters = []
    this.alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "i", "u", "v", "w", "x", "y", "z", "~", "&", "|", "^", "ç", "@", "]", "[", "{", "}", "ù", "*", "µ", "¤", "$", "£", "€", "°", ")", "(", "+", "-", "/", "<", ">", "²", "`", "é", "è", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"
    ]
    //this.numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    this.word = word
    this.letterDuration = letterDuration
    this.letterMinSpeed = letterMinSpeed
    this.letterMaxSpeed = letterMaxSpeed
  }


  init(word) {
    this.lettersDOM = document.querySelectorAll('.letter')
    this.wordArr = Array.from(word)
    this.active = true
    var i
    var nextChar
    var letterNb = this.wordArr.length

    for (i = 0; i < letterNb; i++) {

      if (word.charAt(i) != "") {
        nextChar = word.charAt(i)
      } else {
        nextChar = false
      }


      var span = document.createElement("span")
      if (nextChar == ' ') {
        span.classList.add('empty')
      }

      this.parent.appendChild(span)

      this.letters.push(new Letter(span, nextChar, this.letterDuration, this.letterMinSpeed, this.letterMaxSpeed))
    }

    this.animate()
  }

  animate() {
    var i
    var random
    var char

    if (this.active) {

      window.requestAnimationFrame(this.animate.bind(this))

      var indexes = []

      for (i = 0; i < this.letters.length; i++) {

        var current = this.letters[i]

        if (!current.isDead) {
          random = Math.floor(Math.random() * (this.alphabet.length - 0))
          char = this.alphabet[random]
          current.render(char)
        } else {
          indexes.push(i)
        }
      }

      for (i = 0; i < indexes.length; i++) {
        this.letters.splice(indexes[i], 1)
      }

      if (this.letters.length == 0) {
        this.stop()
      }
    }
  }

  start() {
    this.init(this.word)
  }

  stop() {
    this.active = false
  }
}
