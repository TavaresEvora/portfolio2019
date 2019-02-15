import React, { Component } from 'react'
import posed from 'react-pose'
import { Link } from 'gatsby'
import styled from 'styled-components'
import SEO from '../components/seo'

const PresentationStyle = styled.div`
  padding: 25px;
`

const RevealBlockStyle = styled.div`
  position: relative;
  overflow: hidden;
`

const RevealAnimation = posed.div({
  visible: {
    x: '100%',
    transition: ({ index }) => ({
      type: 'keyframes',
      values: ['-100%', '0%', '0%', '100%'],
      times: [0, 0.3, 0.7, 1],
      duration: 1600,
      delay: index * 150
    })
  },
  hidden: {
    x: '-100%',
  },
  initialPose: 'hidden'
})

const appearAnimation = {
  visible: {
    opacity: 1,
    transition: ({ index }) => ({
      delay: 800 + (index * 150)
    })
  },
  hidden: { opacity: 0 },
}

const RevealContentAnimation = posed.p(appearAnimation)

const RevealTitleAnimation = posed.h1(appearAnimation)

const RevealStyle = styled(RevealAnimation)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #00f0b5;
  z-index: 9999
`

const HelloStyle = styled(RevealContentAnimation)`
  color: #757575;
  margin-bottom: -15px;
`

const NameStyle = styled(RevealTitleAnimation)`
  font-size: 5rem;
  font-weight: 600;
  color: #000;
  margin: 0;
`

const DescriptionStyle = styled(RevealContentAnimation)`
  font-size: 1.2rem;
  margin-top: 15px;
  color: #000;
  margin: 0;
`

class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.state = { isLoaded: false}
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoaded: true })
    }, 1600)
  }

  render() {
    const { isLoaded } = this.state
    const { delay } = this.props

    return (
      <>
        <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
        <PresentationStyle>
          <HelloStyle delay={ delay } index={1} pose={ isLoaded ? 'visible' : 'hidden' }>
            Bonjour, je m'appelle
          </HelloStyle>
          <RevealBlockStyle>
            <RevealStyle delay={ delay } index={1} pose={ isLoaded ? 'visible' : 'hidden' } />
            <NameStyle delay={ delay } index={1} pose={ isLoaded ? 'visible' : 'hidden' }>
              Tavares Evora
            </NameStyle>
          </RevealBlockStyle>
            
          <RevealBlockStyle>
            <RevealStyle delay={ delay } index={2} pose={ isLoaded ? 'visible' : 'hidden' } />
            <DescriptionStyle delay={ delay } index={2} pose={ isLoaded ? 'visible' : 'hidden' }>
              Je suis developpeur <span className="function">fullstack</span> sur Paris,
              bienvenue sur mon portfolio !
              {/* https://greeeg.com/about/ */}
              {/* http://eric-huguenin.com/ */}
              {/* https://www.olivier-guilleux.com/ */}
            </DescriptionStyle>
          </RevealBlockStyle>
        </PresentationStyle>
      </>
    )
  }
}

export default IndexPage
