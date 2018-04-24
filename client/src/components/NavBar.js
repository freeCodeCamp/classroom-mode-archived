import React, { Component } from 'react'
import Logo from '../images/logo.svg'

import './NavBar.css'

export default class NavBar extends Component {
  render() {
    return (
      <div className="NavBar">
        <img alt="free-code-camp-logo" src={Logo} />
        <span id="navbar-title">
          Teacher Dashboard <b>BETA</b>{' '}
        </span>
      </div>
    )
  }
}
