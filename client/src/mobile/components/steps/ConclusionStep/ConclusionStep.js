import React, {Component} from 'react';
//redux
import {connect} from 'react-redux';

//lib
import {TweenMax, Power1, Power2, Back, TimelineMax} from 'gsap'
import CustomEase from '../../../../vendors/gsap/CustomEase'

//css
import './ConclusionStep.scss'
// utils

class ConclusionStep extends Component {

  constructor(props) {
    super(props)

    this.currentCard = 0
  }

  handleTouchStart = (evt) => {
    const firstTouch = evt.touches[0];
    this.xDown = firstTouch.clientX;
    this.yDown = firstTouch.clientY;
  };

  handleTouchMove = (evt) => {
    if (!this.xDown || !this.yDown) {
      return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = this.xDown - xUp;
    let yDiff = this.yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
      if (xDiff > 0) {
        /* left swipe */
      } else {
        /* right swipe */
      }
    } else {
      if (yDiff > 0) {
        /* up swipe */
        if(this.cards[this.currentCard + 1]) {
          //this.allowTransition = false
          this.currentCard = this.currentCard + 1
          this.nextCard(this.currentCard)
        }
      } else {
        /* down swipe */
        if(this.cards[this.currentCard - 1]) {
          //this.allowTransition = false
          this.currentCard = this.currentCard - 1
          this.prevCard(this.currentCard)
        }

      }
    }
    /* reset values */
    this.xDown = null;
    this.yDown = null;
  };

  nextCard = (index) => {
    const tl = new TimelineMax()

    tl.to(this.cards[index], 0.5, {
      y: 0,
      ease: Power1.easeIn,
      overwrite: "all",
    })

    if(this.cards[index + 1]) {
      tl.to(this.cards[index + 1], 0.4, {
        y: "85vh",
        overwrite: "none",
        ease: Back.easeOut
      })
    }

  }

  prevCard = (index) => {
    const tl = new TimelineMax()

    tl.set(this.cards[index],{
      y: 0,
    })
    .to(this.cards[index + 1], 0.7, {
      y: `85vh`,
      ease: CustomEase.create("custom", "M0,0 C0.344,0 0.327,1.031 0.702,1.032 0.796,1.032 0.882,1 1,1")
    })
      if(this.cards[index + 2]) {
      tl.
        to(this.cards[index + 2], 0.7, {
          y: `${85 * 2}vh`,
          ease: CustomEase.create("custom", "M0,0 C0.344,0 0.327,1.031 0.702,1.032 0.796,1.032 0.882,1 1,1")
        }, "-=0.7")
          .set(this.cards[index + 2], {
            y: "100vh",
          })
      }
  }


  componentDidMount() {
    this.ref.addEventListener('touchstart', this.handleTouchStart, false);
    this.ref.addEventListener('touchmove', this.handleTouchMove, false);

    this.xDown = null;
    this.yDown = null;

    this.cards = this.ref.querySelectorAll(".conclusion-step__cards__card")

    TweenMax.set(this.cards[this.currentCard], {
      y: 0,
    })
    TweenMax.set(this.cards[this.currentCard + 1], {
      y: "85vh",
    })
  }

  componentWillUnmount() {
    this.ref.removeEventListener('touchstart', this.handleTouchStart, false);
    this.ref.removeEventListener('touchmove', this.handleTouchMove, false);
  }

  render() {

    return (
      <div className="conclusion-step" ref={(ref) => this.ref = ref}>
        <div className="conclusion-step__cards">
          <div className="conclusion-step__cards__card">
            <p>Aujourd'hui en France, la loi empêche les opérateurs de bloquer l'accès à certains contenus sur internet. </p>
          </div>
          <div className="conclusion-step__cards__card">
            <p>Elle garantit à toute personne une utilisation des réseaux numériques libre, égale et sans discrimination.
            </p>
          </div>
          <div className="conclusion-step__cards__card">
            <p>Ce principe, inexistant en Chine, est aussi remis en question dans certains pays occidentaux.</p>
          </div>
          <div className="conclusion-step__cards__card">
            <p>Sa disparition entraînerait la mise en place d’un réseau à deux vitesse où payer plus permet un meilleur accès.</p>
          </div>
          <div className="conclusion-step__cards__card">
            <p>“Ce serait la création d’un internet pour les riches et un internet pour les pauvres.”</p>
            <p className={"source"}>→ Mounir Mahjoubi,<br/><span>Secrétaire d’état chargé du numérique,<br/> 7 septembre 2018</span></p>
          </div>
          <div className="conclusion-step__cards__card">
            <p>Aux États-Unis, la neutralité du net a été supprimée le 11 juin 2018, contre l’avis de 86% des américains.</p>
            <p className={"source"}><span>www.aclu.org<br/>6 juin 2018</span></p>
          </div>
          <div className="conclusion-step__cards__card">
            <p>Depuis, presque tous les opérateurs brident le débit de leurs utilisateurs sur Netflix et Youtube.</p>
            <p className={"source"}><span>https://dd.meddle.mobi/USStats.html,<br/>11 novembre 2018</span></p>
          </div>
          <div className="conclusion-step__cards__card">
            <p>Cette information à priori anodine démontre pourtant le pouvoir de censurer n'importe quel contenu.</p>
          </div>
          <div className="conclusion-step__cards__card">
            <p>C’est un risque considérable car aujourd’hui internet est un facteur majeur d’intégration sociale.</p>
          </div>
          <div className="conclusion-step__cards__card">
            <p>Par exemple, 74% des demandeurs d’emploi utilisent internet pour trouver du travail.</p>
            <p className={"source"}><span>Baromètre CRÉDOC,<br/>juin 2018</span></p>
          </div>
          <div className="conclusion-step__cards__card">
            <p>C’est aussi un bien nécessaire à la vie quotidienne :</p>
          </div>
          <div className="conclusion-step__cards__card">
            <p>Une personne sur deux y fait des recherches en rapport à sa santé</p>
            <p className={"source"}><span>Baromètre CRÉDOC,<br/>juin 2018</span></p>
          </div>
          <div className="conclusion-step__cards__card">
            <p>Et deux tiers des français font leurs démarches administratives en ligne.</p>
            <p className={"source"}><span>Baromètre CRÉDOC,<br/>juin 2018</span></p>
          </div>
          <div className="conclusion-step__cards__card">
            <p>En bref, Internet est un (potentiel) outil de lutte contre les inégalités.</p>
          </div>
          <div className="conclusion-step__cards__card">
            <p>Pour garantir ce rôle, la neutralité du net est indispensable.</p>
          </div>
          <div className="conclusion-step__cards__card">
            <div className="wrap">
              <p>Préservons-la.<br/>Rendez-vous sur la Quadrature du Net.</p>
                <a href="https://www.laquadrature.net" target="_blank">
                  <p>www.laquadrature.net</p>
                </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ConclusionStep);
