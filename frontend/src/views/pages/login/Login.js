import  React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Layout from '../layout';

export default function Login() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() == false){
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  function createAccount(){
    event.preventDefault();
    event.stopPropagation();
  }

  return(
    <Layout>
      <div className="form-background">
        <Form validated={validated} onSubmit={handleSubmit}>
          <Form.Group>
            <FloatingLabel controlID="floatingInput" label="Email Adress" className='mb-3'>
              <Form.Control type="email" placeholder="name@example.com" />
            </FloatingLabel>
          </Form.Group>

          <Form.Group>
            <FloatingLabel controlID="floatingPassword" label="Password">
              <Form.Control type='password' placeholder="Password" />
            </FloatingLabel>
          </Form.Group>
          <Button variant='secondary' onClick={createAccount}>Create Account</Button>
          <Button variant='primary' type='submit'>Log In</Button>
        </Form>
      </div>
    </Layout>
  );
}