import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Header from '../../components/Header';

const FullLayout = ({ children }) => (
  <Container id="container">
    <Row>
      <Header />
    </Row>
    <Row>
      <Col id="primary-column" className="text-secondary">
        {children}
      </Col>
    </Row>
  </Container>
);

export default FullLayout;
