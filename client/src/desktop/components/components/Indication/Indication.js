import React from 'react'
import './Indication.scss'  

export const Indication = () => (
    <div className="indication">
        <span className="indication__title">Entrez le mot de passe</span>
        <p className="indication__description">Tournez les roues jusqu’à trouver la combinaison.</p>
        <span className="indication__iconContainer">
            <svg indication__iconContainer__icon viewBox="0 0 16 32">
                <use xlinkHref="#icon-mobile" />
            </svg>
        </span>
    </div>
)