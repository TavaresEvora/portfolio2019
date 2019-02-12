import React, { Component } from 'react'
import styled from 'styled-components'
import posed from 'react-pose'

const PreloaderAnimation = posed.div({
  loaded: {
    opacity: '0',
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
  pointer-events: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background: #FFF;
  z-index: 999;
`

class Preloader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false,
      count: 0,
    }
  }

  componentDidMount = () => {
    // setInterval(() => {
    //   this.setState({ count: this.state.count + 1 })
    // }, 80)
    this.setState({ count: 100, isLoaded: true })
  }

  render() {
    const { isLoaded, count } = this.state
    return (
      <PreloaderStyle pose={ isLoaded ? 'loaded' : 'not' }>
        <span>{ count }%</span>
        {/* <p>Attend ça charge...</p> */}
      </PreloaderStyle>
    )
  }
}

export default Preloader

