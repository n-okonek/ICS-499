import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './sass/styles.scss';

import OuterScreenView from './views/OuterScreenView';

function App() {
  return (
    <Container id="container">
      <Row>
        <Col lg="2"></Col>
        <Col id="primary-column" className="text-secondary">
            <OuterScreenView />
        </Col>
        <Col lg="2"></Col>
      </Row>
    </Container>
  );
}

export default App;
