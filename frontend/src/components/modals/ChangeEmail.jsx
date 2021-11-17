import React, { useState } from 'react';
import { FloatingLabel, Form, Modal, Col, Button } from 'react-bootstrap';

function ChangeEmail() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const [tempUserInfo, setTempUserInfo] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setTempUserInfo(values => ({ ...values, [name]: value }));
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Change Email Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Col}>
            <FloatingLabel label="Email Address">
              <Form.Control name="email" type="email" onChange={handleChange} />
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col}>
            <FloatingLabel label="Confirm Email Address">
              <Form.Control name="email2" type="email" onChange={handleChange} />
            </FloatingLabel>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={changeEmail} />
      </Modal.Footer>
    </Modal>
  )
}

export default {
  ChangeEmail
}