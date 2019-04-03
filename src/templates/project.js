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

const StyledNavPrev = styled(Link)`
  position: fixed;
  cursor: url(${(props) => props.url}), pointer;
  left: 0;
  bottom: 0;
  height: calc(100% - ${variables.navHeight});
  width: 10vw;
`

const StyledNavNext = styled(Link)`
  position: fixed;
  cursor: url(${(props) => props.url}), pointer;
  right: 0;
  bottom: 0;
  height: calc(100% - ${variables.navHeight});
  width: 10vw;
`

const StyledProject = styled.a`
  position: relative;
  display: flex;
  max-width: 80vw;
  text-decoration: none;
`

const StyledProjectImage = styled.img`
  /* width: 70%; */
  height: 300px;
`

const StyledContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 65px);
`

const StyledProjectTitle = styled.h1`
  color: ${variables.blackDark};
  font-size: 3em;
  white-space: nowrap;
  margin: 0;
  text-decoration: none;
`

const StyledProjectExcerpt = styled.p`
  max-width: 90%;
  color: ${variables.black};
  font-size: 0.9em;
  margin: 40px 0;
  text-decoration: none;
`

const StyledProjectInformations = styled.div`
  width: 40%;
  align-self: center;
  transform: translate(10%, 0);
  text-decoration: none;
`

const StyledProjectCategory = styled.span`
  display: block;
  color: ${variables.blackDark};
  text-align: right;
  font-size: 0.8em;
  text-decoration: none;
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
    const { title, tags, excerpt, image, category, path } = project.frontmatter
    const { html } = project
    const { next, prev } = pageContext
    const prevIconPath = allFile.edges[0].node.publicURL
    const nextIconPath = allFile.edges[1].node.publicURL

    return (
      <StyledContent>
        <SEO
          title={title}
          keywords={tags}
          description={excerpt}
        />
        <StyledProject as={Link} to={`${path}/detail`}>
          <StyledProjectInformations>
            <StyledProjectTitle>{ title }</StyledProjectTitle>
            <StyledProjectCategory>{ category }</StyledProjectCategory>
            <StyledProjectExcerpt>{ excerpt }</StyledProjectExcerpt>
          </StyledProjectInformations>
          <StyledProjectImage src="https://via.placeholder.com/550x300" />
        </StyledProject>
        {/* <div dangerouslySetInnerHTML={{__html: html}} /> */}
        {prev &&
          <StyledNavPrev url={ prevIconPath } to={ prev.frontmatter.path } />
        }
        {next &&
          <StyledNavNext url={ nextIconPath } to={ next.frontmatter.path } />
        }
      </StyledContent>
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
        excerpt
        category
        path
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
