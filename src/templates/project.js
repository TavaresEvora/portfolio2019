import React from 'react'
import { graphql } from 'gatsby';

const Template = ({data}) => {
  const { markdownRemark: project } = data
  const { title } = project.frontmatter
  const { html } = project
  console.log(data)
  return (
    <div>
        <h1>{ title }</h1>
        <div dangerouslySetInnerHTML={{__html: html}} />
    </div>
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
