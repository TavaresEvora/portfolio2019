import React, { Component } from 'react'
import styled from 'styled-components'

const StyledPreloader = styled.div`
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

class Preloader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
    }
  }

  render() {
    const { count } = this.state

    setInterval(() => {
      if (this.state.count < 100) this.setState({ count: this.state.count + 1 })
    }, 80)
    return (
      <>
        <StyledPreloader>
          <span>{ count }%</span>
        </StyledPreloader>
      </>
    )
  }
}

export default Preloader

