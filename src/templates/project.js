import React, { Component } from 'react'
import { graphql, Link, StaticQuery } from 'gatsby'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import SEO from '../components/seo'
import posed from 'react-pose'
import Image from '../components/image'
import Img from 'gatsby-image'

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
    color: ${ variables.black };
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
  transform: translate3d(-20%, 0, 0);
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

const StyledProjectImage = styled(Img)`
  width: 550px;
  height: 300px;
`

const StyledRevealBlock = styled.div`
  position: relative;
  overflow: hidden;
`

const StyledRevealBlockTitle = styled.div`
  position: absolute;
  overflow: hidden;
  z-index: 9;
  font-size: 2rem;
  left: 70%;
  top: 50%;
  transform: translate3d(0, -50%, 0);
  white-space: nowrap;
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
  margin: 0;
  color: #333;
`

const StyledViewProject = styled.span`
  display: block;
  text-align: right;
  color: #333;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    width: 150px;
    height: 2px;
    background: #333;
    right: 15%;
    top: 50%;
  }
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
    const { title, tags, excerpt, image } = project.frontmatter
    const { html } = project
    const { next, prev } = pageContext
    const prevIconPath = allFile.edges[0].node.publicURL
    const nextIconPath = allFile.edges[1].node.publicURL

    console.debug(image)
    
    return (
      <>
        <SEO
          title={title}
          keywords={tags}
          description={excerpt}
        />
        <StyledProject>
          <StyledRevealBlockTitle>
            <StyledReveal index={2} pose={ isLoaded ? 'visible' : 'hidden' } />
            <StyledTitle index={2} pose={ isLoaded ? 'visible' : 'hidden' }>{ title }</StyledTitle>
            <StyledViewProject>
              02
            </StyledViewProject>
          </StyledRevealBlockTitle>
          <StyledRevealBlock>
            <StyledReveal pose={ isLoaded ? 'visible' : 'hidden' } />
            {/* <Image src="iadfrance.png" /> */}
            {/* <StyledProjectImage pose={ isLoaded ? 'visible' : 'hidden' } src="https://via.placeholder.com/550x300" /> */}
            <StaticQuery
              query={graphql`
                query {
                  placeholderImage: file(relativePath: { eq: "iad.JPG" }) {
                    childImageSharp {
                      fluid(maxWidth: 2000) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
              `}
              render={data => <StyledProjectImage fluid={data.placeholderImage.childImageSharp.fluid} />}
            />
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
        image
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
