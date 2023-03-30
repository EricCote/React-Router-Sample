import { Button, Form, InputGroup, Spinner } from 'react-bootstrap';
import { Form as FormRouting } from 'react-router-dom';

interface FilterBoxProps {
  value: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
}

export default function FilterBox({
  value,
  onChange,
  onSubmit,
}: FilterBoxProps) {
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
                let target = e.target as HTMLInputElement;
                onSubmit(target.form?.q.value);
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
                if (onChange) onChange(e.target.value);
              }}
              placeholder='Search Titles'
              aria-label='Search Titles'
            />
            <Button
              variant='danger'
              onClick={() => {
                if (onChange) onChange('');
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
