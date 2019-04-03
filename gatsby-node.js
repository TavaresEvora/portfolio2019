const path = require(`path`)

exports.createPages = (({ graphql, actions }) => {
    const { createPage } = actions

    return new Promise((resolve, reject) => {
        const projectTemplate = path.resolve('src/templates/project.js')
        const projectDetailTemplate = path.resolve('src/templates/detail.js')

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
                    const { path } = node.frontmatter

                    createPage({
                        path,
                        component: projectTemplate,
                        context: {
                            pathSlug: path,
                            prev: index === 0 ? null : projects[index - 1].node,
                            next: index === (projects.length - 1) ? null : projects[index + 1].node
                        }
                    })

                    createPage({
                        path: `${path}/detail`,
                        component: projectDetailTemplate,
                        context: {
                            pathSlug: path,
                            prev: index === 0 ? projects[projects.length - 1].node : projects[index - 1].node,
                            next: index === (projects.length - 1) ? projects[0].node : projects[index + 1].node
                        }
                    })

                    resolve()
                })

            })
        )
    })
})
