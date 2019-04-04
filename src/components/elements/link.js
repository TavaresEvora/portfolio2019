import React, { Component } from 'react'
import posed from 'react-pose'
import styled from 'styled-components'
import variables from './variables'

const RevealAnimation = posed.div({
  visible: {
    x: '100%',
    transition: () => ({
      type: 'keyframes',
      values: ['-100%', '0%', '0%', '100%'],
      times: [0, 0.3, 0.7, 1],
      duration: 800,
    })
  },
  hidden: {
    x: '-100%',
    transition: {
      duration: 0,
    }
  },
  initialPose: 'hidden'
})

const StyledReveal = styled(RevealAnimation)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${variables.primary};
  z-index: 9999;
`

const StyledLink = styled.a`
  display: inline-block;
  position: relative;
  overflow: hidden;
  color: inherit;
  text-decoration: none;
`

class LinkStyled extends Component {
  constructor(props) {
    super(props)
    this.state = { isHover: false}
    this.mouseEnter = this.mouseEnter.bind(this)
    this.mouseLeave = this.mouseLeave.bind(this)
  }

  mouseEnter() {
    this.setState({ isHover: true })
  }

  mouseLeave() {
    this.setState({isHover: false})
  }

  render() {
    const { isHover } = this.state
    const { props } = this

    return (
      <StyledLink {...props}
        onMouseEnter={ this.mouseEnter }
        onMouseLeave={ this.mouseLeave }
      >
        <StyledReveal pose={ isHover ? 'visible' : 'hidden' }/>
        { this.props.children }
      </StyledLink>
    )
  }
}

export default LinkStyled
