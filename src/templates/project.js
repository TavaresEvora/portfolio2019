import React from 'react'
import { graphql } from 'gatsby'

export default function Template({data}) {
  return (
    <div>
        Project
        <div dangerouslySetInnerHTML={{__html: data.html}} />
    </div>
  )
}

export const projectQuery = graphql`
  query ProjectByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`
