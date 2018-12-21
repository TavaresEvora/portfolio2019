import React, { Component } from 'react'

class Preloader extends Component {
  componentDidMount = () => {
    console.debug('componentDidMount')
  }
  

  render() {
    return (
      <div>
        { this.props.children }
      </div>
    )
  }
}

export default Preloader

