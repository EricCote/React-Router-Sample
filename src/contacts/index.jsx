import { Button, Table } from 'react-bootstrap';
import { useLoaderData } from 'react-router-dom';

export default function Contacts() {
  const contacts = useLoaderData();

  return (
    <>
      <h1>Contacts</h1>
      <Table bordered striped hover>
        <thead>
          <tr>
            <th>Prénom</th>
            <th>Nom</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>
                <Button variant='primary' className='me-3'>
                  📄
                </Button>
                <Button variant='danger'>✏</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
