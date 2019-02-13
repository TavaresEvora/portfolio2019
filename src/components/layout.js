import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, StaticQuery, graphql } from 'gatsby'
import styled, { createGlobalStyle } from 'styled-components'
import posed from 'react-pose'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { TimelineLite } from 'gsap'

import 'normalize.css'

import Header from './header'
import Preloader from './preloader';

library.add(faArrowUp)
library.add(faArrowDown)

const GlobalStyle = createGlobalStyle`
  @font-face {
     font-family: 'Montserrat';
     src: url('https://fonts.googleapis.com/css?family=Montserrat:400,700');
  }

  body {
    font-family: 'Montserrat';
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
`

const ContentStyle = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 65px);
  width: 100vw;
`

const SocialContentStyle = styled.div`
  position: absolute;
  top: 50%;
  left: 25px;
  transform-origin: 0 0;
  transform: rotate(-90deg) translateX(-50%);

  a {
    display: inline-block;
    margin: 0 10px;
    letter-spacing: 0.1rem;
    color: #333;
    text-decoration: none;

    @media (max-width: 812px) {
      display: none;
    }
  }
`

const ProjectNavStyle = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 50%;
  right: 25px;
  transform: translateY(calc(-35px / 2));

  .arrow {
    color: #333;
    height: 35px;
    transition: transform .3s;

    &-up {
      margin-bottom: 30px;
      &:hover {
      transform: translateY(-5px);
      }
    }
    &-down:hover {
      transform: translateY(5px);
    }
  }
`

const InformationStyle = styled.div`
  position: absolute;
  color: #757575;
  font-size: 0.9rem;
  font-weight: 300;
  bottom: 25px;
  right: 25px;
`

const RevealAnimation = posed.div({
  loaded: {
    y: 0
  }
})

const RevealStyle = styled(RevealAnimation)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`

const TransitionAnimation = posed.div({
  loaded: {
    y: '100%',
    delay: 600,
    transition: {
      duration: 1600,
      ease: 'easeInOut'
    },
  },
  not: {
    y: '-100%',
  },
  initialPose: 'not'
})

const TransitionStyle = styled(TransitionAnimation)`
  position: fixed;
  top: 0;
  left: 0;
  height: 200%;
  width: 100%;
  background: #00f0b5;
  z-index: 9999;
`

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = { isLoaded: false }
    this.tl = new TimelineLite({paused: true})
  }

  componentDidMount = () => {
    this.setState({ isLoaded: true })
    this.tl
      .add('social', 2.6)
      .from('#social-content', 0.5, { x: -50, opacity: 0 }, 'social')
      .from('#navigation', 0.5, { x: 50, opacity: 0 }, 'social')
      .from('#last-update', 0.3, { y: 50, opacity: 0 }, 'social+=0.1')
    this.tl.play()
  }

  render() {
    const { isLoaded } = this.state
    const { children } = this.props
    return (
      <StaticQuery
        query={graphql`
          query {
            site {
              siteMetadata {
                title
                description
              }
            }
          }
        `}
        render={data => (
          <>
            <GlobalStyle />
            <Preloader isLoaded={ isLoaded } />
            <TransitionStyle pose={ isLoaded ? 'loaded' : 'not' } />
            <RevealStyle/>
            <Header delay={ 2.4 } siteTitle={data.site.siteMetadata.title} />
            <SocialContentStyle id="social-content">
              <Link to='/'>
                linkedin
              </Link>
              <Link to='/'>
                twitter
              </Link>
              <Link to='/'>
                instagram
              </Link>
            </SocialContentStyle>
            <ContentStyle>
              { children }
            </ContentStyle>
            <ProjectNavStyle id="navigation">
              <Link className="arrow arrow-up" to='/'>
                <FontAwesomeIcon icon="arrow-up" />
              </Link>
              <Link className="arrow arrow-down" to='/'>
                <FontAwesomeIcon icon="arrow-down" />
              </Link>
            </ProjectNavStyle>
            <InformationStyle id="last-update">
              Dernière mise jour: 06/02/2019
            </InformationStyle>
          </>
        )}
      />
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
