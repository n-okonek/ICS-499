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

  //
  // Email Changing Stuff
  //

  function handleEmailClose() {
    setShowEmail(false);
  }

  function handleEmailChange(e) {
    setEmailData(e.target.value);
    console.log(emailData);
  }

  function handleEmailConfirmChange(e) {
    setEmailConfirmData(e.target.value);
    console.log(emailConfirmData);
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
      email: tempUserInfo.email
    }, { withCredentials: true }).then(() => {
      alert("Email successfully changed")
    });
  }

  function changePassword() {
    Axios.post(process.env.API_URL + "/user/change-password", {
      password: tempUserInfo.password
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
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Submit</Button>
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
              <Button onClick={() => handleShow("p")}>
                Change Password
              </Button>
            </Row>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}
