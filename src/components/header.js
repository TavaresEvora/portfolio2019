import { graphql, Link } from 'gatsby'
import { TimelineLite } from 'gsap'
// import TransitionLink from 'gatsby-plugin-transition-link'
import posed from 'react-pose'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled, { keyframes, css } from 'styled-components'

import variables from '../components/elements/variables'
import LinkStyled from '../components/elements/link'


const StyledHeader = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 15px;
  justify-content: space-between;
  height: ${ variables.navHeight };
  color: ${ variables.black };
	z-index: 99;
`

const StyledLogo = styled.a`
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

    ${props => props.open && css`
      color: #FFF;
    `}
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

  ${props => props.open && css`
    color: #FFF;
  `}

  a {
    color: inherit;
    font-size: .9rem;
    cursor: pointer;
    text-decoration: none;
    transition: color .8s;
    ${props => props.open && css`
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
    // this.buttonMenuElement = React.createRef()
    // this.tl = new TimelineLite({paused: true})
  }
  
  componentDidMount(){
    // this.tl
    //   .add('start', this.props.delay)
    //   .staggerFrom('#burger-menu span', 0.5, { x: 50, opacity: 0, clearProps: 'all' } , 0.1, 'start')
    //   .from('#logo', 0.5, { y: -50, opacity: 0 }, 'start')
    //   .from('.menu-txt', 0.5, { opacity: 0 }, 'start')
    //   .play()
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
          <StyledLogo as={Link} to='/' open={ menuIsOpen } >
            TavaresEvora
          </StyledLogo>

          <StyledMenu>
            <StyledMenuItem className="menu-txt" open={ menuIsOpen } onClick={ this.burgerHandleClick }>
              <LinkStyled>
                { menuIsOpen ? 'fermer' : 'projets' }
              </LinkStyled>
            </StyledMenuItem>
            <StyledMenuItem open={ menuIsOpen } onClick={ this.closeBurger } className="menu-txt">
              <LinkStyled as={Link} to='/about'>
                a propos
              </LinkStyled>
            </StyledMenuItem>
          </StyledMenu>
				</StyledHeader>

				<Overlay pose={ menuIsOpen ? 'open' : 'closed' }>
					<StyledNav>
						<StyledNavList>
              { projects.map(({ node }) => (
                <StyledNavItem key={ node.frontmatter.path }>
                  <LinkStyled onClick={ this.closeBurger } as={Link} to={`/${node.frontmatter.path}/detail`}>
                    { node.frontmatter.title }
                  </LinkStyled>
                </StyledNavItem>
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
