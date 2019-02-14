import React, { Component } from 'react'
import posed from 'react-pose'
import { Link } from 'gatsby'
import styled from 'styled-components'
import SEO from '../components/seo'

const PresentationStyle = styled.div`
  padding: 25px;
`

const HelloStyle = styled.p`
  color: #757575;
  margin-bottom: -15px;
`

const RevealContentAnimation = posed.div({
  isLoaded: {
    opactity: 1,
    transition: ({ index }) => ({
      delay: index * 150
    })
  },
  not: {
    opacity: 0,
  },
  // initialPose: 'not'
})

const RevealAnimation = posed.div({
  isLoaded: {
    x: '100%',
    duration: 1200,
    transition: ({ index }) => ({
      type: 'keyframes',
      values: ['-100%', '0%', '0%', '100%'],
      times: [0, 0.3, 0.7, 1],
      duration: 1600,
      delay: index * 150
    })
  },
  not: {
    x: '-100%',
  },
  initialPose: 'not'
})

const RevealStyle = styled(RevealAnimation)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #00f0b5;
`

const RevealBlockStyle = styled.div`
  position: relative;
  overflow: hidden;
`

const NameStyle = styled(RevealContentAnimation)`
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
    this.state = { isLoaded: this.props.isLoaded }
  }

  componentDidMount() {
    this.setState({ isLoaded: true })
  }

  render() {
    const { isLoaded } = this.state

    return (
      <>
        <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
        <PresentationStyle>
          <HelloStyle><span>Bonjour, je m'appelle</span></HelloStyle>
            <RevealBlockStyle index={1} pose={(isLoaded) ? 'isLoaded' : 'not'}>
              <RevealStyle index={1} pose={(isLoaded) ? 'isLoaded' : 'not'} />
              <NameStyle index={1} pose={(isLoaded) ? 'isLoaded' : 'not'}>
                { isLoaded &&
                  <span>Tavares Evora</span>
                }
              </NameStyle>
            </RevealBlockStyle>
            
            <RevealBlockStyle index={2} pose={(isLoaded) ? 'isLoaded' : 'not'}>
              <RevealStyle index={2} pose={(isLoaded) ? 'isLoaded' : 'not'} />
              <DescriptionStyle index={2} pose={(isLoaded) ? 'isLoaded' : 'not'}>
                Je suis developpeur <span className="function">fullstack</span> sur Paris,
                bienvenue sur mon portfolio !
                {/* https://greeeg.com/about */}
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
