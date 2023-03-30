import React from 'react';
import { Button } from 'react-bootstrap';

interface BoutonProps {
  increment: number;
  onIncrement: (incr: number) => void;
}

export default function Bouton({ increment, onIncrement }: BoutonProps) {
  return (
    <Button
      onClick={() => {
        onIncrement(increment);
      }}
      variant={increment >= 0 ? 'primary' : 'danger'}
      className='me-3 my-3'
    >
      {increment >= 0
        ? `Incrementer de ${increment}`
        : `Décrémenter de ${Math.abs(increment)}`}
    </Button>
  );
}
