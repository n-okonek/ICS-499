import React from 'react';
import { Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Header() {
  return (
    <Navbar bg='dark' variant='dark' id='header-nav'>
      <Container>
        <Navbar.Brand href="#home">
          NoNTENDO Emulator
        </Navbar.Brand>
        <Nav>
          <LinkContainer to='/'>
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/login">
            <Nav.Link>Sign In</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/logout'>
            <Nav.Link>Sign Out</Nav.Link>
          </LinkContainer>
          <NavDropdown title='My Account'>
            <LinkContainer to='/profile'>
              <NavDropdown.Item >Profile</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='/library'>
              <NavDropdown.Item>My Library</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
          <NavDropdown title='Admin'>
            <LinkContainer to='/user-management'>
              <NavDropdown.Item>User management</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='/rom-management'>
              <NavDropdown.Item>Rom Management</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;