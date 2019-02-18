import React, { Component } from 'react'
import styled from 'styled-components'

import SEO from '../components/seo'

const TitleStyle = styled.h1`

`

const DescriptionStyle = styled.p`
  max-width: 80%;
  line-height: 1.8;
  margin-bottom: 25px;
`

class AboutPage extends Component {
  render() {
    return (
      <>
        <SEO title="A propos" />
        <TitleStyle>A Propos de moi</TitleStyle>
        <DescriptionStyle>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
          uas, eos veniam nobis nihil ut nisi! Harum, architecto?
          Dignissimos consequuntur vitae repellat officiis ab cum.
          Error voluptas esse aspernatur voluptatum nostrum?
        </DescriptionStyle>
        <DescriptionStyle>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
          uas, eos veniam nobis nihil ut nisi! Harum, architecto?
          Dignissimos consequuntur vitae repellat officiis ab cum.
          Error voluptas esse aspernatur voluptatum nostrum?
        </DescriptionStyle>
      </>
    )
  }
}

export default AboutPage