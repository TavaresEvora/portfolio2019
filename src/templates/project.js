import React, { Component } from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import SEO from '../components/seo'
import posed from 'react-pose'

import variables from '../components/elements/variables'

library.add(faArrowUp)
library.add(faArrowDown)

const StyledProjectNav = styled.div`
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
    

    &.disabled {
      opacity: .5;
      pointer-events: none;
    }

    &-up {
      margin-bottom: 30px;
      &:not(.disabled):hover {
      transform: translateY(-5px);
      }
    }
    &-down:not(.disabled):hover {
      transform: translateY(5px);
    }
  }
`

const StyledNavPrev = styled(Link)`
  position: fixed;
  cursor: url(${(props) => props.url}), pointer;
  left: 0;
  bottom: 0;
  height: calc(100% - ${variables.navHeight});
  width: 20vw;
`

const StyledNavNext = styled(Link)`
  position: fixed;
  cursor: url(${(props) => props.url}), pointer;
  right: 0;
  bottom: 0;
  height: calc(100% - ${variables.navHeight});
  width: 20vw;
`

const StyledProject = styled.div`
  position: relative;
`

const RevealAnimation = posed.div({
  visible: {
    x: '100%',
    transition: ({ index = 1 }) => ({
      type: 'keyframes',
      values: ['-101%', '0%', '0%', '101%'],
      times: [0, 0.3, 0.7, 1],
      duration: 1600,
      delay: index * 250
    })
  },
  hidden: {
    x: '-101%',
  },
  initialPose: 'hidden'
})

const StyledReveal = styled(RevealAnimation)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${variables.primary};
  z-index: 9999;
`

const StyledRevealBlock = styled.div`
  position: relative;
  overflow: hidden;
`

const appearAnimation = {
  visible: {
    opacity: 1,
    transition: ({ index = 1 }) => ({
      delay: 800 + (index * 250)
    })
  },
  hidden: { opacity: 0 },
}

const RevealTitleAnimation = posed.h1(appearAnimation)

const StyledTitle = styled(RevealTitleAnimation)`
  display: inline-block;
`

class Template extends Component {
  constructor(props) {
    super(props)
    this.state = { isLoaded: false }
  }

  componentDidMount() {
    this.setState({ isLoaded: true })
  }

  render() {
    const { data, pageContext } = this.props
    const { isLoaded } = this.state
    const { markdownRemark: project, allFile } = data
    const { title, tags, excerpt } = project.frontmatter
    const { html } = project
    const { next, prev } = pageContext
    const prevIconPath = allFile.edges[0].node.publicURL
    const nextIconPath = allFile.edges[1].node.publicURL
    
    return (
      <>
        <SEO
          title={title}
          keywords={tags}
          description={excerpt}
        />
        <StyledProject>
          <StyledRevealBlock>
            <StyledReveal index={2} pose={ isLoaded ? 'visible' : 'hidden' } />
            <StyledTitle index={2} pose={ isLoaded ? 'visible' : 'hidden' }>{ title }</StyledTitle>
          </StyledRevealBlock>
          <StyledRevealBlock>
            <StyledReveal pose={ isLoaded ? 'visible' : 'hidden' } />
            <img src="https://via.placeholder.com/350x300" />
          </StyledRevealBlock>
        </StyledProject>
        {/* <div dangerouslySetInnerHTML={{__html: html}} /> */}
        {prev &&
          <StyledNavPrev url={ prevIconPath } to={ prev.frontmatter.path } />
        }
        {next &&
          <StyledNavNext url={ nextIconPath } to={ next.frontmatter.path } />
        }
  
        {/* <StyledProjectNav id="navigation"> */}
          {/* {prev &&
            <Link to={ prev.frontmatter.path } className="arrow arrow-up">
              <FontAwesomeIcon icon="arrow-up" />
            </Link>
          }
          {!prev &&
            <div disabled className="arrow arrow-up disabled">
              <FontAwesomeIcon icon="arrow-up" />
            </div>
          }
          
          {next &&
            <Link to={ next.frontmatter.path } className="arrow arrow-down">
              <FontAwesomeIcon icon="arrow-down" />
            </Link>
          }
          
          {!next &&
            <div className="arrow arrow-down disabled">
              <FontAwesomeIcon icon="arrow-down" />
            </div>
          } */}
        {/* </StyledProjectNav> */}
      </>
    )
  }
}

export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
      html
      frontmatter {
        title
      }
    },
    allFile(filter: { name: { in: ["chevron-left", "chevron-right"] } }) {
      edges {
        node {
          publicURL
          name
        }
      }
    }
  }
`

export default Template
