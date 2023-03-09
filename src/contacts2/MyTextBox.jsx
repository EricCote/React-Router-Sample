import React from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const MyTextBox = ({ fullName, name, value, formErrors, onChange }) => {
  return (
    //form-floating or form-label-group
    <FloatingLabel label={fullName} className=' my-4'>
      <Form.Control
        type='text'
        id={name}
        name={name}
        placeholder={fullName}
        defaultValue={value}
        onChange={onChange}
        isInvalid={!!formErrors[name]}
      />
      <Form.Control.Feedback>{formErrors[name]}</Form.Control.Feedback>
    </FloatingLabel>
  );
};

export default MyTextBox;

MyTextBox.propTypes = {
  fullName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  formErrors: PropTypes.object.isRequired,
};
