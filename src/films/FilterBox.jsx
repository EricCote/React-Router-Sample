import { Button, Form, InputGroup } from 'react-bootstrap';

export default function FilterBox({ value, onChange }) {
  return (
    <InputGroup className='mb-3'>
      <Form.Control
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        placeholder='Filter Title'
        aria-label='Filter Title'
      />
      <Button
        variant='danger'
        onClick={() => {
          onChange('');
        }}
      >
        Clear
      </Button>
    </InputGroup>
  );
}
