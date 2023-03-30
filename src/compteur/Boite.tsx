import React from 'react';
import { Form } from 'react-bootstrap';

interface BoiteProps {
  nombre: number | null;
  onChange: (str: string) => void;
}

export default function Boite({ nombre, onChange }: BoiteProps) {
  return (
    <Form.Control
      value={nombre ?? ''}
      type='number'
      onChange={(evt) => {
        onChange(evt.target.value);
      }}
    />
  );
}
