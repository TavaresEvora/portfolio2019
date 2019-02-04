import React, { Component } from 'react'
import styled from 'styled-components'

const PreloaderStyle = styled.div`
  height: 100%;
  width: 100%;
`

class Preloader extends Component {
  componentDidMount = () => {
    console.debug('componentDidMount')
  }
  

  render() {
    return (
      <PreloaderStyle>
        { this.props.children }
      </PreloaderStyle>
    )
  }
}

export default Preloader

