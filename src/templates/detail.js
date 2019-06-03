import React, { Component } from 'react'
import { graphql } from 'gatsby'
import TransitionLink from 'gatsby-plugin-transition-link'
import styled from 'styled-components'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import SEO from '../components/seo'
import { TimelineLite, Power2 } from 'gsap'
import 'gsap/ScrollToPlugin'

import variables from '../components/elements/variables'
import Image from '../components/image';

library.add(faArrowUp)
library.add(faArrowDown)

const StyledNav = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 15vh;
  @media (min-width: 768px) {
    height: 200px;
  }
`

const StyledNavPrev = styled.a`
  /* position: relative; */
  cursor: url(${(props) => props.icon}), pointer;
  /* width: 100%; */
  background: #E0E0E0;
  /* flex: 1; */
  color: ${ variables.black };
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  bottom: 0;
  right: 50%;
  font-size: 0.75em;
  text-decoration: none;

  &:hover h3 {
    opacity: 1;
  }
`

const StyledNavNext = styled.a`
  /* position: relative; */
  cursor: url(${(props) => props.icon}), pointer;
  /* width: 100%; */
  background: #E0E0E0;
  /* flex: 1; */
  color: ${ variables.black };
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  bottom: 0;
  right: 0;
  font-size: 0.75em;
  text-decoration: none;

  &:hover h3 {
    opacity: 1;
  }
`

const StyledNavProject = styled.div`
  display: block;
  overflow: hidden;
`

const StyledNavTitle = styled.h3`
  display: block;
  color: ${ variables.primary };
  overflow: hidden;
  /* opacity: 0; */
  font-size: 1rem;
  margin: 5px;
  text-decoration: none;
  transition: all 0.5s;
  @media (min-width: 768px) {
    font-size: 2rem;
    margin: 0;
  }
`

// const StyledNavImage = styled.img`
//   display: block;
//   width: 100%;
//   height: 100%;
// `

const StyledHeader = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;

  .gatsby-image-wrapper{
    height: 100%;
  }
`

const StyledHeaderImage = styled(Image)`
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
  padding: 15px 0 0;
  width: 90%;
  justify-content: space-between;
  @media (min-width: 768px) {
    width: 60%;
    padding: 0;
  }
`

const StyledHeaderInformation = styled.li`
  list-style: none;
`

const StyledHeaderInformationTitle = styled.h4`
  display: block;
  overflow: hidden;
  margin: 0 0 5px;
  text-transform: uppercase;
  font-family: Roboto, sans-serif;
  font-weight: 600;
  font-size: 0.8rem;
  @media (min-width: 768px) {
    margin: 0 0 15px;
  }
`

const StyledHeaderInformationContent = styled.div`
  overflow: hidden;
  font-size: 0.8rem;
  font-weight: 300;
  color: ${variables.black};
  @media (min-width: 768px) {
    font-size: 1rem;
  }
`

const StyledHeaderDescription = styled.div`
  overflow: hidden;
  font-weight: 300;
  color: ${variables.black};
  width: 90%;
  margin: 30px 0;
  @media (min-width: 768px) {
    width: 60%;
  }

  & p {
    margin: 0;
  }
`

class Template extends Component {

  constructor(props) {
    super(props)
    this.tl = new TimelineLite({paused: true})
    this.onGoToNextProject = this.onGoToNextProject.bind(this)
  }

  componentDidMount() {
    this.setState({ isLoaded: true })
    this.tl
      .from('.informations', 0.3, { y: '100%' }, 0.8)
      .from('.reveal-title > div', 0.3, { y: '100%', opacity: 0 }, '-=0.2')
      .from('.reveal > div', 0.3, { y: '100%', opacity: 0 })
      .staggerFrom('.reveal-description > p', 0.3, { y: '100%', opacity: 0 }, '0.2')
      .play()
  }

  onGoToNextProject(node, e) {
    const next = e.target.closest('.nav-button')
    const rect = next.getBoundingClientRect()
    const titles = next.querySelectorAll('.projectNav > div')
    this.tl.to(window, 0.3, { scrollTo: document.body.scrollHeight, ease: Power2.easeOut })
      //TODO: Masquer les écritures vers le bas
      .to('.nav-button', 0, { position: 'absolute' })
      .staggerTo(titles, 0.3, { y: '100%' }, 0.1)
      .to(next, 0, { position: 'fixed', width: rect.width, height: rect.height })
      .to(next, 0.3, { bottom: '50%', right: '50%', x: '50%', y: '50%', zIndex: 999 })
      .to(next, 0.3, { width: '100vw', height: '100vh' })
      .play()
  }

  render() {
    const { data, pageContext } = this.props
    const { markdownRemark: project, prevIcon, nextIcon } = data
    const { title, tags, excerpt } = project.frontmatter
    const { html } = project
    const { next, prev } = pageContext

    return (
      <>
        <SEO
          title={title}
          keywords={tags}
          description={excerpt}
        />
        <StyledHeader>
            <StyledHeaderImage className="image" />
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
        <StyledNav className="nav-project">
          {prev &&
            <StyledNavPrev className="nav-button"
              url={ prevIcon.publicURL }
              alt={ prevIcon.name }
              to={ `/${ prev.frontmatter.path }/detail` }
              as={TransitionLink}
              exit={{
                trigger: ({ node, e }) => this.onGoToNextProject(node, e),
                length: 1.8,
                zIndex: 2
              }}
              entry={{
                delay: 1.8,
                zIndex: 0
              }}
            >
              {/* <StyledNavImage src={ prev.frontmatter.image } /> */}
              <StyledNavProject className="projectNav"><div>Projet précedent</div></StyledNavProject>
              <StyledNavTitle className="projectNav"><div>{ prev.frontmatter.title }</div></StyledNavTitle>
            </StyledNavPrev>
          }
          {next &&
            <StyledNavNext className="nav-button"
              url={ nextIcon.publicURL }
              alt={ nextIcon.name }
              to={ `/${ next.frontmatter.path }/detail` }
              as={TransitionLink}
              exit={{
                trigger: ({ node, e }) => this.onGoToNextProject(node, e),
                length: 1.8,
                zIndex: 2
              }}
              entry={{
                delay: 1.8,
                zIndex: 0
              }}
            >
              {/* <StyledNavImage src={ next.frontmatter.image } /> */}
              <StyledNavProject className="projectNav"><div>Projet suivant</div></StyledNavProject>
              <StyledNavTitle className="projectNav"><div>{ next.frontmatter.title }</div></StyledNavTitle>
            </StyledNavNext>
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
    prevIcon:file(name: { eq: "chevron-left" }) {
      publicURL
    	name
    },
    nextIcon:file(name: { eq: "chevron-right" }) {
      publicURL
    	name
    }
  }
`

export default Template
