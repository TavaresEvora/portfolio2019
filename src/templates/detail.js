import React, { Component } from 'react'
import { graphql } from 'gatsby'
import TransitionLink from 'gatsby-plugin-transition-link'
import styled from 'styled-components'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import SEO from '../components/seo'
import { TimelineLite } from 'gsap'

import variables from '../components/elements/variables'

library.add(faArrowUp)
library.add(faArrowDown)

const StyledNav = styled.div`
  /* position: relative; */
  display: flex;
  width: 100%;
  height: 250px;
`

const StyledNavPrev = styled(TransitionLink)`
  /* position: relative; */
  cursor: url(${(props) => props.icon}), pointer;
`

const StyledNavNext = styled(TransitionLink)`
  /* position: relative; */
  cursor: url(${(props) => props.icon}), pointer;
`

const StyledHeader = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`

const StyledHeaderImage = styled.img`
  width: 100%;
  height: 100%;
`

const StyledHeaderInformationsContent = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  height: 250px;
  left: 0;
  bottom: 0;
  background: #FFF;
  margin: 0 auto;
  padding: 0;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const StyledHeaderInformations = styled.ul`
  display: flex;
  margin: 0 auto;
  padding: 0;
  justify-content: space-between;
  width: 60%;
`

const StyledHeaderInformation = styled.li`
  list-style: none;
`

const StyledHeaderInformationTitle = styled.h4`
  display: block;
  overflow: hidden;
  margin: 0 0 15px;
  text-transform: uppercase;
  font-family: Roboto, sans-serif;
  font-weight: 600;
  font-size: 0.8rem;
`

const StyledHeaderInformationContent = styled.p`
  overflow: hidden;
  font-weight: 300;
  color: ${variables.black};
`

const StyledHeaderDescription = styled.p`
  overflow: hidden;
  font-weight: 300;
  color: ${variables.black};
  width: 60%;

  & p {
    margin: 0;
  }
`

class Template extends Component {

  constructor(props) {
    super(props)
    this.tl = new TimelineLite({paused: true})
  }

  componentDidMount() {
    this.setState({ isLoaded: true })
    this.tl
      .from('.informations', 0.5, { y: '100%' }, 0.8)
      .from('.reveal-title > div', 0.3, { y: '100%', opacity: 0 }, '-=0.2')
      .from('.reveal > div', 0.3, { y: '100%', opacity: 0 })
      .staggerFrom('.reveal-description > p', 0.5, { y: '100%', opacity: 0 }, '0.2')
      .play()
  }

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
            <StyledHeaderImage className="image" src="https://via.placeholder.com/550x300" />
            <StyledHeaderInformationsContent className="informations">
              <StyledHeaderInformations>
                  <StyledHeaderInformation>
                      <StyledHeaderInformationTitle className="reveal-title">
                          <div>Client</div>
                      </StyledHeaderInformationTitle>
                      <StyledHeaderInformationContent className="reveal">
                        <div>Iad France.</div>
                      </StyledHeaderInformationContent>
                  </StyledHeaderInformation>
                  <StyledHeaderInformation>
                      <StyledHeaderInformationTitle className="reveal-title">
                        <div>Role</div>
                      </StyledHeaderInformationTitle>
                      <StyledHeaderInformationContent className="reveal">
                        <div>Développeur Fullstack</div>
                      </StyledHeaderInformationContent>
                  </StyledHeaderInformation>
                  <StyledHeaderInformation>
                      <StyledHeaderInformationTitle className="reveal-title">
                        <div>Année</div>
                      </StyledHeaderInformationTitle>
                      <StyledHeaderInformationContent className="reveal">
                        <div>2019</div>
                      </StyledHeaderInformationContent>
                  </StyledHeaderInformation>
              </StyledHeaderInformations>
              <StyledHeaderDescription className="reveal-description">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <p>Consequuntur nemo praesentium maxime velit. Ut modi cum a fugit, excepturi id quaerat,</p>
                <p>quia necessitatibus nam, odit adipisci laudantium consequuntur repellat quod.</p>
              </StyledHeaderDescription>
            </StyledHeaderInformationsContent>
        </StyledHeader>
        {/* <div dangerouslySetInnerHTML={{__html: html}} /> */}
        <StyledNav>
          {prev &&
            <StyledNavPrev icon={ prevIconPath } to={ prev.frontmatter.path }>

            </StyledNavPrev>
          }
          {next &&
            <StyledNavNext icon={ nextIconPath } to={ next.frontmatter.path } />
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
