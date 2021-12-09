import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Layout from '../layout';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';


export default function CreateAccount() {
  const [validated, setValidated] = useState(false);
  const [inputs, setInput] = useState({});
  const history = useHistory();
  const apiURL = process.env.API_URL;
  const [signupMessage, setSignupMessage] = useState("");

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput(values => ({ ...values, [name]: value }))
  }

  function submitForm(validated) {
    if (validated) {
      Axios.post(apiURL + "/user/signup", {
        email: inputs.email,
        password: inputs.password,
        role_id: 1
      }).then(() => {
        alert("Account successfully created.")

      }).catch((err) => {
        console.warn(err.response.data.error);
        setSignupMessage(err.response.data.error);
      });
    }
  }

  function cancel() {
    history.goBack();
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      alert("validity check failed");
      event.preventDefault();
      event.stopPropagation();
    }
    event.preventDefault();

    setValidated(true);
    submitForm(validated);
  };

  return (
    <Layout>
      <div className="form-container">
        <span className="signup-message">{signupMessage}</span>
        <Form validated={validated} onSubmit={handleSubmit}>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <FloatingLabel label="Email Address">
                <Form.Control name="email" type="email" placeholder="name@example.com" onChange={handleChange} />
              </FloatingLabel>
            </Form.Group>
            <Form.Group as={Col}>
              <FloatingLabel label="Confirm Email Address">
                <Form.Control name="confirmEmail" type="email" placeholder="name@example.com" onChange={handleChange} />
              </FloatingLabel>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <FloatingLabel label="Password">
                <Form.Control name="password" type="password" placeholder="Password" onChange={handleChange} />
              </FloatingLabel>
            </Form.Group>
            <Form.Group as={Col}>
              <FloatingLabel label="Confirm Password">
                <Form.Control name="confirmPassword" type="password" placeholder="Password" onChange={handleChange} />
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
