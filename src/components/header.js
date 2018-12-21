import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const HeaderStyle = styled.header`
  display: flex;
  height: 50px;
  color: #000;
`

const LogoStyle = styled.div`
  color: #FFF;
  background: #333;
  padding: 10px;
  text-decoration: none;
  cursor: pointer;
`

const BurgerMenuStyle = styled.div`
  background: #333;
  height: 45px;
  width: 45px;
  text-decoration: none;
  cursor: pointer;

  span {
    display: block;
    background: #fff;
    height: 2px;
    width: 15px;
  }
`

const Header = ({ siteTitle }) => (
  <HeaderStyle>
    <Link to='/'>
      <LogoStyle>
        TE
      </LogoStyle>
    </Link>
    
    <BurgerMenuStyle>
      <span></span>
      <span></span>
      <span></span>
    </BurgerMenuStyle>
  </HeaderStyle>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
}

export default Header
