import { useFormAction, useLoaderData, useSubmit } from 'react-router-dom';
import ContactForm from './ContactForm';

function Details() {
  const contact = useLoaderData();
  let submit = useSubmit();
  let action = useFormAction();

  function change(e) {}

  function handleSubmit() {
    let form = document.getElementById('contactForm');
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
