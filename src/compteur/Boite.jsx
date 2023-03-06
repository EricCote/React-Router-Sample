import React from 'react';
import { Form } from 'react-bootstrap';

export default function Boite({ nombre, onChange }) {
  return (
    <Form.Control
      value={nombre}
      onChange={(evt) => {
        onChange(evt.target.value);
      }}
    />
  );
}
