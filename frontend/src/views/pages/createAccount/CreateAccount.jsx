import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Layout from '../layout';
import { useHistory } from 'react-router-dom';


export default function CreateAccount() {
  const [validated, setValidated] = useState(false);
  const history = useHistory();

  function submitForm(valid) {
    if (valid) {
      //TODO: submit form create account control
    }
  }

  function cancel() {
    history.goBack();
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    submitForm(validated);
  };

  return (
    <Layout>
      <div className="form-container">
        <Form validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="firstName">
              <FloatingLabel label="First Name">
                <Form.Control type="text" placeholder="First Name" />
              </FloatingLabel>
            </Form.Group>
            <Form.Group as={Col} controlId="lastName">
              <FloatingLabel label="Last Name">
                <Form.Control type="text" placeholder="Last Name" />
              </FloatingLabel>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="email">
              <FloatingLabel label="Email Address">
                <Form.Control type="email" placeholder="name@example.com" />
              </FloatingLabel>
            </Form.Group>
            <Form.Group as={Col} controlId="confirmEmail">
              <FloatingLabel label="Confirm Email Address">
                <Form.Control type="email" placeholder="name@example.com" />
              </FloatingLabel>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="password">
              <FloatingLabel label="Password">
                <Form.Control type="password" placeholder="Password" />
              </FloatingLabel>
            </Form.Group>
            <Form.Group as={Col} controlId="confirmPassword">
              <FloatingLabel label="Confirm Password">
                <Form.Control type="password" placeholder="Password" />
              </FloatingLabel>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="button-group d-flex justify-content-around mt-3">
              <Button variant='secondary' onClick={cancel}>Cancel</Button>
              <Button variant='primary' type='submit'>Create Account</Button>
            </Form.Group>
          </Row>
        </Form>
      </div>
    </Layout>
  );
}
