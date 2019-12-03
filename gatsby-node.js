const path = require(`path`)

exports.onCreateWebpackConfig = ({
    stage,
    rules,
    loaders,
    plugins,
    actions,
}) => {
    actions.setWebpackConfig({
        module: {
            rules: stage === 'build-html'
                ? [
                    {
                        test: /ScrollMagic/,
                        use: loaders.null(),
                    },
                    {
                        test: /ScrollMagic.Controller/,
                        use: loaders.null(),
                    },
                    {
                        test: /animation.gsap/,
                        use: loaders.null(),
                    },
                    {
                        test: /debug.addIndicators/,
                        use: loaders.null(),
                    }
                ]
                : []
        },
        resolve: {
            alias: {
                TweenLite: path.resolve(
                    'node_modules',
                    'gsap/src/uncompressed/TweenLite.js'
                ),
                TweenMax: path.resolve(
                    'node_modules',
                    'gsap/src/uncompressed/TweenMax.js'
                ),
                TimelineLite: path.resolve(
                    'node_modules',
                    'gsap/src/uncompressed/TimelineLite.js'
                ),
                TimelineMax: path.resolve(
                    'node_modules',
                    'gsap/src/uncompressed/TimelineMax.js'
                ),
                ScrollMagic: path.resolve(
                    'node_modules',
                    'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'
                ),
                'animation.gsap': path.resolve(
                    'node_modules',
                    'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'
                ),
                'debug.addIndicators': path.resolve(
                    'node_modules',
                    'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js'
                ),
            },
        },
    })
}

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
                                    title
                                    image {
                                        publicURL
                                    }
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

                projects.forEach(({ node }, index) => {
                    const { path } = node.frontmatter

                    createPage({
                        path,
                        component: projectTemplate,
                        context: {
                            pathSlug: path,
                            prev: index === 0 ? projects[projects.length - 1].node : projects[index - 1].node,
                            next: index === (projects.length - 1) ? projects[0].node : projects[index + 1].node
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
