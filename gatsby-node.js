const path = require(`path`)

exports.createPages = (({ graphql, actions }) => {
    const { createPage } = actions

    return new Promise((resolve, reject) => {
        const projectTemplate = path.resolve('src/templates/project.js')

        resolve(
            graphql(
                `
                {
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
            ).then(response => {
                if (response.errors) {
                    reject(response.errors)
                }

                response.data.allMarkdownRemark.edges.forEach(({node}) => {
                    const path = node.frontmatter.path

                    createPage({
                        path,
                        component: projectTemplate,
                        context: {
                            pathSlug: path
                        }
                    })

                    resolve()
                })

            })
        )
    })
})
