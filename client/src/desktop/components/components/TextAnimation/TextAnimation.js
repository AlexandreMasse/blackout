import React, { Component } from 'react'
import Word from './Word'

import './TextAnimation.scss'

  
export default class TextAnimation extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        // this.ini
        // this.initLetter('BLACK OUT')
        // this.initWord('BLACK OUT')
    }
    
    handleRef = (ref) => {
        this.initWord(ref)
    }

    initWord(ref) {
        this.word = new Word(ref)
        this.word.start('BLACKOUT')
        console.log("coucou")
    }

  
    
    renderText = (text) => {
        let i = 0
        return Array.from(text).map(char => {
            i++
            const tpl = <span key={i} data-char={char}>{char}</span>
            return tpl
        })
    }

    render() {
        return (
            <p className="textAnimation" ref={this.handleRef} />
        )
    }
}