import NavBar, { Navbar } from 'react-bootstrap';

function Nav() {
  return (
    <NavBar bg='dark'>
      <Container>
        <Navbar.Brand href="#home">
          EaaS
        </Navbar.Brand>
      </Container>
    </NavBar>
  );
}

export default Nav;