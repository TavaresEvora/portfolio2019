const path = require(`path`)

exports.createPages = (({ graphql, actions }) => {
    const { createPage } = actions

    return new Promise((resolve, reject) => {
        const projectTemplate = path.resolve('src/templates/project.js')

        resolve(
            graphql(
                `
                query {
                    allMarkdownRemark (
                        sort: { order: ASC, fields: [frontmatter___title]}
                    ) {
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

                const projects = response.data.allMarkdownRemark.edges

                projects.forEach(({node}, index) => {
                    const path = node.frontmatter.path

                    createPage({
                        path,
                        component: projectTemplate,
                        context: {
                            pathSlug: path,
                            prev: index === 0 ? null : projects[index - 1].node,
                            next: index === (projects.length - 1) ? null : projects[index + 1].node
                        }
                    })

                    resolve()
                })

            })
        )
    })
})
