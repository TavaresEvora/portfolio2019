import React, { Component } from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import SEO from '../components/seo'

import variables from '../components/elements/variables'

library.add(faArrowUp)
library.add(faArrowDown)

const StyledNav = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 25vh;
  bottom: 0;
  left: 0;
`

const StyledNavPrev = styled(Link)`
  position: relative;
  cursor: url(${(props) => props.url}), pointer;
  height: 100%;
  width: 50%;
`

const StyledNavNext = styled(Link)`
  position: relative;
  cursor: url(${(props) => props.url}), pointer;
  height: calc(100% - ${variables.navHeight});
  height: 100%;
  width: 50%;
`

class Template extends Component {

  render() {
    const { data, pageContext } = this.props
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
        {/* <div dangerouslySetInnerHTML={{__html: html}} /> */}
        <StyledNav>
        {prev &&
            <StyledNavPrev url={ prevIconPath } to={ prev.frontmatter.path } />
        }
        {next &&
            <StyledNavNext url={ nextIconPath } to={ next.frontmatter.path } />
        }
        </StyledNav>
        
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
