import React, { Component } from 'react'
import styled from 'styled-components'
import posed from 'react-pose'

const PreloaderAnimation = posed.div({
  loaded: {
    opacity: '0',
    y: '100%',
    delay: 800,
    transition: {
      duration: 400,
      ease: 'easeInOut'
    },
  }
})

const PreloaderStyle = styled(PreloaderAnimation)`
  position: fixed;
  display: flex;
  overflow: hidden;
  pointer-events: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background: #FFF;
  z-index: 999;
`

const CounterStyle = styled(PreloaderAnimation)``

class Preloader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
    }
  }

  render() {
    const { count } = this.state
    const { isLoaded } = this.props

    setInterval(() => {
      if (this.state.count < 100) this.setState({ count: this.state.count + 1 })
    }, 80)
    return (
      <>
        <PreloaderStyle pose={ isLoaded ? 'loaded' : 'not' }>
          <CounterStyle>{ count }%</CounterStyle>
          {/* <p>Attend ça charge...</p> */}
        </PreloaderStyle>
      </>
    )
  }
}

export default Preloader

