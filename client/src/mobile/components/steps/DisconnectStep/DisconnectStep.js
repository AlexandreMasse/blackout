import React, {Component} from 'react'
//css
import './DisconnectStep.scss'

class DiconnectStep extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="disconnect-step">
        <p className="disconnect-step__text">Perte de connexion avec le server vous allez être redirigé vers la page d'accueil dans quelques secondes.</p>
      </div>
    );
  }
}

export default DiconnectStep
