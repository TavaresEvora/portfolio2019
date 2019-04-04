import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Link from 'gatsby-plugin-transition-link'
import styled from 'styled-components'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import SEO from '../components/seo'

import variables from '../components/elements/variables'

library.add(faArrowUp)
library.add(faArrowDown)

const StyledNav = styled.div`
  /* position: relative; */
  display: flex;
  width: 100%;
  height: 250px;
`

const StyledNavPrev = styled(Link)`
  position: relative;
  cursor: url(${(props) => props.url}), pointer;
`

const StyledNavNext = styled(Link)`
  position: relative;
  cursor: url(${(props) => props.url}), pointer;
`

const StyledHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: calc(100vh - 65px);
`

const StyledHeaderImage = styled.img`
  width: 100%;
  height: 80vh;
`

const StyledHeaderInformations = styled.ul`
  display: flex;
  margin: 0 auto;
  padding: 0;
  justify-content: space-between;
  width: 100%;
  max-width: 1080px;
`

const StyledHeaderInformation = styled.li`
  list-style: none;
`

const StyledHeaderInformationTitle = styled.h4`
  display: block;
  text-transform: uppercase;
`

const StyledHeaderInformationContent = styled.p`
  font-weight: 500;
  color: ${variables.blackDark};
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
        <StyledHeader>
            <StyledHeaderImage src="https://via.placeholder.com/550x300" />
            <StyledHeaderInformations>
                <StyledHeaderInformation>
                    <StyledHeaderInformationTitle>
                        Date
                    </StyledHeaderInformationTitle>
                    <StyledHeaderInformationContent>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos, repellendus?
                    </StyledHeaderInformationContent>
                </StyledHeaderInformation>
                <StyledHeaderInformation>
                    <StyledHeaderInformationTitle>
                        Date
                    </StyledHeaderInformationTitle>
                    <StyledHeaderInformationContent>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos, repellendus?
                    </StyledHeaderInformationContent>
                </StyledHeaderInformation>
                <StyledHeaderInformation>
                    <StyledHeaderInformationTitle>
                        Date
                    </StyledHeaderInformationTitle>
                    <StyledHeaderInformationContent>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos, repellendus?
                    </StyledHeaderInformationContent>
                </StyledHeaderInformation>
            </StyledHeaderInformations>
        </StyledHeader>
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
