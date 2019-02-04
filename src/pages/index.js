import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
// import Image from '../components/image'
import SEO from '../components/seo'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
    <div className="presentation">
      <p>Je suis <span className="function">developpeur</span> basé à Paris</p>
    </div>
  </Layout>
)

export default IndexPage
