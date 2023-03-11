import { Button, Form, InputGroup, Spinner } from 'react-bootstrap';
import { Form as FormRouting } from 'react-router-dom';

export default function FilterBox({ value, onChange, onSubmit }) {
  return (
    <Form as={FormRouting} id='search-form' role='search'>
      <InputGroup className='mb-3'>
        {onSubmit ? (
          <>
            <Form.Control
              type='search'
              name='q'
              defaultValue={value}
              placeholder='Search Titles'
              aria-label='Search Titles'
            />
            <Button
              variant='danger'
              type='button'
              onClick={(e) => {
                onSubmit(e.target.form.q.value);
              }}
            >
              Filter
            </Button>
          </>
        ) : (
          <>
            <Form.Control
              value={value}
              type='search'
              name='q'
              onChange={(e) => {
                onChange(e.target.value);
              }}
              placeholder='Search Titles'
              aria-label='Search Titles'
            />
            <Button
              variant='danger'
              onClick={() => {
                onChange('');
              }}
            >
              Clear
            </Button>
          </>
        )}
      </InputGroup>
      <Spinner animation='border' variant='primary' hidden />
      <div className='sr-only' aria-live='polite'></div>
    </Form>
  );
}
