import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';

import { setEmail } from '../../../redux/userSlice';

import Layout from '../layout';
import { Row, Col, Button, Container, Modal, Form, FloatingLabel } from 'react-bootstrap';
import { ChangeEmail } from '../../../components/modals/ChangeEmail';
import { ChangePassword } from '../../../components/modals/ChangePassword';

export default function Profile() {

  const userEmail = useSelector((state) => state.user.email);
  const userPass = useSelector((state) => state.user.password);
  const dispatch = useDispatch();

  const [showEmail, setShowEmail] = useState(false);
  const [emailData, setEmailData] = useState(false);
  const [emailConfirmData, setEmailConfirmData] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [passwordData, setPasswordData] = useState(false);
  const [passwordConfirmData, setPasswordConfirmData] = useState(false);

  //
  // Email Changing Stuff
  //

  function handleEmailClose() {
    setShowEmail(false);
  }

  function handleEmailChange(e) {
    setEmailData(e.target.value);
  }

  function handleEmailConfirmChange(e) {
    setEmailConfirmData(e.target.value);
  }

  function handleEmailSubmit(e) {
    if (emailData !== emailConfirmData) {
      alert("Error: email addresses didn't match!");
      handleEmailClose();
      return;
    }

    changeEmail();
    handleEmailClose();
  }

  //
  // Password Changing Stuff
  //

  function handlePasswordClose() {
    setShowPassword(false);
  }

  function handlePasswordChange(e) {
    setPasswordData(e.target.value);
  }

  function handlePasswordConfirmChange(e) {
    setPasswordConfirmData(e.target.value);
  }

  function handlePasswordSubmit(e) {
    if (passwordData !== passwordConfirmData) {
      alert("Error: passwords didn't match!");
      handlePasswordClose();
      return;
    }

    changePassword();
    handlePasswordClose();
  }

  //
  // The Rest
  //
  function updateUserInfo() {
    Axios.get(process.env.API_URL + '/user/info', { withCredentials: true })
      .then((res) => {
        if (res.data.email) {
          dispatch(setEmail(res.data.email));
        } else {
          dispatch(setEmail(res.data.message));
        }
      });
  }
  useEffect(updateUserInfo, []);

  function handleShow(modal) {
    if (modal === "e") {
      <ChangeEmail show={true} />
    } else if (modal === "p") {
      <ChangePassword show={true} />
    }
  }

  function changeEmail() {
    Axios.post(process.env.API_URL + "/user/change-email", {
      email: emailData
    }, { withCredentials: true }).then(() => {
      alert("Email successfully changed")
    });
  }

  function changePassword() {
    Axios.post(process.env.API_URL + "/user/change-password", {
      password: passwordData
    }, { withCredentials: true }).then(() => {
      alert("Password successfully changed")
    });
  }

  return (
    <Layout>
      <Modal show={showEmail} onHide={handleEmailClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group as={Col}>
            <FloatingLabel label="Email Address">
              <Form.Control name="email" type="email" onChange={handleEmailChange} />
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col}>
            <FloatingLabel label="Confirm Email Address">
              <Form.Control name="email2" type="email" onChange={handleEmailConfirmChange} />
            </FloatingLabel>
          </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {handleEmailClose();}}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => {handleEmailSubmit();}}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showPassword} onHide={handlePasswordClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group as={Col}>
            <FloatingLabel label="Password">
              <Form.Control name="password" type="password"
                onChange={handlePasswordChange} />
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col}>
            <FloatingLabel label="Confirm Password">
              <Form.Control name="password2" type="password"
                onChange={handlePasswordConfirmChange} />
            </FloatingLabel>
          </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {handlePasswordClose();}}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => {handlePasswordSubmit();}}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Container className="form-container">
        <Row>
          <Col sm={8}>
            <Row className="profile-label">Email Address</Row>
            <Row className="profile-data">{userEmail}</Row>
          </Col>
          <Col sm={4}>
            <Row>
              <Button onClick={() => setShowEmail(true)}>
                Change Email
              </Button>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col sm={8}>
            <Row className="profile-label">Password</Row>
            <Row className="profile-data">{userPass}</Row>
          </Col>
          <Col sm={4}>
            <Row>
              <Button onClick={() => setShowPassword(true)}>
                Change Password
              </Button>
            </Row>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}
