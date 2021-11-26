import React, { useState } from 'react';
import Layout from '../layout';
import { FloatingLabel, Form, Modal, Row, Col, Button, Container } from 'react-bootstrap';
import ChangeEmail from '../../../components/modals/ChangeEmail';
import ChangePassword from '../../../components/modals/ChangePassword';

export default function Profile() {

  function getLoginInfo() {
    return {
      email: "user@example.com",
      pass: "scrumlord"
    }
  }

  const [user, setUserInfo] = useState(getLoginInfo());

  // setUserInfo((props) => {
  //   let passLength = "";
  //   let length = props.pass.length;
  //   for (let i = 1; i < props.pass.length; i++) {
  //     passLength += "*";
  //   }
  //   return { obPass: passLength };
  // });

  function handleShow(modal) {
    if (modal === "e") {
      //<ChangeEmail show={true} />
    } else if (modal === "p") {
      //<ChangePassword show={true} />
    }
  }

  function changeEmail() {
    // Axios.post("http://localhost:9001/user/change-email", {
    //   email: tempUserInfo.email
    // }).then(() => {
    //   alert("Email successfully changed")
    // });
  }

  function changePassword() {
    // Axios.post("http://localhost:9001/user/change-password", {
    //   email: tempUserInfo.email
    // }).then(() => {
    //   alert("Email successfully changed")
    // });
  }

  return (
    <Layout>
      <Container className="form-container">
        <Row>
          <Col sm={8}>
            <Row className="profile-label">Email Address</Row>
            <Row className="profile-data">{user.email}</Row>
          </Col>
          <Col sm={4}>
            <Row>
              <Button onClick={handleShow("e")}>
                Change Email
              </Button>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col sm={8}>
            <Row className="profile-label">Password</Row>
            <Row className="profile-data">{user.obPass}</Row>
          </Col>
          <Col sm={4}>
            <Row>
              <Button onClick={handleShow("p")}>
                Change Password
              </Button>
            </Row>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}
