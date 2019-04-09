import React, { Component } from 'react'
import posed from 'react-pose'
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

const RevealAnimation = posed.div({
  visible: {
    x: '100%',
    transition: ({ index }) => ({
      type: 'keyframes',
      values: ['-100%', '0%', '0%', '100%'],
      times: [0, 0.3, 0.7, 1],
      duration: 2000,
      delay: index * 250
    })
  },
  hidden: {
    x: '-100%',
  },
  initialPose: 'hidden'
})

const appearAnimation = {
  visible: {
    opacity: 1,
    transition: ({ index }) => ({
      delay: (index * 250)
    })
  },
  hidden: { opacity: 0 },
}

const RevealContentAnimation = posed.p(appearAnimation)

const RevealTitleAnimation = posed.h1(appearAnimation)

const StyledContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 65px);
`

const StyledReveal = styled(RevealAnimation)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${variables.primary};
  z-index: 9999;
`

const StyledHello = styled(RevealContentAnimation)`
  color: #757575;
  margin-bottom: -15px;
`

const StyledName = styled(RevealTitleAnimation)`
  font-size: 5rem;
  font-weight: 600;
  color: #000;
  margin: 0;
`

const StyledDescription = styled(RevealContentAnimation)`
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
      .from('#social-content', 0.5, { x: -50, opacity: 0, clearProps: 'all' }, 2)
      .play()

    console.debug('Component did mounted INDEX')
  }

  onGoToProject(node, e) {
    
  }

  render() {
    const { isLoaded } = this.state

    return (
      <StyledContent>
        <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
        <StyledPresentation>
          <StyledHello>
            Bonjour, je m'appelle
          </StyledHello>
          <StyledRevealBlock>
            <StyledReveal />
            <StyledName>
              Tavares Evora
            </StyledName>
          </StyledRevealBlock>

          <StyledRevealBlock>
            <StyledReveal />
            <StyledDescription>
              Je suis developpeur <span className="function">fullstack</span> sur Paris,
              bienvenue sur mon portfolio !
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
                  voir les projets
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
