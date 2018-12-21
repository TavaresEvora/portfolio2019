import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const HeaderStyle = styled.header`
  display: flex;
  height: 50px;
  color: #000;
`

const Header = ({ siteTitle }) => (
  <HeaderStyle>
    <Link to='/'>
      <div className="logo">
        TE
      </div>
    </Link>
    
    <div className="burger-menu">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </HeaderStyle>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
}

export default Header
