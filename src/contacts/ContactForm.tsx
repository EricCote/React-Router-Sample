import { FormEvent } from 'react';
import { Form, Button } from 'react-bootstrap'; //Alert
import { Contact } from './ContactsApi';
import MyTextBox from './MyTextBox';

interface ContactFormProps extends Contact {
  formErrors?: Partial<Contact>;
  onChange: () => void;
  onSubmit: (event?: FormEvent<HTMLFormElement>) => void;
}

export default function ContactForm({
  id,
  firstName,
  lastName,
  email,
  formErrors,
  onChange,
  onSubmit,
}: ContactFormProps) {
  return (
    <Form
      id='contactForm'
      onSubmit={(evt) => {
        evt.preventDefault();
        onSubmit();
      }}
    >
      <Form.Control type='hidden' name='id' value={id} />
      <MyTextBox
        name='firstName'
        fullName='First Name'
        value={firstName}
        onChange={onChange}
        formErrors={formErrors}
      />

      <MyTextBox
        name='lastName'
        fullName='Last Name'
        value={lastName}
        onChange={onChange}
        formErrors={formErrors}
      />

      <MyTextBox
        name='email'
        fullName='Email'
        value={email}
        onChange={onChange}
        formErrors={formErrors}
      />

      <Form.Group>
        {/* {formErrors.global ? (
          <Alert variant='danger'>{formErrors.global}</Alert>
        ) : (
          ''
        )} */}
        <Button variant='primary' type='submit'>
          Submit Contact
        </Button>

        {/* <Button className="ms-3" variant="danger"
                       onClick={null}>
                 🗑
          </Button> */}
      </Form.Group>
    </Form>
  );
}
