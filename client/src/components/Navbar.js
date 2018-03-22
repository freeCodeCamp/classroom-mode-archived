import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavText, NavDropdown, MenuItem } from 'react-bootstrap';

class NavbarComponent extends Component {

  render() {
    return (
      <div className="navbar">
        <Navbar collapseOnSelect style={stylesheet.navHeading}>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#brand">
                <img
                  src='https://s3.amazonaws.com/freecodecamp/freecodecamp_logo.svg'
                  className='img-responsive'/>
              </a>
            </Navbar.Brand>
            <Navbar.Text style={stylesheet.navText}>
              Teacher dashboard <strong>BETA</strong>
            </Navbar.Text>
            <Navbar.Toggle />
          </Navbar.Header>
        </Navbar>
      </div>
    );
  }
}

const stylesheet = {
  navHeading: {
    backgroundColor: 'darkgreen',
    minHeight: '10vh',
  },
  navText: {
    color: 'white',
    fontSize: '120%'
  }
};

export default NavbarComponent;
