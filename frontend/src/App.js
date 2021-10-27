import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './sass/styles.scss';
import RouterSwitch from './components/RouterSwitch';
import Header from './components/Header';

function App() {
  return (
    <Container id="container">
      <Row>
        <Header />
      </Row>
      <Row>
        <Col lg="2"></Col>
        <Col id="primary-column" className="text-secondary">
          <RouterSwitch />
        </Col>
        <Col lg="2"></Col>
      </Row>
    </Container>
  );
}

export default App;
