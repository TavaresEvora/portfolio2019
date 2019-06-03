import React, { Component } from 'react'
import styled from 'styled-components'

import SEO from '../components/seo'
import variables from '../components/elements/variables';

const StyledTitle = styled.h1`
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
  height: 100vh;
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
  margin-top: 100vh;
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
  render() {
    return (
      <StyledContent>
        <SEO title="A propos" />
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
      </StyledContent>
    )
  }
}

export default AboutPage
