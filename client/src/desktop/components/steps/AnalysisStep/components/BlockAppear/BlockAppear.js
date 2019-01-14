import './BlockAppear.scss'

export default class BlockAppear {

    constructor() {

    }

    init = (blockIndex) => {
        this.blockParent = document.querySelectorAll('.block-appear')
        let sentences = this.blockParent[blockIndex].querySelectorAll('.block-appear__item')
        this.blockParent[blockIndex].classList.add('active')
        sentences.forEach((sentence) => {
            const sentenceText = sentence.textContent
            sentence.innerHTML = ''
            const letterNb = sentenceText.length
            let spanArr = []
            for (let i = 0; i < letterNb; i++) {
                var span = document.createElement("span")
                span.classList.add('hide')
                span.innerText = sentenceText[i]
                sentence.appendChild(span)
                spanArr.push(span)
            }

            let timer = setInterval(() => {
                if (spanArr.length > 0) {
                    var spanLength = spanArr.length
                    var h = Math.ceil(Math.random() * spanLength) - 1
                    spanArr[h].classList.remove('hide')
                    spanArr[h].classList.add('show')
                    spanArr.splice(h, 1)
                } else {
                    clearInterval(timer)
                }
            }, 14)
        })
    }

    start (blockIndex) {
        this.init(blockIndex)
    }

    removeblockActive() {
        this.blockParent.forEach((bloc) => {
            bloc.classList.remove('active')
        })
    }

    activeValue(blockIndex) {
        const values = this.blockParent[blockIndex].querySelectorAll('.block-appear__value')
        if (values) {
            values.forEach((value)=> {
                value.classList.add('active')
            })
        }
    }

}