import React, { Component } from 'react'
import Link from 'gatsby-plugin-transition-link'
import { TimelineLite } from 'gsap'
import styled from 'styled-components'

import SEO from '../components/seo'
import LinkStyle from '../components/elements/link'
import variables from '../components/elements/variables'

const StyledPresentation = styled.div`
  padding: 25px;
`

const StyledRevealBlock = styled.div`
  position: relative;
  overflow: hidden;
`

const StyledContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 65px);
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

const StyledHello = styled.p`
  overflow: hidden;
  color: #757575;
  margin-bottom: -15px;
`

const StyledName = styled.h1`
  overflow: hidden;
  font-size: 5rem;
  font-weight: 600;
  color: #000;
  margin: 0;
`

const StyledDescription = styled.p`
  overflow: hidden;
  font-size: 1.2rem;
  margin-top: 15px;
  color: #000;
  margin: 0;
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
  color: #757575;
  font-size: 0.6rem;
  font-weight: 300;
  bottom: 25px;
  right: 25px;
`

const StyledSeeMore = styled.div`
  position: fixed;
  font-size: 1rem;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
`

class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.state = { isLoaded: false}
    this.onGoToProject = this.onGoToProject.bind(this)
    this.tl = new TimelineLite({paused: true})
  }

  componentDidMount() {
    this.setState({ isLoaded: true })
    this.tl
      .staggerTo('.reveal', 0.5, { x: '0%' }, 0.5, 0.2)
      .staggerFrom('.reveal-text > div', 0.2, { opacity: 0 }, 0.2)
      .staggerTo('.reveal', 0.5, { x: '102%' }, 0.2, 2)
      .from('#social-content', 0.5, { x: -50, opacity: 0 })
      .play()
  }

  onGoToProject(node, e) {
    
  }

  render() {
    const { isLoaded } = this.state

    return (
      <StyledContent>
        <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
        <StyledPresentation>
          <StyledHello className="reveal-text">
            <div>Bonjour, je m'appelle</div>
          </StyledHello>
          <StyledRevealBlock>
            <StyledReveal className="reveal" />
            <StyledName className="reveal-text">
              <div>Tavares Evora</div>
            </StyledName>
          </StyledRevealBlock>

          <StyledRevealBlock>
            <StyledReveal className="reveal" />
            <StyledDescription className="reveal-text">
              <div>Je suis developpeur <span className="function">fullstack</span> sur Paris,
              bienvenue sur mon portfolio !</div>
              {/* https://greeeg.com/about/ */}
              {/* http://eric-huguenin.com/ */}
              {/* https://www.olivier-guilleux.com/ */}
              {/* http://kolaps.com/en/about/ */}
              {/* http://www.lucavolino.com/about */}
              <StyledSeeMore>
                <LinkStyle
                  as={Link}
                  to="/iad"
                  exit={{
                    trigger: ({ node, e }) => this.onGoToProject(node, e),
                    length: 1,
                    zIndex: 2
                  }}
                  entry={{
                    delay: 0.8,
                    zIndex: 0
                  }}
                >
                  <div>voir les projets</div>
                </LinkStyle>
              </StyledSeeMore>
            </StyledDescription>
          </StyledRevealBlock>
          <StyledSocialContent id="social-content">
            <a href="linkedin">linkedin</a>
            <a href="linkedin">twitter</a>
            <a href="linkedin">github</a>
          </StyledSocialContent>
          <StyledInformation id="last-update">
            Dernière mise jour: 06/02/2019
          </StyledInformation>
        </StyledPresentation>
      </StyledContent>
    )
  }
}

export default IndexPage
