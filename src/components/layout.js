import React from 'react'
import PropTypes from 'prop-types'
import { Link, StaticQuery, graphql } from 'gatsby'
import styled, { createGlobalStyle } from 'styled-components'
import posed from 'react-pose'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

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

const Layout = ({ children }) => (
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
        <Preloader/>
        <RevealStyle/>
        <Header siteTitle={data.site.siteMetadata.title} />
        <SocialContentStyle>
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
          {children}
        </ContentStyle>
        <ProjectNavStyle>
          <Link className="arrow arrow-up" to='/'>
            <FontAwesomeIcon icon="arrow-up" />
          </Link>
          <Link className="arrow arrow-down" to='/'>
            <FontAwesomeIcon icon="arrow-down" />
          </Link>
        </ProjectNavStyle>
        <InformationStyle>
          Dernière mise jour: 06/02/2019
        </InformationStyle>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
