import React, { Component } from 'react'
import Word from './Word'

import './TextAnimation.scss'

  
export default class TextAnimation extends Component {
    constructor(props) {
        super(props)
    }
    
    handleRef = (ref) => {
        this.initWord(ref)
    }

    initWord(ref) {
        this.word = new Word(ref)
        this.word.start('Entrez le mot de passe')
    }

    render() {
        return (
            <p className="textAnimation" ref={this.handleRef} />
        )
    }
}