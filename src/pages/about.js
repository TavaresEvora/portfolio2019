import React, { Component } from 'react'
import styled from 'styled-components'
import ScrollMagic from 'scrollmagic'
import { TimelineLite } from 'gsap'

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
  @media (min-width: 768px) {
    width: 50%;
    margin: 0;
  }
`

const StyledSubTitle = styled.h3`
  font-size: 0.8em;
  font-weight: 500;
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
  justify-content: center;
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

const StyledDescription = styled.p`
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
    color: ${ variables.primary };
  }
`

class AboutPage extends Component {
  constructor(props) {
    super(props)
    this.tl = new TimelineLite({onUpdate: this.updatePercentage, paused: true})
    this.controller = new ScrollMagic.Controller()
    this.scene = new ScrollMagic.Scene()
  }

  componentDidMount() {
    // this.controller
    this.tl.from('.name', 1.5, { opacity: 0 })
      .play()

    this.scene({
      triggerElement: '.sections',
      triggerHook: 'onLeave',
      duration: '100%'
    })
      .setPin('.sections')
      .setTween(this.tl)
      .addTo(this.controller)
  }

  render() {
    return (
      <StyledContent>
        <SEO title="A propos" />
          <StyledName><h1 className="name">Tavares Evora</h1></StyledName>
          <div className="sections">
            <StyledFirstSection>
              <StyledTitle>A Propos de moi</StyledTitle>
              <StyledSectionContent>
                <StyledDescription>Je m'appelle Tavares Evora Valdimir. Je suis Web Développeur.
                Pendant mes formations j'ai appris le développement <span className="hl">back-end</span>,
                puis étant passionné par le développement plus largement j'ai appris le développement
                <span className="hl"> front-end </span> ainsi que l'intégration.
                </StyledDescription>
                <StyledDescription>
                Aujourd'hui je suis capable de m'occuper de la conception d'un site internet en passant par 
                l'integration responsive, le développement <span className="hl">back-end </span>
                et <span className="hl">front-end</span>.
                </StyledDescription>
                <StyledDescription>
                J'accorde beaucoup d'importance à la qualité et l'optimisation du code produit.
                </StyledDescription>
                <StyledDescription>
                A l'avenir, je souhaite en apprendre plus sur l'aspect DevOps
                </StyledDescription>
              </StyledSectionContent>
            </StyledFirstSection>

            <StyledSection>
              <StyledTitle>Mes compétences</StyledTitle>
              <StyledSectionContent>
                <StyledSectionSkill>
                  <StyledSubTitle>Templating</StyledSubTitle>
                  <StyledDescription>HTML / Twig / Blade</StyledDescription>
                </StyledSectionSkill>
                <StyledSectionSkill>
                  <StyledSubTitle>Javascript</StyledSubTitle>
                  <StyledDescription>Natif / ES6 / React / VueJs / JQuery / Gsap / NodeJs / Websocket</StyledDescription>
                </StyledSectionSkill>
                <StyledSectionSkill>
                  <StyledSubTitle>CSS</StyledSubTitle>
                  <StyledDescription>Sass / Responsive / Bootstrap / BEM</StyledDescription>
                </StyledSectionSkill>
                <StyledSectionSkill>
                  <StyledSubTitle>PHP</StyledSubTitle>
                  <StyledDescription>Natif / Laravel / Symfony / Wordpress</StyledDescription>
                </StyledSectionSkill>
                <StyledSectionSkill>
                  <StyledSubTitle>Environnement</StyledSubTitle>
                  <StyledDescription>Git / Npm / Yarn / Webpack / Visual Studio Code / PhpStorm</StyledDescription>
                </StyledSectionSkill>
              </StyledSectionContent>
            </StyledSection>
          </div>
          
      </StyledContent>
    )
  }
}

export default AboutPage
