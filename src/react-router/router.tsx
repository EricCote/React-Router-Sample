import Root from './Root';
// import Root from './Animated-Root';
import { createBrowserRouter } from 'react-router-dom';
import Compteur from '../counter/Counter';
import Page1 from '../page1';
import Page2 from '../page2';
import Page3 from '../page3';

import MoviesRouter, {
  loaderSimple,
  loaderWithErrorHandling,
} from '../marvel/reactrouter/RouteWithLoader';
import MoviesServer, { loaderWithServerSort } from '../marvel/serverside';
import Thrones, { loaderSimpleThrones } from '../thrones';
import ErrorBoundary from './ErrorBoundary';
import ContactApi, { actionContact } from '../contacts/ContactsApi';
import Contacts from '../contacts';
import Details, { ContactWithDetails } from '../contacts/Details';
import MoviesReact from '../marvel/reactstate/FilterSort';
import MoviesDefer, { loaderDefer } from '../marvel/reactrouter/RouteWithDefer';
import MoviesSimple from '../marvel/reactstate/Simple1';
import MoviesRoutingUrl from '../marvel/reactrouter/indexWithRoutingUrl';

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
        path: '/page3',
        element: <Page3 />,
      },
      {
        path: '/counter',
        element: <Compteur />,
      },
      {
        path: '/marvel/simplereact',
        element: <MoviesSimple />,
      },
      {
        path: '/marvel/classic',
        element: <MoviesReact />,
      },
      {
        path: '/marvel/router',
        element: <MoviesRouter />,
        loader: loaderSimple,
      },
      {
        path: '/marvel/url',
        element: <MoviesRoutingUrl />,
        loader: loaderWithErrorHandling,
      },
      {
        path: '/marvel/defer',
        element: <MoviesDefer />,
        loader: loaderDefer,
      },
      {
        path: '/marvel/server/:page?',
        element: <MoviesServer />,
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
          let data = (await ContactApi.getContact(
            params.id ?? ''
          )) as ContactWithDetails;
          data.formErrors = {};
          return data;
        },
        action: actionContact,
      },
      {
        path: '/contacts/details/create',
        element: <Page2 />, // <Details />,
        // loader: () => {
        //   let data = {
        //     id: 0,
        //     firstName: '',
        //     lastName: '',
        //     email: '',
        //     formErrors: {},
        //   };
        //   return data;
        // },
        // action: actionContact,
      },
    ],
  },
]);

export default router;

// async function loaderSimple() {
//   return fetch('https://mcuapi.herokuapp.com/api/v1/movies?limit=50');
// }
