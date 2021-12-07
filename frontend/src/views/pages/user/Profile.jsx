import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';

import { setEmail } from '../../../redux/userSlice';

import Layout from '../layout';
import { Row, Col, Button, Container } from 'react-bootstrap';
import { ChangeEmail } from '../../../components/modals/ChangeEmail';
import { ChangePassword } from '../../../components/modals/ChangePassword';

export default function Profile() {

  const userEmail = useSelector((state) => state.user.email);
  const userPass = useSelector((state) => state.user.password);
  const dispatch = useDispatch();

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
      <Container className="form-container">
        <Row>
          <Col sm={8}>
            <Row className="profile-label">Email Address</Row>
            <Row className="profile-data">{userEmail}</Row>
          </Col>
          <Col sm={4}>
            <Row>
              <Button onClick={() => handleShow("e")}>
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
