import React from 'react';

import { Navbar, Container } from 'react-bootstrap';

function Nav() {
  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand href="#home">
          EaaS
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Nav;