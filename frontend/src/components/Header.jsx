import React from 'react';
import {
  Navbar, Container, Nav, NavDropdown,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { useSelector } from 'react-redux';

function Header() {
  const loggedIn = useSelector((state) => state.login.loggedIn);
  const userRole = useSelector((state) => state.login.userRole);

  return (
    <Navbar bg="dark" variant="dark" id="header-nav">
      <Container>
        <Navbar.Brand href="#home">
          NoNTENDO Emulator
        </Navbar.Brand>
        <Nav>
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>

          {!loggedIn ? (
            <LinkContainer to="/login">
              <Nav.Link>Sign In</Nav.Link>
            </LinkContainer>
          ) : (
            <>
              <LinkContainer to="/logout">
                <Nav.Link>Sign Out</Nav.Link>
              </LinkContainer>

              <NavDropdown title="My Account">
                <LinkContainer to="/user/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/user/library">
                  <NavDropdown.Item>My Library</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              {userRole === 2 ? (
                <NavDropdown title="Admin">
                  <LinkContainer to="/admin/user-management">
                    <NavDropdown.Item>User management</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/rom-management">
                    <NavDropdown.Item>Rom Management</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              ) : (<></>)}
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
