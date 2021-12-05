import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { setLoginState, setUserRole, setInputs } from '../../../redux/loginSlice';

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

  const handleChange = (event) => {
    dispatch(setInputs({ ...inputs, [event.target.name]: event.target.value }));
  }

  function submitForm() {
    Axios.post("http://localhost:9001/user/login", {
      email: inputs.email,
      password: inputs.password
    }, { withCredentials: true }).then(() => {
      dispatch(setInputs({ ...inputs, password: "" }))
      dispatch(setLoginState(true));

      let path = '/user/profile';
      history.push(path);
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
        <Form onSubmit={handleSubmit}>
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

function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn,
    inputs: state.inputs,
    userRole: state.userRole
  }
}