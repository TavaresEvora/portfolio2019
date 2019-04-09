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

const StyledNavPrev = styled(TransitionLink)`
  position: fixed;
  cursor: url(${(props) => props.url}), pointer;
  left: 0;
  bottom: 0;
  height: calc(100% - ${variables.navHeight});
  width: 10vw;
`

const StyledNavNext = styled(TransitionLink)`
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
  top: 0;
  left: 0;
`

const StyledContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 65px);
`

const StyledProjectTitle = styled.h1`
  color: ${variables.blackDark};
  overflow: hidden;
  font-size: 3em;
  white-space: nowrap;
  margin: 0;
  text-decoration: none;
`

const StyledProjectExcerpt = styled.p`
  max-width: 90%;
  overflow: hidden;
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
  overflow: hidden;
  color: ${variables.blackDark};
  text-align: right;
  font-size: 0.8em;
  text-decoration: none;
`

class Template extends Component {
  constructor(props) {
    super(props)
    this.state = { isLoaded: false }
    this.onGoToDetail = this.onGoToDetail.bind(this)
    this.tl = new TimelineLite({paused: true})
    this.img = React.createRef()
    // this.transition = React.createRef()
  }

  componentDidMount() {
    this.setState({ isLoaded: true })
  }

  onGoToDetail(node, e) {
    const rect = this.img.current.getBoundingClientRect()
    this.tl
      .to('.txt div', 0.5, { y: '100%' })
      .to(this.img.current, 0, { position: 'fixed', x: `${rect.left}px`, y: `${rect.top}px` })
      .to(this.img.current, 0.5, { x: '0%', y: '0%', width: '100vw', height: '100vh' })
      // .from(this.transition.current, 0.5, { y: '-100%' })
      // .to(this.transition.current, 0.5, { y: '100%' }, '+=.5')
      .play()
  }

  render() {
    const { data, pageContext } = this.props
    const { isLoaded } = this.state
    const { markdownRemark: project, allFile } = data
    const { title, tags, excerpt, image, category, path } = project.frontmatter
    const { html } = project
    const { next, prev } = pageContext
    const prevIconPath = allFile.edges[1].node.publicURL
    const nextIconPath = allFile.edges[0].node.publicURL

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
            length: 1,
            zIndex: 2
          }}
          entry={{
            delay: 0.8,
            zIndex: 0
          }}
        >
          <StyledProjectInformations>
            <StyledProjectTitle className="txt"><div>{ title }</div></StyledProjectTitle>
            <StyledProjectCategory className="txt"><div>{ category }</div></StyledProjectCategory>
            <StyledProjectExcerpt className="txt"><div>{ excerpt }</div></StyledProjectExcerpt>
          </StyledProjectInformations>
          <StyledProjectImage ref={this.img} className="img" src="https://via.placeholder.com/550x300" />
        </StyledProject>
        {/* <div dangerouslySetInnerHTML={{__html: html}} /> */}
        {prev &&
          <StyledNavPrev url={ prevIconPath } to={ `/${prev.frontmatter.path}` } />
        }
        {next &&
          <StyledNavNext url={ nextIconPath } to={ `/${next.frontmatter.path}` } />
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
