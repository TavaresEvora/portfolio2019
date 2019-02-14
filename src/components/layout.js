import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, StaticQuery, graphql } from 'gatsby'
import styled, { createGlobalStyle } from 'styled-components'
import posed, { PoseGroup } from 'react-pose'
import { TimelineLite } from 'gsap'

import 'normalize.css'

import Header from './header'
import Preloader from './preloader';

const GlobalStyle = createGlobalStyle`
  @font-face {
     font-family: 'Montserrat';
     src: url('https://fonts.googleapis.com/css?family=Montserrat:400,700');
  }

  body {
    font-family: 'Montserrat';
    min-height: 100vh;
    min-width: 100vw;
    overflow: hidden;
  }
`

const ContentStyle = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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

const InformationStyle = styled.div`
  position: absolute;
  color: #757575;
  font-size: 0.9rem;
  font-weight: 300;
  bottom: 25px;
  right: 25px;
`

const TransitionAnimation = posed.div({
  enter: {
    y: '-100%',
  },
  exit: {
    y: '100%',
    delay: 800,
    transition: {
      type: 'keyframes',
      values: ['-100%', '0%', '0%', '100%'],
      times: [0, 0.3, 0.7, 1],
      duration: 1200,
    }
  },
})

const TransitionStyle = styled(TransitionAnimation)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #00f0b5;
  z-index: 9999;
`

const PreloaderAnimation = posed.div({
  enter: {
    opacity: 1,
    transition: {
      y: { type: 'spring', stiffness: 1000, damping: 15 },
      default: { duration: 0 }
    }
  },
  exit: {
    opacity: 0,
    delay: 800,
    transition: { duration: 400 }
  }
})

class Layout extends Component {
  constructor(props) {
    super(props)
    setTimeout(() => {

    }, 800)
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
            <PoseGroup>
              {/* {!isLoaded && [
                // If animating more than one child, each needs a `key`
                <PreloaderAnimation key="preloader" >
                  <Preloader />
                </PreloaderAnimation>,
                <TransitionStyle key="transition" />
              ]} */}
            </PoseGroup>
            <Header delay={ 2.4 } siteTitle={data.site.siteMetadata.title} />
            <SocialContentStyle id="social-content">
              <Link to='/'>linkedin</Link>
              <Link to='/'>twitter</Link>
              <Link to='/'>github</Link>
            </SocialContentStyle>
            <ContentStyle isLoaded={ isLoaded }>
              { children }
            </ContentStyle>
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
