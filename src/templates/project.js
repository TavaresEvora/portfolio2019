import React, { Component } from 'react'
import { graphql } from 'gatsby'
import TransitionLink from 'gatsby-plugin-transition-link'
import styled from 'styled-components'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import SEO from '../components/seo'
import { TimelineLite } from 'gsap'

import variables from '../components/elements/variables'
import Image from '../components/image';

library.add(faArrowUp)
library.add(faArrowDown)

const StyledNavPrev = styled(TransitionLink)`
  position: fixed;
  cursor: url(${(props) => props.url}), pointer;
  left: 0;
  bottom: 0;
  height: 30vw;
  width: 50%;
  @media (min-width: 768px) {
    height: calc(100% - ${variables.navHeight});
    width: 10vw;
  }
`

const StyledNavNext = styled(TransitionLink)`
  position: fixed;
  cursor: url(${(props) => props.url}), pointer;
  right: 0;
  bottom: 0;
  height: 30vw;
  width: 50%;
  @media (min-width: 768px) {
    height: calc(100% - ${variables.navHeight});
    width: 10vw;
  }
`

const StyledProject = styled.a`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 90vw;
  text-decoration: none;
  @media (min-width: 768px) {
    flex-direction: row;
    max-width: 80vw;
  }
`

const StyledRevealBlock = styled.div`
  position: relative;
  overflow: hidden;
  height: 250px;
  width: 100%;
  top: 0;
  left: 0;

  @media (min-width: 768px) {
    width: 445px;
  }

  .gatsby-image-wrapper {
    height: 100%;
  }
`

const StyledProjectImage = styled.img`
  /* width: 70%; */
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
`

const StyledReveal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${variables.primary};
  transform: translateX(-102%);
  z-index: 9999;
`

const StyledContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const StyledProjectTitle = styled.h1`
  color: ${variables.blackDark};
  overflow: hidden;
  font-size: 2.5em;
  white-space: nowrap;
  margin: 0;
  text-decoration: none;
  @media (min-width: 768px) {
    font-size: 3em;
  }
`

const StyledProjectExcerpt = styled.div`
  overflow: hidden;
  color: ${variables.black};
  font-size: 0.9em;
  margin: 40px 0;
  text-decoration: none;
`

const StyledProjectInformations = styled.div`
  width: 100%;
  text-align: right;
  align-self: center;
  text-decoration: none;
  z-index: 9;
  @media (min-width: 768px) {
    width: 40%;
    transform: translate(10%, 0);
  }
`

const StyledProjectCategory = styled.span`
  display: block;
  overflow: hidden;
  color: ${variables.blackDark};
  font-size: 0.8em;
  text-decoration: none;
  @media (min-width: 768px) {
    text-align: right;
  }
`

class Template extends Component {
  constructor(props) {
    super(props)
    this.onGoToDetail = this.onGoToDetail.bind(this)
    this.tl = new TimelineLite({paused: true})
    // this.img = React.createRef()
    this.imgBlock = React.createRef()
    // this.transition = React.createRef()
  }

  componentDidMount() {
    this.tl
      .to('.reveal', 0.3, { x: '0%' }, 1)
      .from('.img', 0.1, { opacity: 0 })
      .to('.reveal', 0.3, { x: '102%' }, 2)
      .staggerFrom('.txt > div', 0.3, { y: '100%' }, 0.2)
      .play()
  }

  onGoToNextProject() {
    this.tl
      .set('.reveal', { x: '-102%' })
      .staggerTo('.txt > div', 0.3, { y: '100%' })
      .to('.reveal', 0.3, { x: '0%' })
      .play()
  }

  onGoToDetail() {
    const rect = this.imgBlock.current.getBoundingClientRect()
    this.tl
      .staggerTo('.txt > div', 0.3, { y: '100%' }, 0.1)
      .to(this.imgBlock.current, 0, { position: 'fixed', x: `${rect.left}px`, y: `${rect.top}px` })
      .to(this.imgBlock.current, 0.3, { top: '50%', left: '50%', x: '-50%', y: '-50%'})
      .to(this.imgBlock.current, 0.3, { width: '100vw', height: '100vh' })
      .play()
  }

  render() {
    const { data, pageContext } = this.props
    const { markdownRemark: project, prevIcon, nextIcon } = data
    const { title, tags, excerpt, image, category, path } = project.frontmatter
    const { next, prev } = pageContext

    return (
      <StyledContent>
        <SEO
          title={title}
          keywords={tags}
          description={excerpt}
        />
        <StyledProject
          as={TransitionLink}
          to={`/${path}/detail`}
          exit={{
            trigger: ({ node, e }) => this.onGoToDetail(node, e),
            length: 2,
            zIndex: 2
          }}
          entry={{
            delay: 1.8,
            zIndex: 0
          }}
        >
          <StyledProjectInformations>
            <StyledProjectTitle className="txt"><div>{ title }</div></StyledProjectTitle>
            <StyledProjectCategory className="txt"><div>{ category }</div></StyledProjectCategory>
            <StyledProjectExcerpt className="txt"><div>{ excerpt }</div></StyledProjectExcerpt>
          </StyledProjectInformations>
          <StyledRevealBlock ref={this.imgBlock}>
            <StyledReveal className="reveal" />
            <StyledProjectImage src={ image.publicURL } className="img" />
          </StyledRevealBlock>
        </StyledProject>
        {/* <div dangerouslySetInnerHTML={{__html: html}} /> */}
        {prev &&
          <StyledNavPrev
            url={ prevIcon.publicURL }
            alt={ prevIcon.name }
            to={ `/${prev.frontmatter.path}` }
            exit={{
              trigger: () => this.onGoToNextProject(),
              length: 2,
              zIndex: 2
              }}
              entry={{
                delay: 0.7,
                zIndex: 0
              }}
          />
        }
        {next &&
          <StyledNavNext
           url={ nextIcon.publicURL }
           alt={ nextIcon.name }
           to={ `/${next.frontmatter.path}` }
           exit={{
            trigger: () => this.onGoToNextProject(),
            length: 2,
            zIndex: 2
            }}
            entry={{
              delay: 0.7,
              zIndex: 0
            }}
          />
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
        excerpt
        category
        path
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
