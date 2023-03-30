import { useFormAction, useLoaderData, useSubmit } from 'react-router-dom';
import ContactForm from './ContactForm';
import { Contact } from './ContactsApi';

export interface ContactWithDetails extends Contact {
  formErrors: Partial<Contact>;
}

function Details() {
  const contact: ContactWithDetails = useLoaderData() as ContactWithDetails;
  let submit = useSubmit();
  let action = useFormAction();

  function change() {}

  function handleSubmit() {
    let form = document.getElementById('contactForm') as HTMLFormElement;
    const formData = new FormData(form);

    submit(formData, {
      method: contact.id ? 'put' : 'post',
      action,
    });
  }

  return (
    <>
      <h1>
        {contact.id
          ? `Contact ${contact.firstName} ${contact.lastName} `
          : 'Create Contact'}
      </h1>

      <ContactForm {...contact} onChange={change} onSubmit={handleSubmit} />
    </>
  );
}

export default Details;
