import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import styled, { createGlobalStyle } from 'styled-components'
import { TimelineLite } from 'gsap'
import 'normalize.css'

import Header from './header'
import Preloader from './preloader'
import variables from './elements/variables'

const GlobalStyle = createGlobalStyle`
  @font-face {
     font-family: 'Montserrat', sans-serif;
     src: url('https://fonts.googleapis.com/css?family=Montserrat:400,700');
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Montserrat', sans-serif;
    /* min-height: 100vh;
    min-width: 100vw; */
    /* overflow: hidden; */
    color: ${ variables.black };
  }
`

const StyledContent = styled.main`
  /* min-height: 100vh; */
  /* width: 100vw; */
  margin-top: -${variables.navHeight};
  /* overflow: hidden; */
`

const StyledTransition = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: ${variables.primary};
  z-index: 9999;
`

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = { isLoaded: false }
    this.tl = new TimelineLite({paused: true})
    this.preloader = React.createRef()
    this.transition = React.createRef()
  }

  componentDidMount = () => {
    this.tl
      .from(this.preloader.current, 0.5, { opacity: 1 }, 1)
      .from(this.transition.current, 0.5, { y: '-100%' })
      .to(this.transition.current, 0.5, { y: '100%' }, '+=.5')

    this.tl.play()
    this.tl.eventCallback("onComplete", () => {
      this.setState({ isLoaded: true })
    })
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
            allMarkdownRemark (
              sort: { order: ASC, fields: [frontmatter___title]}
            ) {
              edges {
                node {
                  frontmatter {
                    path
                    title
                  }
                }
              }
            }
          }
        `}
        render={data => (
          <>
            <GlobalStyle />
              {!isLoaded &&
                <>
                  <Preloader preloaderRef={this.preloader} />
                  <StyledTransition ref={this.transition} />
                </>
              }
            {isLoaded &&
              <>
                <Header
                  projects={data.allMarkdownRemark.edges}
                  siteTitle={data.site.siteMetadata.title}
                />
                <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700|Roboto&display=swap" rel="stylesheet"></link>
                <StyledContent projects={ data.allMarkdownRemark.edges }>
                { children }
                </StyledContent>
              </>
            }
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
