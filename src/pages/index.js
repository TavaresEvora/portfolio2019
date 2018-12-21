import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
<<<<<<< HEAD
    <div className="presentation">
      <p>Je suis <span className="function">developpeur</span> basé à Paris</p>
=======
    <h1>Hi people!</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: '300px', marginBottom: '1.45rem' }}>
      <Image />
>>>>>>> 59d79ffb6cec2a1f9fc5ecbf765fdeddd8a6ece1
    </div>
  </Layout>
)

export default IndexPage
