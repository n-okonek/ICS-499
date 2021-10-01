import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './sass/styles.scss';

import EmulatorTestingView from './views/EmulatorTestingView';

function App() {
  return (
    <Container id="container">
      <Row>
        <Col lg="2"></Col>
        <Col id="primary-column" className="text-secondary">
          <EmulatorTestingView  />
        </Col>
        <Col lg="2"></Col>
      </Row>
    </Container>
  );
}

export default App;
