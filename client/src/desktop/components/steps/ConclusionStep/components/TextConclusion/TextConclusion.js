import React, { Component } from 'react'
// components
import {SentenceAppear} from '../index'

// styles

export default class TextConclusion extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.init()
    }

    init = () => {
        this.sentenceAppear = new SentenceAppear()
        if (this.props.handleSentenceAppear) {
            this.props.handleSentenceAppear(this.sentenceAppear)
        }
    }

    render() {
        return (
            <p className="block-appear__item ">get.phone.data.[] = new joueur ({this.props.userId}) </p>
        )
    }
}
