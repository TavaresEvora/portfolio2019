const path = require('path')

exports.createPages = (({ actions, graphql }) => {
    const { createPages } = actions

    return new Promise((resolve, reject) => {
        const projectTemplate = path.resolve('src/templates/project.js')

        resolve(
            graphql(
                `
                {
                    allMarkdownRemark {
                        edges {
                            node {
                                html
                                frontmatter {
                                    path
                                    title
                                }
                            }
                        }
                    }
                }
                `
            )
        ).then(response => {
            console.log(path)
            if (response.errors) {
                reject(response.errors)
            }

            response.data.allMarkdownRemark.edges.forEach(({node}) => {
                const { path } = node.frontmatter
                
                createPages({
                    path: node.frontmatter.path,
                    component: projectTemplate,
                    // context: {
                    //     pathSlug: path
                    // }
                })

                resolve()
            })

        })
    })
})
