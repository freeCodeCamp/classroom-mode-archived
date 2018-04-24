import React, { Component } from 'react'
import './NavBar.css'

export default class NavBar extends Component {
  render() {
    return (
      <div className="NavBar">
        <img
          alt="free-code-camp-logo"
          src="https://s3.amazonaws.com/freecodecamp/freecodecamp_logo.svg"
        />
        <span id="navbar-title">
          Teacher Dashboard <b>BETA</b>{' '}
        </span>
      </div>
    )
  }
}
