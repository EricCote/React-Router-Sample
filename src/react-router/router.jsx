import { createBrowserRouter, defer, redirect } from 'react-router-dom';
import Compteur from '../compteur/Compteur';
import Page1 from '../page1';
import Page2 from '../page2';
import FilmsRouter, {
  loaderSimple,
  loaderWithErrorHandling,
} from '../films-router';
import FilmsServer from '../films-server';
import Thrones from '../thrones';
import Root from './Root';
import ErrorBoundary from './ErrorBoundary';
import ContactApi from '../contacts/ContactsApi';
import Contacts from '../contacts';
import Details from '../contacts/Details';
import FilmsReact from '../films-react';
import FilmsDefer, { loaderDefer } from '../films-router/indexWithDefer';
import FilmsSimple from '../films-react/indexSimple';
import FilmsRoutingUrl from '../films-router/indexWithRoutingUrl';

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
        path: '/marvel/simplereact',
        element: <FilmsSimple />,
      },
      {
        path: '/marvel/classic',
        element: <FilmsReact />,
      },
      {
        path: '/marvel/router',
        element: <FilmsRouter />,
        loader: loaderWithErrorHandling,
      },
      {
        path: '/marvel/url',
        element: <FilmsRoutingUrl />,
        loader: loaderWithErrorHandling,
      },
      {
        path: '/marvel/defer',
        element: <FilmsDefer />,
        loader: loaderDefer,
      },
      {
        path: '/marvel/server/:page?',
        element: <FilmsServer />,
        loader: loaderWithServerSort,
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

async function loaderWithServerSort({ request, params }) {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  const order = url.searchParams.get('sortCol');
  const desc = url.searchParams.get('desc');
  const page = params.page ?? 1;
  let string = `limit=10&page=${page}`;
  if (order)
    string = `${string}&order=${order},${desc == 'true' ? 'DESC' : 'ASC'}`;
  if (q) string = `${string}&filter=title%3D${q}`;
  const res = await fetch(
    `https://mcuapi.herokuapp.com/api/v1/movies?${string}`
  );
  const data = await res.json();
  const films = data.data;
  const total = data.total;

  return { films, q, total };
}
