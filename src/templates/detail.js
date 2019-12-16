import React, { Component } from 'react'
import { graphql } from 'gatsby'
import TransitionLink from 'gatsby-plugin-transition-link'
import styled from 'styled-components'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import SEO from '../components/seo'
import { TimelineLite, Power2 } from 'gsap'
import 'gsap/ScrollToPlugin'
import ScrollMagic from 'scrollmagic'
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap'
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators'

import variables from '../components/elements/variables'

library.add(faArrowUp)
library.add(faArrowDown)

const StyledNav = styled.div`
  position: relative;
  color: #FFF;
  display: flex;
  width: 100%;
  height: 15vh;
  @media (min-width: 768px) {
    height: 200px;
  }
`

const StyledNavPrev = styled.a`
  position: relative;
  cursor: url(${(props) => props.icon}), pointer;
  /* width: 100%; */
  background: url(${(props) => props.background}) no-repeat center center;
  /* flex: 1; */
  color: ${ variables.black };
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  bottom: 0;
  /* right: 50%; */
  font-size: 0.75em;
  text-decoration: none;

  &:hover .overlay {
    opacity: 0;
  }
`

const StyledNavNext = styled.a`
  position: relative;
  cursor: url(${(props) => props.icon}), pointer;
  /* width: 100%; */
  background: url(${(props) => props.background}) no-repeat center center;
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

  &:hover .overlay {
    opacity: 0;
  }
`

const StyledNavProject = styled.div`
  display: block;
  color: #FFF;
  overflow: hidden;
  z-index: 3;
`

const StyledNavTitle = styled.h3`
  display: block;
  color: #FFF;
  overflow: hidden;
  /* opacity: 0; */
  font-size: 1rem;
  margin: 5px;
  text-decoration: none;
  transition: all 0.5s;
  z-index: 3;
  @media (min-width: 768px) {
    font-size: 2rem;
    margin: 0;
  }
`

const StyledNavOverlay = styled.div`
  display: block;
  position: absolute;
  background: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all .3s;
  z-index: 0;
`

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

const StyledHeaderImage = styled.img`
  width: 100%;
  height: 100%;
`

const StyledContent = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 15px;
  .gatsby-resp-image-wrapper {
      margin: 120px;
      box-shadow: 0 12px 2vw 1vw rgba(0, 0, 0, .1);
      cursor: default;
      pointer-events: none;
  }
  @media (min-width: 768px) {
    width: 60%;
    padding: 0;
  }
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
    // this.controller = new ScrollMagic.Controller()
    this.tl = new TimelineLite({paused: true})
    this.onGoToNextProject = this.onGoToNextProject.bind(this)
  }

  componentDidMount() {
    const imageWrapper = document.querySelectorAll('.gatsby-resp-image-wrapper')
    this.setState({ isLoaded: true })
    this.tl
      .from('.informations', 0.3, { y: '100%' }, 0.8)
      .to('.image', 0.3, { y: '-100px' }, 0.8)
      .from('.reveal-title > div', 0.3, { y: '100%', opacity: 0 }, '-=0.2')
      .from('.reveal > div', 0.3, { y: '100%', opacity: 0 })
      .from('.reveal-description', 0.3, { y: '100%', opacity: 0 })
      .play()

    imageWrapper.forEach((el) => {
      const tlm = new TimelineLite()
      tlm.from(el, 0.7, { opacity: 0 })
      new ScrollMagic.Scene({
        triggerElement: el,
        triggerHook: 0.65,
        reverse: true
      })
        .setTween(tlm)
        .addTo(new ScrollMagic.Controller())
    })
  }

  onGoToNextProject(node, e) {
    const next = e.target.closest('.nav-button')
    const rect = next.getBoundingClientRect()
    const titles = next.querySelectorAll('.projectNav > div')
    const overlay = next.querySelectorAll('.projectNav > .overlay')
    this.tl.to(window, 0.3, { scrollTo: document.body.scrollHeight, ease: Power2.easeOut })
      //TODO: Masquer les écritures vers le bas
      .to('.nav-button', 0, { position: 'absolute' })
      .staggerTo(titles, 0.3, { y: '100%' }, 0.1)
      .to(overlay, 0.1, { opacity: 0 })
      .to(next, 0, { position: 'fixed', width: rect.width, height: rect.height })
      .to(next, 0.3, { bottom: '50%', right: '50%', x: '50%', y: '50%', zIndex: 999 })
      .to(next, 0.3, { width: '100vw', height: '100vh' })
      .play()
  }

  render() {
    const { data, pageContext } = this.props
    const { markdownRemark: project, prevIcon, nextIcon } = data
    const { title, tags, excerpt, image, client, role, date, intro, technologies } = project.frontmatter
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
            <StyledHeaderImage src={ image.publicURL } className="image" />
            <StyledHeaderInformationsContent className="informations">
              <StyledHeaderInformations>
                  <StyledHeaderInformation>
                      <StyledHeaderInformationTitle className="reveal-title">
                          <div>Client</div>
                      </StyledHeaderInformationTitle>
                      <StyledHeaderInformationContent className="reveal">
                        <div>{ client }</div>
                      </StyledHeaderInformationContent>
                  </StyledHeaderInformation>
                  <StyledHeaderInformation>
                      <StyledHeaderInformationTitle className="reveal-title">
                        <div>Role</div>
                      </StyledHeaderInformationTitle>
                      <StyledHeaderInformationContent className="reveal">
                        <div>{ role }</div>
                      </StyledHeaderInformationContent>
                  </StyledHeaderInformation>
                  <StyledHeaderInformation>
                      <StyledHeaderInformationTitle className="reveal-title">
                        <div>Technologies</div>
                      </StyledHeaderInformationTitle>
                      <StyledHeaderInformationContent className="reveal">
                        <div>{ technologies }</div>
                      </StyledHeaderInformationContent>
                  </StyledHeaderInformation>
                  <StyledHeaderInformation>
                      <StyledHeaderInformationTitle className="reveal-title">
                        <div>Année</div>
                      </StyledHeaderInformationTitle>
                      <StyledHeaderInformationContent className="reveal">
                        <div>{ date }</div>
                      </StyledHeaderInformationContent>
                  </StyledHeaderInformation>
              </StyledHeaderInformations>
              {/* <StyledSeeMore>
                <a href={ link } target="_blank" rel="noopener noreferrer">
                  <div className="txt">voir le projet</div>
                </a>
              </StyledSeeMore> */}
              <StyledHeaderDescription className="reveal-description">
                { intro }
              </StyledHeaderDescription>
            </StyledHeaderInformationsContent>
        </StyledHeader>
        <StyledContent dangerouslySetInnerHTML={{__html: html}} />
        <StyledNav className="nav-project">
          {prev &&
            <StyledNavPrev background={ prev.frontmatter.image.publicURL } className="nav-button"
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
              <StyledNavOverlay className="overlay" />
              <StyledNavProject className="projectNav"><div>Projet précedent</div></StyledNavProject>
              <StyledNavTitle className="projectNav"><div>{ prev.frontmatter.title }</div></StyledNavTitle>
            </StyledNavPrev>
          }
          {next &&
            <StyledNavNext background={ next.frontmatter.image.publicURL } className="nav-button"
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
              <StyledNavOverlay className="overlay" />
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
        excerpt
        category
        path
        client
        role
        date
        link
        technologies
        intro
        image {
          publicURL
        }
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
