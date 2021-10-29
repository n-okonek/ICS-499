import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Header from '../../components/Header';

const Layout = ({ children }) => (
  <Container id="container">
    <Row>
      <Header />
    </Row>
    <Row>
      <Col lg="2" />
      <Col id="primary-column" className="text-secondary">
        {children}
      </Col>
      <Col lg="2" />
    </Row>
  </Container>
);

export default Layout;
