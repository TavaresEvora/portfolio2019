import { Link, graphql } from 'gatsby'
import posed from 'react-pose'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { TimelineLite } from 'gsap'

import variables from '../components/elements/variables'
import LinkStyled from '../components/elements/link'

const StyledHeader = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  padding: 15px 15px 0;
  justify-content: space-between;
  height: 50px;
  color: ${ variables.black };
	z-index: 99;
`

const StyledLogo = styled.div`
  color: ${ variables.black };
  background: transparent;
  padding: 10px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    a {
      opacity: .8;
    }
  }

  a {
    text-decoration: none;
    color: ${ variables.black };
    transition: color .8s, opacity .3s;

    ${props => props.isOpen && css`
      color: #FFF;
    `}
  }
`

const StyledBurgerMenu = styled.div`
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
    background: ${ variables.black };
    height: 3px;
    width: 25px;
    will-change: transform;
    transform: translate(-50%, -50%);
    transition: background .8s, transform .3s;

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

const StyledOverlay = posed.div({
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

const Overlay = styled(StyledOverlay)`
	background: ${ variables.blackDark };
	position: absolute;
	overflow: hidden;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
  margin: 0;
  transform: translateY(-100%);
  z-index: 98;
`

const StyledNav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`

const StyledNavList = styled.ul`
	color: #FFF;
	margin: 0;
	padding: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  width: 100%;
`

const NavItem = posed.li({
  open: { y: 0, opacity: 1 },
  closed: { y: 100, opacity: 0 },
})

const StyledNavItem = styled(NavItem)`
	display: inline-block;
	list-style: none;
`

const StyledMenu = styled.ul`
`

const StyledMenuItem = styled.li`
  display: inline-block;
  font-size: .9rem;
  cursor: pointer;
  text-decoration: none;
  transition: color .8s;

  &:not(:last-child) {
    margin: 0 25px;
  }

  ${props => props.isOpen && css`
    color: #FFF;
  `}

  a {
    color: inherit;
    font-size: .9rem;
    cursor: pointer;
    text-decoration: none;
    transition: color .8s;
    ${props => props.isOpen && css`
      color: #FFF;
    `}
  }
`

class Header extends Component {
	constructor(props) {
		super(props)
		this.state = { menuIsOpen: false }
    this.burgerHandleClick = this.burgerHandleClick.bind(this)
    this.closeBurger = this.closeBurger.bind(this)
    this.buttonMenuElement = React.createRef()
    this.tl = new TimelineLite({paused: true})
  }
  
  componentDidMount(){
    this.tl
      .add('start', this.props.delay)
      .staggerFrom('#burger-menu span', 0.5, { x: 50, opacity: 0, clearProps: 'all' } , 0.1, 'start')
      .from('#logo', 0.5, { y: -50, opacity: 0 }, 'start')
      .from('.menu-txt', 0.5, { opacity: 0 }, 'start')
      .play()
  }

	burgerHandleClick(e) {
		e.preventDefault()
		this.setState({ menuIsOpen: !!!this.state.menuIsOpen })
  }
  
  closeBurger() {
    this.setState({ menuIsOpen: false })
  }

	render() {
    const { menuIsOpen } = this.state
    const { projects } = this.props
		return (
			<>
				<StyledHeader id="header">
          <StyledLogo id="logo" isOpen={ menuIsOpen } >
					  <Link to='/'>
							TavaresEvora
            </Link>
          </StyledLogo>

          <StyledMenu>
            <StyledMenuItem className="menu-txt" isOpen={ menuIsOpen } onClick={ this.burgerHandleClick }>
              <LinkStyled>
                { menuIsOpen ? 'fermer' : 'projets' }
              </LinkStyled>
            </StyledMenuItem>
            <StyledMenuItem isOpen={ menuIsOpen } onClick={ this.closeBurger } className="menu-txt">
              <LinkStyled as={Link} to='/about'>
                a propos
              </LinkStyled>
            </StyledMenuItem>
          </StyledMenu>

          {/* <StyledBurgerMenuContent isOpen={ menuIsOpen } onClick={ this.burgerHandleClick }>
            <span id="menu-txt">{ menuIsOpen ? 'close' : 'menu' }</span>
            <StyledBurgerMenu id="burger-menu">
              <span></span>
              <span></span>
              <span></span>
            </StyledBurgerMenu>
          </StyledBurgerMenuContent> */}
					
				</StyledHeader>

				<Overlay pose={ menuIsOpen ? 'open' : 'closed' }>
					<StyledNav>
						<StyledNavList>
              { projects.map(({ node }) => (
                <StyledNavItem key={ node.frontmatter.path }>{ node.frontmatter.title }</StyledNavItem>
              ))}
						</StyledNavList>
					</StyledNav>
				</Overlay>
			</>
		)
	}
}


Header.propTypes = {
  siteTitle: PropTypes.string,
  projects: PropTypes.array,
}

Header.defaultProps = {
  siteTitle: '',
  projects: [],
}

export default Header
