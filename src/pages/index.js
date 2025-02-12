import React, { Component } from 'react'
import TransitionLink from 'gatsby-plugin-transition-link'
import { TimelineLite } from 'gsap'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import SEO from '../components/seo'
import LinkStyle from '../components/elements/link'
import variables from '../components/elements/variables'

const StyledPresentation = styled.div`
  padding: 25px;
  @media (min-width: 768px) {
  }
`

const StyledRevealBlock = styled.div`
  position: relative;
  overflow: hidden;
`

const StyledContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const StyledReveal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${variables.primary};
  transform: translateX(-102%);
  z-index: 9999;
`

const StyledHello = styled.div`
  overflow: hidden;
  color: #757575;
  margin-bottom: -15px;

  & > * {
    display: block;
  }
`

const StyledName = styled.h1`
  overflow: hidden;
  font-size: 2.5rem;
  font-weight: 600;
  color: #000;
  margin: 15px 0;
  @media (min-width: 768px) {
    font-size: 5rem;
    margin: 0;
  }

  & > * {
    display: block;
  }
`

const StyledDescription = styled.div`
  overflow: hidden;
  font-size: 1.2rem;
  margin-top: 15px;
  color: #000;
  margin: 0;

  & > * {
    display: block;
  }
`

const StyledSocialContent = styled.div`
  position: absolute;
  top: 50%;
  left: 25px;
  transform-origin: 0 0;
  transform: rotate(-90deg) translateX(-50%);

  a {
    display: inline-block;
    margin: 0 10px;
    letter-spacing: 0.1rem;
    color: ${ variables.black };
    text-decoration: none;
    will-change: transform;
    transition: opacity .3s;

    &:hover {
      opacity: .8;
    }

    @media (max-width: 812px) {
      display: none;
    }
  }
`

const StyledInformation = styled.div`
  position: absolute;
  overflow: hidden;
  color: #757575;
  font-size: 0.6rem;
  font-weight: 300;
  bottom: 5px;
  right: 5px;

  @media (min-width: 768px) {
    bottom: 25px;
    right: 25px;
  }

  & > * {
    display: block;
  }
`

const StyledFunction = styled.div`
  overflow: hidden;
  display: inline-block;
  vertical-align: bottom;

  & > * {
    display: block;
  } 
`

const StyledAvaible = styled.small`
  display: block;
  margin-top: 5px;
  color: ${variables.primary};
`

const StyledSeeMore = styled.div`
  position: fixed;
  font-size: 1rem;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);

  @media (min-width: 768px) {
    /* bottom: 25px; */
  }
  
  & > * {
    display: block;
  }
`

class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.onGoToProject = this.onGoToProject.bind(this)
    this.tl = new TimelineLite({paused: true})
  }

  componentDidMount() {
    this.tl
      // .set('.reveal-text > div', { opacity: 0 })
      .staggerFrom('.txt', 0.5, { y: '100%' }, 0.15)
      .from('#social-content', 0.5, { x: -50, opacity: 0 }, '-=0.65')
      .play()
  }

  onGoToProject() {
    this.tl
      .staggerTo('.txt', 0.5, { y: '100%' }, 0.15)
      .to('#social-content', 0.5, { x: -50, opacity: 0 }, '-=0.65')
      .play()
  }

  render() {
    const { cv } = this.props.data
    console.log(cv, this.props.data)

    return (
      <StyledContent>
        <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
        <StyledPresentation>
          <StyledHello className="reveal-text">
            <span className="txt">Bonjour, je m'appelle</span>
          </StyledHello>
          <StyledRevealBlock>
            <StyledReveal className="reveal" />
            <StyledName className="reveal-text">
              <span className="txt">Tavares Evora</span>
            </StyledName>
          </StyledRevealBlock>

          <StyledRevealBlock>
            <StyledReveal className="reveal" />
            <StyledDescription className="reveal-text">
              <div className="txt">
                Je suis développeur <StyledFunction className="function"> <span> fullstack </span> </StyledFunction> sur Paris et bienvenue sur mon portfolio !
                <StyledAvaible>Disponible à partir du mois de <b>Mars</b></StyledAvaible>
                <StyledAvaible><LinkStyle target="__blank" href={ cv.publicURL }>Retrouver mon CV ici</LinkStyle></StyledAvaible>
              </div>
            <StyledSeeMore>
                <LinkStyle
                  as={TransitionLink}
                  to="/portfolio-2016"
                  exit={{
                    trigger: ({ node, e }) => this.onGoToProject(node, e),
                    length: 1.3,
                    zIndex: 2
                  }}
                  entry={{
                    delay: 1.25,
                    zIndex: 0
                  }}
                >
                  <div className="txt">voir les projets</div>
                </LinkStyle>
              </StyledSeeMore>
            </StyledDescription>
          </StyledRevealBlock>
          <StyledSocialContent id="social-content">
            <a href="https://www.linkedin.com/in/valdimir-tavares-evora-9550a4108/">linkedin</a>
            <a href="https://twitter.com/tavaresevora">twitter</a>
            <a href="https://github.com/TavaresEvora">github</a>
          </StyledSocialContent>
          <StyledInformation id="last-update">
            <span className="txt">Dernière mise jour: 03/12/2019</span>
          </StyledInformation>
        </StyledPresentation>
      </StyledContent>
    )
  }
}

export const query = graphql`
  query {
    cv:file(name: { eq: "Tavares_Evora_CV" }) {
      publicURL
    	name
    },
  }
`

export default IndexPage
