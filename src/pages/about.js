import React, { Component } from 'react'
import styled from 'styled-components'

import SEO from '../components/seo'

const StyledTitle = styled.h1`

`

const StyledContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 65px);
`

const StyledDescription = styled.p`
  max-width: 80%;
  line-height: 1.8;
  margin-bottom: 25px;
`

class AboutPage extends Component {
  render() {
    return (
      <StyledContent>
        <SEO title="A propos" />
        <div>
            <StyledTitle>A Propos de moi</StyledTitle>
            <StyledDescription>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            uas, eos veniam nobis nihil ut nisi! Harum, architecto?
            Dignissimos consequuntur vitae repellat officiis ab cum.
            Error voluptas esse aspernatur voluptatum nostrum?
            </StyledDescription>
            <StyledDescription>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            uas, eos veniam nobis nihil ut nisi! Harum, architecto?
            Dignissimos consequuntur vitae repellat officiis ab cum.
            Error voluptas esse aspernatur voluptatum nostrum?
            </StyledDescription>
        </div>
      </StyledContent>
    )
  }
}

export default AboutPage
