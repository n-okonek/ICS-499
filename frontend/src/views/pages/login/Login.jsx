import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Layout from '../layout';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';

export default function Login() {
  const [validated, setValidated] = useState(false);
  const [inputs, setInputs] = useState({});
  const history = useHistory();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  }

  function submitForm(validated) {
    if (validated) {
      Axios.post("http://localhost:9001/login", {
        email: inputs.email,
        password: inputs.password
      }).then(() => {
        let path = '/profile';
        history.push(path);
      });
    }
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    event.preventDefault();

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
              <Form.Control name="email" type="email" placeholder="name@example.com" onChange={handleChange} />
            </FloatingLabel>
          </Form.Group>

          <Form.Group>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control name="password" type="password" placeholder="Password" onChange={handleChange} />
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
