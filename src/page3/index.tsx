import { RefObject, useRef, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';

interface Contact {
  firstName: string;
  lastName: string;
  emails: string[];
}

function Page3() {
  const [contact, setContact] = useState<Contact>({
    firstName: '',
    lastName: '',
    emails: [],
  });
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const txtAddEmail = useRef<HTMLInputElement>() as RefObject<HTMLInputElement>;
  if (txtAddEmail === null) console.log('noooo!');

  return (
    <>
      <Form
        onSubmit={(evt) => {
          evt.preventDefault();
          let formData = new FormData(evt.currentTarget);
          alert(JSON.stringify(Object.fromEntries(formData), null, 2));
        }}
      >
        <Form.Group className='my-3'>
          <Form.Label>
            First Name
            <Form.Control name='firstName' defaultValue={contact.firstName} />
          </Form.Label>
        </Form.Group>
        <Form.Group className='my-3'>
          <Form.Label>
            Last Name
            <Form.Control name='lastName' defaultValue={contact.lastName} />
          </Form.Label>
        </Form.Group>
        {contact.emails.map((email, idx) => {
          return (
            <Form.Group key={email} className='my-3'>
              <Form.Label>
                Email {idx + 1}
                <InputGroup>
                  <Form.Control name={`email${idx + 1}`} defaultValue={email} />
                  <Button
                    data-email={email}
                    onClick={(evt) => {
                      const emails = contact.emails.filter((email) => {
                        return evt.currentTarget.dataset.email !== email;
                      });
                      setContact({
                        ...contact,
                        emails: emails,
                      });
                    }}
                  >
                    Remove Email
                  </Button>
                </InputGroup>
              </Form.Label>
            </Form.Group>
          );
        })}

        {isAdding ? (
          <Form.Group className='my-4'>
            <Form.Label>
              <InputGroup>
                <Form.Control
                  className=''
                  ref={txtAddEmail}
                  placeholder='Add Email'
                />
                <Button
                  onClick={() => {
                    setContact({
                      ...contact,
                      emails: [...contact.emails, txtAddEmail.current!.value],
                    });
                    txtAddEmail.current!.value = '';
                    setIsAdding(false);
                  }}
                >
                  Add Email
                </Button>
              </InputGroup>
            </Form.Label>
          </Form.Group>
        ) : (
          <Form.Group className='my-4'>
            <Button
              onClick={() => {
                setIsAdding(true);
              }}
            >
              Add Email
            </Button>
          </Form.Group>
        )}

        <Button type='submit'>Submit</Button>
      </Form>
    </>
  );
}

export default Page3;
