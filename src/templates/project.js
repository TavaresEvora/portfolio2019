import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import SEO from '../components/seo'

library.add(faArrowUp)
library.add(faArrowDown)

const ProjectNavStyle = styled.div`
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

    &-up {
      margin-bottom: 30px;
      &:hover {
      transform: translateY(-5px);
      }
    }
    &-down:hover {
      transform: translateY(5px);
    }
  }
`

const Template = ({data, pageContext}) => {
  const { markdownRemark: project } = data
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
      <h1>{ title }</h1>
      <div dangerouslySetInnerHTML={{__html: html}} />

      <ProjectNavStyle id="navigation">
        {prev &&
          <Link to={ prev.frontmatter.path } className="arrow arrow-up">
            <FontAwesomeIcon icon="arrow-up" />
          </Link>
        }
        
        {next &&
          <Link to={ next.frontmatter.path } className="arrow arrow-down">
            <FontAwesomeIcon icon="arrow-down" />
          </Link>
        }
      </ProjectNavStyle>
    </>
  )
}

export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`

export default Template
