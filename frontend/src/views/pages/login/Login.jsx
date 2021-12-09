import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { setLoginState, setInputs } from '../../../redux/loginSlice';
import { setUserRole } from '../../../redux/loginSlice';

import Axios from 'axios';

import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Layout from '../layout';


export default function Login() {
  const inputs = useSelector((state) => state.login.inputs);
  const loggedIn = useSelector((state) => state.login.loggedIn);
  const history = useHistory();
  const dispatch = useDispatch();

  const [loginMessage, setLoginMessage] = useState("");

  const handleChange = (event) => {
    dispatch(setInputs({ ...inputs, [event.target.name]: event.target.value }));
  }

  function submitForm() {
    Axios.post(process.env.API_URL + "/user/login", {
      email: inputs.email,
      password: inputs.password
    }, { withCredentials: true })
      .then((loginResponse) => {
        Axios.get(process.env.API_URL + "/user/info", { withCredentials: true })
        .then(
          (res) => {
            console.log("setting role to " + res.data.role);
            dispatch(setUserRole(res.data.role))

            dispatch(setInputs({ ...inputs, password: "" }))
            dispatch(setLoginState(true));

            let path = '/user/profile';
            history.push(path);
          }
        )
      })
      .catch(err => {
        setLoginMessage(err.response.data.message);
      });
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    submitForm();
  };

  const createAccount = () => {
    let path = '/create-account';
    history.push(path);
  }

  return (
    <Layout>
      <div className="form-container">
        <span className="login-message">{loginMessage}</span>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <FloatingLabel controlId="floatingInput" label="Email Address" className="mb-3">
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

function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn,
    inputs: state.inputs,
    userRole: state.userRole
  }
}