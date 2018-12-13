const path = require('path')

exports.createPages = (({ graphql, actions }) => {
    const { createPages } = actions

    return new Promise((resolve, reject) => {
        const projectTemplate = path.resolve('src/templates/project.js')

        resolve(
            graphql(
                `
                query {
                    allMarkdownRemark {
                        edges {
                            node {
                                frontmatter {
                                    path
                                }
                            }
                        }
                    }
                }
                `
            )
        ).then(response => {
            response.data.allMarkdownRemark.edges.forEach(({node}) => {
                const path = node.frontmatter.path

                createPages({
                    path,
                    component: projectTemplate,
                    context: {
                        pathSlug: path
                    }
                })

                resolve()
            })

        })
    })
})
