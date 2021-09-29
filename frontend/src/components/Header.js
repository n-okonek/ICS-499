import React from 'react';

import { Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';

function Header() {
  return (
    <Navbar bg='dark' variant='dark' id='header-nav'>
      <Container>
        <Navbar.Brand href="#home">
          EaaS
        </Navbar.Brand>
        <Nav>
          <Nav.Link href='#home'>Home</Nav.Link>
          <Nav.Link href='#login'>Sign In</Nav.Link>
          <Nav.Link href='#logout'>Sign Out</Nav.Link>
          <NavDropdown title='My Account'>
            <NavDropdown.Item href='#profile'>Profile</NavDropdown.Item>
            <NavDropdown.Item href='#library'>My Library</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title='Admin'>
            <NavDropdown.Item href='#user-management'>User management</NavDropdown.Item>
            <NavDropdown.Item href='#rom-management'>Rom Management</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;