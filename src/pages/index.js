import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/layout'
// import Image from '../components/image'
import SEO from '../components/seo'

const PresentationStyle = styled.div`
  padding: 25px;
`

const HelloStyle = styled.p`
  color: #757575;
  margin-bottom: -15px;
`

const NameStyle = styled.p`
  font-size: 5rem;
  font-weight: 600;
  color: #000;
  margin: 0;
`

const DescriptionStyle = styled.p`
  font-size: 1.2rem;
  margin-top: 15px;
  color: #000;
  margin: 0;
`

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
    <PresentationStyle>
      <HelloStyle>Bonjour, je m'appelle</HelloStyle>
      <NameStyle>Tavares Evora</NameStyle>
      <DescriptionStyle>Je suis developpeur <span className="function">fullstack</span> sur Paris,
        bienvenue sur mon portfolio !
        {/* https://greeeg.com/about */}
        {/* http://eric-huguenin.com/ */}
        {/* https://www.olivier-guilleux.com/ */}
      </DescriptionStyle>
    </PresentationStyle>
  </Layout>
)

export default IndexPage
