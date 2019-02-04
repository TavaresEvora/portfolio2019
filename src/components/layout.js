import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import styled, { createGlobalStyle } from 'styled-components'
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
        </Preloader>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
