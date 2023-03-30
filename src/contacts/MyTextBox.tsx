import { FloatingLabel, Form } from 'react-bootstrap';
import { Contact } from './ContactsApi';

export interface MyTextBoxProps {
  fullName: string;
  name: keyof Contact;
  value: string;
  formErrors?: Partial<Contact>;
  onChange: () => void;
}

const MyTextBox = ({
  fullName,
  name,
  value,
  formErrors,
  onChange,
}: MyTextBoxProps) => {
  return (
    //form-floating or form-label-group
    <FloatingLabel label={fullName} className=' my-4'>
      <Form.Control
        type='text'
        id={name}
        name={name}
        placeholder={fullName}
        defaultValue={value}
        onChange={onChange}
        isInvalid={!!(formErrors ?? {})[name]}
      />
      <Form.Control.Feedback>{(formErrors ?? {})[name]}</Form.Control.Feedback>
    </FloatingLabel>
  );
};

export default MyTextBox;
