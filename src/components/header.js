import { Link } from 'gatsby'
import posed from 'react-pose'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'

const HeaderStyle = styled.header`
  display: flex;
  justify-content: space-between;
  height: 50px;
  color: #000;
	z-index: 99;
`

const LogoStyle = styled.div`
  color: #FFF;
  background: #333;
  padding: 10px;
  text-decoration: none;
  cursor: pointer;
`

const BurgerMenuStyle = styled.div`
	position: fixed;
  background: #333;
  height: 45px;
  width: 45px;
  text-decoration: none;
  cursor: pointer;
	z-index: 99;

  span {
    position: absolute;
    top: 50%;
    left: 0;
    display: block;
    background: #fff;
    height: 3px;
    width: 60%;
		transform: translate(0, -50%);

		&:first-child {
			width: 80%;
			transform: translate(0, -10px);
		}

		&:last-child {
			width: 70%;
			transform: translate(0, 7px);
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
        delayChildren: 200,
        staggerChildren: 50,
    },
    closed: {
        y: '-100%',
        delay: 300,
        staggerChildren: 50,
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
	transition: all 1s;
	transform: translateY(-100%);
	transform: ${ props => props.isOpen ? 'translateY(0)' : 'translateY(-100%)' };
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
					<Link to='/'>
						<LogoStyle>
							TE
						</LogoStyle>
					</Link>

					<BurgerMenuStyle onClick={ this.burgerHandleClick }>
						<span></span>
						<span></span>
						<span></span>
					</BurgerMenuStyle>
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
