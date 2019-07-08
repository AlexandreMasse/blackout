import React, { Component } from 'react';
//redux
import { connect } from 'react-redux';
import { disableBodyScroll } from 'body-scroll-lock';

//lib
import { TweenMax, Power1, Power2, Back, TimelineMax } from 'gsap';
import CustomEase from '../../../../vendors/gsap/CustomEase';
import { injectIntl } from 'react-intl';

//css
import './ConclusionStep.scss';
// utils

class ConclusionStep extends Component {
  constructor(props) {
    super(props);

    this.currentCard = 0;
  }

  handleTouchStart = evt => {
    const firstTouch = evt.touches[0];
    this.xDown = firstTouch.clientX;
    this.yDown = firstTouch.clientY;
  };

  handleTouchMove = evt => {
    if (!this.xDown || !this.yDown) {
      return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = this.xDown - xUp;
    let yDiff = this.yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
      if (xDiff > 0) {
        /* left swipe */
      } else {
        /* right swipe */
      }
    } else {
      if (yDiff > 0) {
        /* up swipe */
        if (this.cards[this.currentCard + 1]) {
          //this.allowTransition = false
          this.currentCard = this.currentCard + 1;
          this.nextCard(this.currentCard);
        }
      } else {
        /* down swipe */
        if (this.cards[this.currentCard - 1]) {
          //this.allowTransition = false
          this.currentCard = this.currentCard - 1;
          this.prevCard(this.currentCard);
        }
      }
    }
    /* reset values */
    this.xDown = null;
    this.yDown = null;
  };

  nextCard = index => {
    const tl = new TimelineMax();

    tl.to(this.cards[index], 0.5, {
      y: 0,
      ease: Power1.easeIn,
      overwrite: 'all'
    });

    if (this.cards[index + 1]) {
      tl.to(this.cards[index + 1], 0.4, {
        y: '85vh',
        overwrite: 'none',
        ease: Back.easeOut
      });
    }
  };

  prevCard = index => {
    const tl = new TimelineMax();

    tl.set(this.cards[index], {
      y: 0
    }).to(this.cards[index + 1], 0.7, {
      y: `85vh`,
      ease: CustomEase.create('custom', 'M0,0 C0.344,0 0.327,1.031 0.702,1.032 0.796,1.032 0.882,1 1,1')
    });
    if (this.cards[index + 2]) {
      tl.to(
        this.cards[index + 2],
        0.7,
        {
          y: `${85 * 2}vh`,
          ease: CustomEase.create('custom', 'M0,0 C0.344,0 0.327,1.031 0.702,1.032 0.796,1.032 0.882,1 1,1')
        },
        '-=0.7'
      ).set(this.cards[index + 2], {
        y: '100vh'
      });
    }
  };

  componentDidMount() {
    this.ref.addEventListener('touchstart', this.handleTouchStart, false);
    this.ref.addEventListener('touchmove', this.handleTouchMove, false);

    this.xDown = null;
    this.yDown = null;

    this.cardsContainer = this.ref.querySelectorAll('.conclusion-step__cards');

    disableBodyScroll(this.cardsContainer);

    this.cards = this.ref.querySelectorAll('.conclusion-step__cards__card');

    TweenMax.set(this.cards[this.currentCard], {
      y: 0
    });
    TweenMax.set(this.cards[this.currentCard + 1], {
      y: '85vh'
    });
  }

  componentWillUnmount() {
    this.ref.removeEventListener('touchstart', this.handleTouchStart, false);
    this.ref.removeEventListener('touchmove', this.handleTouchMove, false);
  }

  render() {
    const {
      intl: { formatMessage }
    } = this.props;

    return (
      <div className="conclusion-step" ref={ref => (this.ref = ref)}>
        <div className="conclusion-step__cards">
          <div className="conclusion-step__cards__card">
            <p>
              {formatMessage({
                id: 'app.conclusion.1',
                defaultMessage: 'Today in Europe, law forbids Internet Service Providers to block or filter content.'
              })}
            </p>
            <span className="conclusion-step__cards__number">1/15</span>
          </div>
          <div className="conclusion-step__cards__card">
            <p>
              {formatMessage({
                id: 'app.conclusion.2',
                defaultMessage: 'It guarantees everyone free, equal and non-discriminatory use of (digital) networks.'
              })}
            </p>
            <span className="conclusion-step__cards__number">2/15</span>
          </div>
          <div className="conclusion-step__cards__card">
            <p>
              {formatMessage({
                id: 'app.conclusion.3',
                defaultMessage:
                  'This principle, which is absent in China, is also under question in some Western countries.'
              })}
            </p>
            <span className="conclusion-step__cards__number">3/15</span>
          </div>
          <div className="conclusion-step__cards__card">
            <p>
              {formatMessage({
                id: 'app.conclusion.4',
                defaultMessage:
                  'It abolition would lead to a two-speed network where paying more would allow a better access.'
              })}
            </p>
            <span className="conclusion-step__cards__number">4/15</span>
          </div>
          <div className="conclusion-step__cards__card">
            <p>
              “
              {formatMessage({
                id: 'app.conclusion.5-1',
                defaultMessage:
                  'It would involve the establishment of an Internet for the rich and an Internet for the poor.'
              })}
              ”
            </p>
            <p className={'source'}>
              → Mounir Mahjoubi,
              <br />
              <span>
                {formatMessage({
                  id: 'app.conclusion.5-2',
                  defaultMessage: 'Secretary of State for Digital Technology,'
                })}
                <br />{' '}
                {formatMessage({
                  id: 'app.conclusion.5-3',
                  defaultMessage: '7 September 2018'
                })}
              </span>
            </p>
            <span className="conclusion-step__cards__number">5/15</span>
          </div>
          <div className="conclusion-step__cards__card">
            <p>
              {formatMessage({
                id: 'app.conclusion.6-1',
                defaultMessage:
                  'In the United States, net neutrality was abolished on June 11, 2018, against the opinion of 86% of Americans.'
              })}
            </p>
            <p className={'source'}>
              <span>
                www.aclu.org
                <br />
                {formatMessage({
                  id: 'app.conclusion.6-2',
                  defaultMessage: '6 juin 2018'
                })}
              </span>
            </p>
            <span className="conclusion-step__cards__number">6/15</span>
          </div>
          <div className="conclusion-step__cards__card">
            <p>
              {formatMessage({
                id: 'app.conclusion.7-1',
                defaultMessage:
                  'Since then, almost all operators have been restricting the speed of their users on Netflix and Youtube.'
              })}
            </p>
            <p className={'source'}>
              <span>
                https://dd.meddle.mobi/USStats.html,
                <br />
                {formatMessage({
                  id: 'app.conclusion.7-2',
                  defaultMessage: '11 November'
                })}
              </span>
            </p>
            <span className="conclusion-step__cards__number">7/15</span>
          </div>
          <div className="conclusion-step__cards__card">
            <p>
              {formatMessage({
                id: 'app.conclusion.8',
                defaultMessage:
                  'This trivial information on the surface, demonstrates the power to censor any content.                '
              })}
            </p>
            <span className="conclusion-step__cards__number">8/15</span>
          </div>
          <div className="conclusion-step__cards__card">
            <p>
              {formatMessage({
                id: 'app.conclusion.9',
                defaultMessage:
                  'This is a considerable risk because the Internet is a major contributor to social integration.'
              })}
            </p>
            <span className="conclusion-step__cards__number">9/15</span>
          </div>
          <div className="conclusion-step__cards__card">
            <p>
              {formatMessage({
                id: 'app.conclusion.10-1',
                defaultMessage: 'For example, in France 74% of job seekers use the Internet to find work.'
              })}
            </p>
            <p className={'source'}>
              <span>
                Baromètre CRÉDOC,
                <br />
                {formatMessage({
                  id: 'app.conclusion.10-2',
                  defaultMessage: 'june 2018'
                })}
              </span>
            </p>
            <span className="conclusion-step__cards__number">10/15</span>
          </div>
          <div className="conclusion-step__cards__card">
            <p>
              {formatMessage({
                id: 'app.conclusion.10-3',
                defaultMessage: 'It is also a necessary part of our daily lives:'
              })}
            </p>
            <span className="conclusion-step__cards__number">10/15</span>
          </div>
          <div className="conclusion-step__cards__card">
            <p>
              {formatMessage({
                id: 'app.conclusion.11',
                defaultMessage: 'One in two people use it to get information about their health'
              })}
            </p>
            <p className={'source'}>
              <span>
                Baromètre CRÉDOC,
                <br />
                {formatMessage({
                  id: 'app.conclusion.10-2',
                  defaultMessage: 'june 2018'
                })}
              </span>
            </p>
            <span className="conclusion-step__cards__number">11/15</span>
          </div>
          <div className="conclusion-step__cards__card">
            <p>
              {formatMessage({
                id: 'app.conclusion.12',
                defaultMessage: 'And two thirds of the French do their administrative procedures online.'
              })}
            </p>
            <p className={'source'}>
              <span>
                Baromètre CRÉDOC,
                <br />
                juin 2018
              </span>
            </p>
            <span className="conclusion-step__cards__number">12/15</span>
          </div>
          <div className="conclusion-step__cards__card">
            <p>
              {formatMessage({
                id: 'app.conclusion.13',
                defaultMessage: 'In a nutshell, the Internet is a (potential) tool to fight inequalities.'
              })}
            </p>
            <span className="conclusion-step__cards__number">13/15</span>
          </div>
          <div className="conclusion-step__cards__card">
            <p>
              {formatMessage({
                id: 'app.conclusion.14',
                defaultMessage: 'To guarantee this role, net neutrality is essential.'
              })}
            </p>
            <span className="conclusion-step__cards__number">14/15</span>
          </div>
          <div className="conclusion-step__cards__card">
            <div className="wrap">
              <p>
                {formatMessage({
                  id: 'app.conclusion.15-1',
                  defaultMessage: "Let's preserve it."
                })}
                <br />
                {formatMessage({
                  id: 'app.conclusion.15-2',
                  defaultMessage: 'Go to the Quadrature du Net.'
                })}
              </p>
              <a href="https://www.laquadrature.net" target="_blank">
                <p>www.laquadrature.net</p>
              </a>
            </div>
            <span className="conclusion-step__cards__number">15/15</span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(ConclusionStep));
