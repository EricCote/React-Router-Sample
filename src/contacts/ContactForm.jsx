import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap'; //Alert
import MyTextBox from './MyTextbox';

export default function ContactForm({
  id,
  firstName,
  lastName,
  email,
  formErrors,
  onChange,
  onSubmit,
}) {
  return (
    <Form
      id='contactForm'
      onSubmit={(evt) => {
        evt.preventDefault();
        onSubmit();
      }}
    >
      <Form.Control type='hidden' name='id' value={id} />
      <MyTextBox
        name='firstName'
        fullName='First Name'
        value={firstName}
        onChange={onChange}
        formErrors={formErrors}
      />

      <MyTextBox
        name='lastName'
        fullName='Last Name'
        value={lastName}
        onChange={onChange}
        formErrors={formErrors}
      />

      <MyTextBox
        name='email'
        fullName='Email'
        value={email}
        onChange={onChange}
        formErrors={formErrors}
      />

      <Form.Group>
        {/* {formErrors.global ? (
          <Alert variant='danger'>{formErrors.global}</Alert>
        ) : (
          ''
        )} */}
        <Button variant='primary' type='submit'>
          Submit Contact
        </Button>

        {/* <Button className="ms-3" variant="danger"
                       onClick={null}>
                 🗑
          </Button> */}
      </Form.Group>
    </Form>
  );
}

ContactForm.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  id: PropTypes.any.isRequired,
  formErrors: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};
