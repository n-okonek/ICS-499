import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Layout from '../layout';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [validated, setValidated] = useState(false);
  const history = useHistory();

  function submitForm(valid) {
    if (valid) {
      //TODO: submit login form control
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

  const createAccount = () => {
    let path = '/create-account';
    history.push(path);
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
