import { useState } from 'react';
import { Form } from 'react-bootstrap';

interface auteur {
  id: number;
  name: string;
}

const liste: auteur[] = [
  { id: 1, name: 'Hugo' },
  { id: 2, name: 'Choi' },
  { id: 3, name: 'Olivier' },
  { id: 4, name: 'Lung' },
  { id: 5, name: 'Mathieu' },
];

export default function Page2() {
  const [filtre, setFiltre] = useState<string>('');

  return (
    <div>
      <h1>Page 2 </h1>
      <Form.Control
        value={filtre}
        onChange={(evt) => {
          setFiltre(evt.currentTarget.value);
        }}
      />

      <ul>
        {liste
          .filter((auteur) => {
            return auteur.name.toLowerCase().includes(filtre.toLowerCase());
          })
          .map((auteur) => (
            <li key={auteur.id}>{auteur.name}</li>
          ))}
      </ul>
    </div>
  );
}
