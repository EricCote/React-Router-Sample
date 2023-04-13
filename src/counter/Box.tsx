import { Form } from 'react-bootstrap';

interface BoxProps {
  num: number | null;
  onChange: (str: string) => void;
}

export default function Box({ num, onChange }: BoxProps) {
  return (
    <Form.Control
      value={num ?? ''}
      type='number'
      onChange={(evt) => {
        onChange(evt.target.value);
      }}
    />
  );
}
