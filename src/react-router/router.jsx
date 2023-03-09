import { createBrowserRouter, defer, redirect } from 'react-router-dom';
import Compteur from '../compteur/Compteur';
import Page1 from '../page1';
import Page2 from '../page2';
import Films from '../films/indexWithRouteLoaderSpinner';
import Thrones from '../thrones';
import Root from './Root';
import ErrorBoundary from './ErrorBoundary';
import ContactApi from '../contacts/ContactsApi';
import Contacts from '../contacts';
import Details from '../contacts/Details';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorBoundary />,

    children: [
      {
        index: true,
        element: <Page1 />,
      },
      {
        path: '/page1',
        element: <Page1 />,
      },
      {
        path: '/page2',
        element: <Page2 />,
      },
      {
        path: '/compteur',
        element: <Compteur />,
      },
      {
        path: '/films',
        element: <Films />,
        loader: loaderWithDefer,
      },
      {
        path: '/thrones',
        element: <Thrones />,
        loader: loaderSimpleThrones,
      },
      {
        path: '/contacts',
        element: <Contacts />,
        loader: ContactApi.getAllContacts,
      },
      {
        path: '/contacts/details/:id',
        element: <Details />,
        loader: async ({ params }) => {
          let data = await ContactApi.getContact(params.id);
          data.formErrors = {};
          return data;
        },
        action: actionContact,
      },
      {
        path: '/contacts/details/create',
        element: <Details />,
        loader: () => {
          let data = {
            id: 0,
            firstName: '',
            lastName: '',
            email: '',
            formErrors: {},
          };
          return data;
        },
        action: actionContact,
      },
    ],
  },
]);

export default router;

async function actionContact({ request, params }) {
  const formData = await request.formData();
  if (request.method === 'DELETE') {
    await ContactApi.deleteContact(params.id);
  } else {
    const contact = Object.fromEntries(formData);
    await ContactApi.saveContact({
      id: contact.id !== '0' ? contact.id : undefined,
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
    });
  }
  return redirect('/contacts');
}

async function loaderSimpleThrones({ request }) {
  return fetch('https://thronesapi.com/api/v2/Characters');
}

async function loaderSimple({ request }) {
  return fetch('https://mcuapi.herokuapp.com/api/v1/movies?limit=50');
}

async function loaderWithErrorHandling({ request }) {
  let res;
  try {
    res = await fetch('https://mcuapi.herokuapp.com/api/v1/movies?limit=50', {
      signal: request.signal,
    });
  } catch {
    throw new Response('Service Unavailable', {
      status: 503,
      statusText: 'Service Unavailable',
    });
  }
  if (!res.ok) {
    throw new Response(res.statusText, {
      status: res.status,
      statusText: res.statusText,
    });
  }
  return res.json();
}

async function loaderWithDefer({ request }) {
  let res;
  try {
    res = await fetch('https://mcuapi.herokuapp.com/api/v1/movies?limit=50', {
      signal: request.signal,
    });
  } catch {
    throw new Response('Service Unavailable', {
      status: 503,
      statusText: 'Service Unavailable',
    });
  }
  if (!res.ok) {
    throw new Response(res.statusText, {
      status: res.status,
      statusText: res.statusText,
    });
  }
  return defer({ films: res.json() });
}
