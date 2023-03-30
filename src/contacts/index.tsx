import { Button, Table } from 'react-bootstrap';
import { Link, useLoaderData } from 'react-router-dom';
import { Contact } from './ContactsApi';

export default function Contacts() {
  const contacts: Contact[] = useLoaderData() as Contact[];

  return (
    <>
      <h1>Contacts</h1>
      <Table bordered striped hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td className='align-middle'>{contact.firstName}</td>
              <td className='align-middle'>{contact.lastName}</td>
              <td>
                <Link
                  className='btn btn-primary me-3'
                  to={`/contacts/details/${contact.id}`}
                >
                  📄
                </Link>
                <Button variant='danger'>✏</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
