import { Link } from 'gatsby'
import posed from 'react-pose'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled, { keyframes, css } from 'styled-components'

const HeaderStyle = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  padding: 15px 15px 0;
  justify-content: space-between;
  height: 50px;
  color: #333;
	z-index: 99;
`

const LogoStyle = styled.div`
  color: #333;
  background: transparent;
  padding: 10px;
  text-decoration: none;
  cursor: pointer;

  a {
    text-decoration: none;
    color: #333;
  }
`

const BurgerMenuContentStyle = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
`

const BurgerMenuStyle = styled.div`
	position: relative;
  background: transparent;
  height: 45px;
  width: 45px;
  margin-left: 3px;
  text-decoration: none;
  cursor: pointer;
  z-index: 99;

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    background: #333;
    height: 3px;
    width: 25px;
    transform: translate(-50%, -50%);

		&:first-child {
			/* width: 80%; */
			transform: translate(-50%, -8px);
		}

		&:last-child {
			/* width: 70%; */
			transform: translate(-50%, 5px);
		}
  }
`

const fadeIn = keyframes`
  0% {
    opacity: 0;
		top: -160px;
  }

  50% {
    opacity: 1;
		top: -180px;
  }
  100% {
    opacity: 1;
		top: -180px;
  }
`

const OverlayStyle = posed.div({
    open: {
      y: '0%',
      delayChildren: 500,
      staggerChildren: 50,
      transition: {
        duration: 400,
        ease: 'easeInOut'
      },
    },
    closed: {
      y: '-100%',
      delay: 300,
      staggerChildren: 50,
      transition: {
        duration: 400,
        ease: 'easeInOut'
      },
    },
    initialPose: 'closed'
})

const Overlay = styled(OverlayStyle)`
	background: #333;
	position: absolute;
	overflow: hidden;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
  margin: 0;
  z-index: 98;
`

const NavStyle = styled.nav`

`

const NavListStyle = styled.ul`
	position: absolute;
	top: 50%;
	left: 50%;
	color: #FFF;
	transform: translate(-50%, -50%);
	margin: 0;
	padding: 0;
`

const NavItem = posed.li({
  open: { y: 0, opacity: 1 },
  closed: { y: 100, opacity: 0 },
})

const NavItemStyle = styled(NavItem)`
	display: inline-block;
	list-style: none;

	&:not(:last-child) {
		margin-right: 120px;
	}

	&:first-child {
		&:hover {
			&::before {
				content: '';
				display: block;
				position: absolute;
				top: -180px;
				left: -30px;
				width: 300px;
				height: 400px;
				background: red;
				transition: 1s;
				animation: ${fadeIn} 2s ease-in-out;
				z-index: -1;
			}
		}
	}
`

class Header extends Component {
	constructor(props) {
		super(props)
		this.state = { menuIsOpen: false }
        this.burgerHandleClick = this.burgerHandleClick.bind(this)
        this.buttonMenuElement = React.createRef()
	}

	burgerHandleClick(e) {
		e.preventDefault()
		this.setState({ menuIsOpen: !!!this.state.menuIsOpen })
	}

	render() {
        const { menuIsOpen } = this.state
		return (
			<>
				<HeaderStyle>
          <LogoStyle menuIsOpen>
					  <Link to='/'>
							TavaresEvora
            </Link>
          </LogoStyle>

          <BurgerMenuContentStyle onClick={ this.burgerHandleClick }>
            { menuIsOpen ? 'close' : 'menu' }
            <BurgerMenuStyle>
              <span></span>
              <span></span>
              <span></span>
            </BurgerMenuStyle>
          </BurgerMenuContentStyle>
					
				</HeaderStyle>

				<Overlay pose={ menuIsOpen ? 'open' : 'closed' }>
					<NavStyle>
						<NavListStyle>
							<NavItemStyle>Home</NavItemStyle>
							<NavItemStyle>Our Story</NavItemStyle>
							<NavItemStyle>Portfolio</NavItemStyle>
							<NavItemStyle>Contact</NavItemStyle>
						</NavListStyle>
					</NavStyle>
				</Overlay>
			</>
		)
	}
}


Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
}

export default Header
