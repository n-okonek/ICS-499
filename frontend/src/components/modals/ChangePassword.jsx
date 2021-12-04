import React, { useState } from 'react';
import { FloatingLabel, Form, Modal, Row, Col, Button, Container } from 'react-bootstrap';

function ChangePassword() {
  const [showPass, setShowPass] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setTempUserInfo(values => ({ ...values, [name]: value }));
  }

  return (
    <Modal show={showPass} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Change Email Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Col}>
            <FloatingLabel label="Current Password">
              <Form.Control name="currentPass" type="email" onChange={handleChange} />
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col}>
            <FloatingLabel label="New Password">
              <Form.Control name="newPass" type="email" onChange={handleChange} />
            </FloatingLabel>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => changePassword} />
      </Modal.Footer>
    </Modal>
  )
}

export {
  ChangePassword
}
