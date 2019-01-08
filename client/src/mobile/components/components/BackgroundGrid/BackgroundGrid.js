import React, {Component} from 'react';

//css
import './BackgroundGrid.scss'

export default class BackgroundGrid extends Component {
    
    constructor(props){
        super(props)
    }

    componentDidMount() {
        this.createSubElement()
    }

    createSubElement = () => {
        const grid = document.querySelector(".grid")
        // console.log(grid)
        for(var i=0; i < 60; i++) {
            grid.appendChild(document.createElement("div"))
        }
    }

    render() {
        return (
            <div className="grid"/>
        )
    }
}
