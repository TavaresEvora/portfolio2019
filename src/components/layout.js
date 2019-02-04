import React from 'react'
import PropTypes from 'prop-types'
import { Link, StaticQuery, graphql } from 'gatsby'
import styled, { createGlobalStyle } from 'styled-components'
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

const ProjectNavStyle = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 50%;
  right: 15px;

  .arrow {
    color: #333;
    height: 35px;
    margin-bottom: 30px;
    transform: translateY(calc(-35px / 2));
    transition: transform .3s;

    &-up:hover {
      transform: translateY(calc(-45px / 2))
    }
    &-down:hover {
      transform: translateY(calc(-25px / 2))
    }
  }
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
        <Preloader>
          <Header siteTitle={data.site.siteMetadata.title} />
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
        </Preloader>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
