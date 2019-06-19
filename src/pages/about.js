import React, { Component } from 'react'
import styled from 'styled-components'
import { TimelineMax } from 'gsap'
import ScrollMagic from 'scrollmagic'
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap'
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators'

import SEO from '../components/seo'
import variables from '../components/elements/variables';

const StyledName = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  white-space: nowrap;

  .name {
    position: absolute;
    font-size: 30em;
    margin: 0;
    padding: 0 25px;
    color: #f5f5f5;
    bottom: 0;
    left: 0;
  }
`

const StyledTitle = styled.h2`
  width: 100%;
  font-size: 1.1em;
  font-weight: 500;
  text-transform: uppercase;
  margin: 50px 0;
  overflow: hidden;
  @media (min-width: 768px) {
    width: 50%;
    margin: 0;
  }

  > span {
    display: block;
    margin: 0;
  }
`

const StyledSubTitle = styled.h3`
  font-size: 0.8em;
  font-weight: 500;
  overflow: hidden;
  text-transform: uppercase;
  color: ${ variables.primary };
  margin: 0;
`

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StyledSection = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: baseline;
  flex-wrap: wrap;
  max-width: 80%;
  width: 100%;
  padding: 0;
  @media (min-width: 768px) {
    padding: 70px 0;
  }
`

const StyledFirstSection = styled(StyledSection)`
  padding-top: 0;
  @media (min-width: 768px) {
    padding: 0;
  }
`

const StyledSectionContent = styled.div`
  width: 100%;
  @media (min-width: 768px) {
    width: 50%;
  }
  /* margin: 0 70px; */
`

const StyledSectionSkill = styled.div`
  margin: 30px 0;
  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
  @media (min-width: 768px) {
  }

  p {
    margin: 0;
  }
`

const StyledDescription = styled.div`
  overflow: hidden;
  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
    @media (min-width: 768px) {
      margin-bottom: 50px;
      width: 50%;
    }
  }
  line-height: 1.8;
  margin-bottom: 25px;
  .hl {
    color: ${ variables.divrimary };
  }

  > p {
    display: block;
    margin: 0;
  }
`

class AboutPage extends Component {
  constructor(props) {
    super(props)
    this.updatePercentage = this.updatePercentage.bind(this)
    this.tl = new TimelineMax({onUpdate: this.updatePercentage})
    this.controller = new ScrollMagic.Controller()
    this.scene = new ScrollMagic.Scene({
      triggerElement: '.sections',
      triggerHook: 'onLeave',
      duration: '100%'
    })
  }

  componentDidMount() {
    // this.controller
    this.tl
      .to('.name', 1.5, { x: '-100%' })

    this.scene
      .setPin('.sections')
      .setTween(this.tl)
      .addTo(this.controller)

    document.querySelectorAll('.section').forEach((el) => {
      const title = el.querySelector('.title span')
      const tlm = new TimelineMax()
      tlm.from(title, .5, { y: '100%' })
      new ScrollMagic.Scene({
        triggerElement: el,
        triggerHook: 0.8,
        reverse: false
      })
        .setTween(tlm)
        .addTo(this.controller)

      el.querySelectorAll('.text').forEach((text) => {
        const textT = text.querySelector('p')
        const tlmt = new TimelineMax()
        tlmt.from(textT, .5, { y: '100%' })
        new ScrollMagic.Scene({
          triggerElement: text,
          triggerHook: 0.9,
          reverse: false
        })
          .setTween(tlmt)
          .addTo(this.controller)
      })
    })
  }

  updatePercentage() {
    this.tl.progress()
    // this.tlT.progress()
  }

  render() {
    return (
      <StyledContent>
        <SEO title="A propos" />
          <StyledName className="sections"><h1 className="name">Tavares Evora</h1></StyledName>
          <div>
            <StyledFirstSection className="section">
              <StyledTitle className="title"><span>A Propos de moi</span></StyledTitle>
              <StyledSectionContent>
                <StyledDescription className="text">
                  <p>Je m'appelle Tavares Evora Valdimir. Je suis Web Développeur.
                Pendant mes formations j'ai appris le développement <span className="hl">back-end</span>,
                puis étant passionné par le développement plus largement j'ai appris le développement
                <span className="hl"> front-end </span> ainsi que l'intégration.</p>
                </StyledDescription>
                <StyledDescription className="text">
                  <p>
                    Aujourd'hui je suis capable de m'occuper de la conception d'un site internet en passant par 
                    l'integration responsive, le développement <span className="hl">back-end </span>
                    et <span className="hl">front-end</span>.
                  </p>
                </StyledDescription>
                <StyledDescription className="text">
                  <p>J'accorde beaucoup d'importance à la qualité et l'optimisation du code produit.</p>
                </StyledDescription>
                <StyledDescription className="text">
                  <p>A l'avenir, je souhaite en apprendre plus sur l'aspect DevOps</p>
                </StyledDescription>
              </StyledSectionContent>
            </StyledFirstSection>

            <StyledSection className="section">
              <StyledTitle className="title"><span>Mes compétences</span></StyledTitle>
              <StyledSectionContent>
                <StyledSectionSkill>
                  <StyledSubTitle className="text"><p>Templating</p></StyledSubTitle>
                  <StyledDescription className="text"><p>HTML / Twig / Blade</p></StyledDescription>
                </StyledSectionSkill>
                <StyledSectionSkill>
                  <StyledSubTitle className="text"><p>Javascript</p></StyledSubTitle>
                  <StyledDescription className="text"><p>Natif / ES6 / React / VueJs / JQuery / Gsap / NodeJs / Websocket</p></StyledDescription>
                </StyledSectionSkill>
                <StyledSectionSkill>
                  <StyledSubTitle className="text"><p>CSS</p></StyledSubTitle>
                  <StyledDescription className="text"><p>Sass / Responsive / Bootstrap / BEM</p></StyledDescription>
                </StyledSectionSkill>
                <StyledSectionSkill>
                  <StyledSubTitle className="text"><p>PHP</p></StyledSubTitle>
                  <StyledDescription className="text"><p>Natif / Laravel / Symfony / Wordpress</p></StyledDescription>
                </StyledSectionSkill>
                <StyledSectionSkill>
                  <StyledSubTitle className="text"><p>Environnement</p></StyledSubTitle>
                  <StyledDescription className="text"><p>Git / Npm / Yarn / Webpack / Visual Studio Code / PhpStorm</p></StyledDescription>
                </StyledSectionSkill>
              </StyledSectionContent>
            </StyledSection>
          </div>
          
      </StyledContent>
    )
  }
}

export default AboutPage
