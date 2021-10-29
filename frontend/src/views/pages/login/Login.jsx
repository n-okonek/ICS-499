import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Layout from '../layout';

export default function Login() {
  const [validated, setValidated] = useState(false);

  function submitForm(valid) {
    if (valid) {
      //do-something
    }
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



  function createAccount() {
  }

  return (
    <Layout>
      <div className="form-container">
        <Form validated={validated} onSubmit={handleSubmit}>
          <Form.Group>
            <FloatingLabel controlId="floatingInput" label="Email Adress" className="mb-3">
              <Form.Control type="email" placeholder="name@example.com" />
            </FloatingLabel>
          </Form.Group>

          <Form.Group>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control type="password" placeholder="Password" />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="button-group d-flex justify-content-around mt-3">
            <Button variant='secondary' onClick={createAccount}>Create Account</Button>
            <Button variant='primary' type='submit'>Log In</Button>
          </Form.Group>
        </Form>
      </div>
    </Layout>
  );
}
