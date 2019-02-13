export default class SentenceAppear {
    constructor() {

    }

    init(sentence, duration = 500) {
        const sentenceText = sentence.textContent
        sentence.innerHTML = ''
        sentence.classList.add('show')
        const words = sentenceText.split(" ")
        const wordNb = words.length
        let wordArr = []
        for (let i = 0; i < wordNb; i++) {
            var span = document.createElement("span")
            span.classList.add('hide')
            span.innerText = words[i]
            sentence.appendChild(span)
            wordArr.push(span)
        }

        let timer = setInterval(() => {
            if (wordArr.length > 0) {
                let i = 0 
                wordArr[i].classList.remove('hide')
                wordArr[i].classList.add('show')
                wordArr.splice(i, 1)
                i++
            } else {
                clearInterval(timer)
            }
        }, duration)
    }

    start(sentence, duration) {
        this.init(sentence, duration)
    }
}
