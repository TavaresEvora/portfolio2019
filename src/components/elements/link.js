import React, { Component } from 'react'
import posed from 'react-pose'
import { Link } from 'gatsby'
import styled from 'styled-components'

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

const RevealStyle = styled(RevealAnimation)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #00f0b5;
  z-index: 9999;
`

const LinkStyle = styled.span`
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
      <LinkStyle {...props}
        onMouseEnter={ this.mouseEnter }
        onMouseLeave={ this.mouseLeave }
      >
        <RevealStyle pose={ isHover ? 'visible' : 'hidden' }/>
        { this.props.children }
      </LinkStyle>
    )
  }
}

export default LinkStyled
