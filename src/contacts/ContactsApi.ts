import { LoaderFunctionArgs, redirect } from 'react-router-dom';

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

const base = 'https://contacts.reactacademy.live/api';

export default class ContactApi {
  static ws = null;

  static getAllContacts() {
    return fetch(`${base}/contacts`).then((resp) => resp.json());
  }

  static getContact(contactId: string): Promise<Contact> {
    return fetch(`${base}/contacts/${contactId}`).then((resp) => resp.json());
  }

  static saveContact(contact: Contact): Promise<Response | Contact> {
    // Simulate server-side validation

    const minContactLength = 3;
    if (contact.firstName.length < minContactLength) {
      throw new Error(
        `First Name must be at least ${minContactLength} characters.`
      );
    }

    if (contact.lastName.length < minContactLength) {
      throw new Error(
        `Last Name must be at least ${minContactLength} characters.`
      );
    }

    if (contact.id) {
      //if id, update contact
      return fetch(`${base}/contacts/${contact.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact), // body data type must match "Content-Type" header
      });
    } else {
      //if no id, create contact
      return fetch(`${base}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact), // body data type must match "Content-Type" header
      }).then((resp) => resp.json());
    }
  }

  static deleteContact(contactId: string): Promise<Response> {
    return fetch(`${base}/contacts/${contactId}`, { method: 'DELETE' });
  }

  static #ws: WebSocket | null = null;

  static async registerNotification(fn: () => void) {
    if (this.#ws === null) {
      let res = await fetch(`${base}/negotiate`);
      let url = await res.json();
      this.#ws = new WebSocket(url.url);

      this.#ws.onopen = () => console.log('connected');

      this.#ws.onmessage = (event) => {
        fn();
      };
    }
  }

  static async unregisterNotification() {
    if (this.#ws !== null) {
      this.#ws.close();
      this.#ws = null;
    }
  }

  // static async getAllContacts() {
  //   const resp = await fetch("/contacts");
  //   if(resp.ok) {
  //     return resp.json();
  //   }
  //   throw new Error('Network response was not ok.');
  // }
}

///---------------

export async function actionContact({ request, params }: LoaderFunctionArgs) {
  const formData = await request.formData();
  if (request.method === 'DELETE') {
    await ContactApi.deleteContact(params.id ?? '');
  } else {
    const contact = Object.fromEntries(formData);
    await ContactApi.saveContact({
      id: contact.id !== '0' ? contact.id : undefined,
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
    } as Contact);
  }
  return redirect('/contacts');
}
