import React from 'react'
import posed from 'react-pose'
import { Link } from 'gatsby'
import styled, { keyframes } from 'styled-components'

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

const RevealAnimation = posed.div({
  isLoaded: {
    opactity: 1,
    delay: 1.5,
  },
  not: {
    opacity: 0,
  },
  initialPose: 'not'
})

const NameStyle = styled(RevealAnimation)`
position: relative;
  font-size: 5rem;
  font-weight: 600;
  color: #000;
  margin: 0;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #00f0b5
  }
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
      <HelloStyle><span>Bonjour, je m'appelle</span></HelloStyle>
      <NameStyle><span>Tavares Evora</span></NameStyle>
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
